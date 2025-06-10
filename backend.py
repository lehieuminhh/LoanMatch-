from flask import Flask, request, jsonify
import pandas as pd
import re
from typing import Dict, List, Tuple, Optional
import logging
from flask_cors import CORS
import numpy as np
from dotenv import load_dotenv
import os
from openai import OpenAI
import json

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG)  # hoặc INFO nếu bạn chỉ muốn info
app.logger.setLevel(logging.DEBUG)

# ==================== LOGIC CHO TÀI SẢN LỚN ====================

def check_asset_loan_eligibility(loan_amount, income, loan_collateral, down_payment, term_years, max_term=10):
    """
    Check eligibility for large asset installment loan based on down payment, loan-to-collateral ratio, and income condition.
    """
    issues = []

    # Điều kiện 1: Down payment >= 30% giá trị tài sản
    required_downpayment = 0.3 * loan_collateral
    if down_payment < required_downpayment:
        issues.append(f"Down payment must be at least 30% of asset value ({required_downpayment:.2f} triệu).")

    # Điều kiện 2: Down payment + loan amount <= asset value
    if down_payment + loan_amount > loan_collateral:
        issues.append("Total of loan amount and down payment exceeds asset value.")

    # Điều kiện 3: Thu nhập ≥ 20% của khoản trả hàng tháng
    monthly_payment = loan_amount / (term_years * 12)
    if income < 0.2 * monthly_payment:
        issues.append(f"Monthly income should be at least 20% of monthly repayment ({monthly_payment:.2f} triệu).")

    if not issues:
        return {
            "eligible": True,
            "monthly_payment": round(monthly_payment, 2),
            "message": "Loan request is eligible."
        }

    suggestions = []
    if term_years < max_term:
        suggestions.append("Consider increasing the loan term to reduce monthly payments.")
    else:
        suggestions.append("Consider increasing the down payment amount.")

    return {
        "eligible": False,
        "monthly_payment": round(monthly_payment, 2),
        "issues": issues,
        "suggestions": suggestions
    }

def generate_asset_repayment_schedule(loan_amount, desired_term_months, bank_data):
    """Generate repayment schedule for asset loan"""
    if desired_term_months > bank_data["max_term"]:
        return None
    desired_term_months *= 12;
    fixed_rate = bank_data["fixed_rate"]
    float_rate = bank_data["float_rate"]
    fixed_period = bank_data["fixed_period"]
    grace_period = bank_data["grace_period"]

    monthly_principal = loan_amount / desired_term_months
    schedule = []
    total_total_interest = 0
    total_total_payment = 0

    for month in range(1, desired_term_months + 1):
        if month <= grace_period:
            interest_rate = fixed_rate if month <= fixed_period else float_rate
            interest = loan_amount * interest_rate / 12
            principal = 0
        else:
            interest_rate = fixed_rate if month <= fixed_period else float_rate
            months_paid = month - grace_period - 1
            remaining_principal = loan_amount - monthly_principal * months_paid
            interest = remaining_principal * interest_rate / 12
            principal = monthly_principal

        total_total_interest += interest
        total_total_payment += principal + interest
        total_payment = principal + interest
        remaining_balance = loan_amount - monthly_principal * max(0, month - grace_period)

        schedule.append({
            "Month": month,
            "Principal": round(principal),
            "Interest": round(interest),
            "Total Payment": round(total_payment),
            "Remaining Balance": round(remaining_balance)
        })

    return {
        "total_interest": round(total_total_interest),
        "total_payment": round(total_total_payment),
        "bank_name": bank_data["bank_name"],
        "schedule" : schedule
    }

# ==================== LOGIC CHO TÍN DỤNG ====================

def check_loan_eligibility(loan_amount, income, term, max_term=18):
    """
    Check if loan amount divided by term is less than or equal to 85% of income.
    """
    threshold = 0.85 * income
    monthly_payment = loan_amount / term

    if monthly_payment <= threshold:
        return {
            "eligible": True,
            "monthly_payment": round(monthly_payment, 2),
            "message": "Loan request meets the income-to-payment condition."
        }
    else:
        if term < max_term:
            return {
                "eligible": False,
                "monthly_payment": round(monthly_payment, 2),
                "suggestion": f"Consider increasing the loan term beyond {term} months.",
                "reason": f"Monthly payment ({monthly_payment:.2f}) exceeds 85% of income ({threshold:.2f})."
            }
        else:
            suggested_loan_amount = round(threshold * term, 2)
            return {
                "eligible": False,
                "monthly_payment": round(monthly_payment, 2),
                "suggestion": f"Reduce the loan amount to {suggested_loan_amount} million VND or less.",
                "reason": f"Loan term is already at the maximum of {max_term} months."
            }

def calculate_declining_balance_schedule_summary(loan_amount, annual_rate, term_months):
    """Calculate declining balance schedule summary"""
    
    if term_months <= 0:
        raise ValueError("term_months must be greater than 0")
    if loan_amount <= 0:
        raise ValueError("loan_amount must be greater than 0")
        
        
    monthly_rate = annual_rate / 12 / 100
    monthly_principal = loan_amount / term_months
    schedule = []
    remaining_balance = loan_amount
    total_interest = 0
    total_payment = 0
    
    for month in range(1, term_months + 1):
        interest = remaining_balance * monthly_rate
        if np.isnan(interest):
            raise ValueError(f"NaN detected at month {month}, remaining_balance={remaining_balance}, rate={monthly_rate}")

    for month in range(1, term_months + 1):
        interest = remaining_balance * monthly_rate
        total = monthly_principal + interest
        total_interest += interest
        total_payment += total
        remaining_balance -= monthly_principal
        
        schedule.append({
            "Month": month,
            "Principal": round(monthly_principal),
            "Interest": round(interest),
            "Total Payment": round(total_payment),
            "Remaining Balance": round(remaining_balance)
        })

    return {
        "total_interest": round(total_interest, 2),
        "total_payment": round(total_payment, 2),
        "schedule":schedule
    }

# ==================== CHẤM ĐIỂM NGÂN HÀNG ====================

def score_banks_credit(bank_results):
    """Score banks based on total payment and promotions from Excel data"""
    df = pd.DataFrame(bank_results)
    
    # Load promotion data from Excel file
    BANK = pd.read_excel("./data/SCORED_CREDIT_LOANS.xlsx").iloc[1:].reset_index(drop=True)
    BANK.columns = BANK.columns.str.strip()
    
    BANK = BANK.rename(columns={
        'Promotion (cashback)': 'promotion_value',
        'Bank': 'bank_name'
    })
    BANK['promotion_value'] = pd.to_numeric(BANK['promotion_value'], errors='coerce').fillna(0.0)
    
    df = pd.merge(df, BANK, on='bank_name', how='left')
    
    # Calculate scores
    df['cost_rank'] = df['total_payment'].rank(ascending=True, method='min')
    df['cost_score'] = df['cost_rank'].apply(lambda r: 10 - r + 1 if r <= 10 else 0)
    
    df['promotion_rank'] = df['promotion_value'].rank(ascending=False, method='min')
    df['promotion_score'] = df['promotion_rank'].apply(lambda r: 10 - r + 1 if r <= 10 else 0)
    
    df['final_score'] = 0.85 * df['cost_score'] + 0.15 * df['promotion_score']
    df['final_score'] = df['final_score'].round(2)
    
    return df.sort_values('final_score', ascending=False)


def score_bank_asset(bank_results, loan_amount, collateral_value, monthly_income, age, occupation):
    """
    Score banks for asset loans based on personal criteria, fees, friendliness, and interest rates
    """
    try:
        # Load the scored asset loans data
        df_asset = pd.read_excel("./data/SCORED_ASSET_LOANS.xlsx")
        
        def evaluate_score_and_compatibility(row):
            # Weights for scoring criteria
            weight_personal = 0.25
            weight_fee = 0.05
            weight_friendliness = 0.10
            weight_interest = 0.60

            # Personal score (age + occupation)
            age_score = 0
            occ_score = 0
            age_compatible = False
            occupation_compatible = False
            
            # Check age group compatibility
            if isinstance(row.get('AgeGroup'), str):
                try:
                    age_range = row['AgeGroup'].replace('–', '-').split('-')
                    if len(age_range) == 2 and int(age_range[0]) <= age <= int(age_range[1]):
                        age_score = 5
                        age_compatible = True
                except:
                    pass
            
            # Check occupation compatibility
            if isinstance(row.get('Occupation'), str) and occupation.lower() in row['Occupation'].lower():
                occ_score = 5
                occupation_compatible = True
            
            personal_score = age_score + occ_score

            # Fee score
            fee_score = 5  # default
            fee_text = str(row.get('Fees', '')).lower()
            if any(k in fee_text for k in ["0.1%", "0.5%", "1 triệu", "2 triệu", "0 – 3%", "0.3%", "0.7%"]):
                fee_score = 5
            elif any(k in fee_text for k in ["3%", "0.7%", "trên", "cao"]):
                fee_score = 0
            elif any(k in fee_text for k in ["0%", "thấp", "0.1%", "miễn"]):
                fee_score = 10

            # Friendliness score
            friendly_map = {"đẹp": 10, "bình thường": 7, "xú": 5}
            friendliness_score = friendly_map.get(str(row.get('Friendliness', '')).strip().lower(), 5)

            # Interest score (based on total payment - lower is better)
            interest_score = 8  # Default placeholder

            total_score = (
                personal_score * weight_personal +
                fee_score * weight_fee +
                friendliness_score * weight_friendliness +
                interest_score * weight_interest
            )

            return {
                'score': round(total_score, 2),
                'age_compatible': age_compatible,
                'occupation_compatible': occupation_compatible
            }

        # Convert bank_results to DataFrame
        df_results = pd.DataFrame(bank_results)
        
        # Merge with asset data based on bank name
        df_merged = pd.merge(df_results, df_asset, left_on='bank_name', right_on='Bank', how='left')
        
        # Calculate individual scores and compatibility for each bank
        score_data = df_merged.apply(evaluate_score_and_compatibility, axis=1)
        df_merged['personal_score'] = [data['score'] for data in score_data]
        df_merged['age_compatible'] = [data['age_compatible'] for data in score_data]
        df_merged['occupation_compatible'] = [data['occupation_compatible'] for data in score_data]
        
        # Generate reason text based on compatibility
        def generate_reason(row):
            reasons = []
            if row['age_compatible']:
                reasons.append("Age is compatible")

            if row['occupation_compatible']:
                reasons.append("Occupation is compatible")
            
            return ", ".join(reasons)
        
        df_merged['reason'] = df_merged.apply(generate_reason, axis=1)
        
        # Rank by total payment (cost efficiency)
        df_merged['cost_rank'] = df_merged['total_payment'].rank(ascending=True, method='min')
        df_merged['cost_score'] = df_merged['cost_rank'].apply(lambda r: 10 - r + 1 if r <= 10 else 0)
        
        # Combine personal score with cost efficiency
        df_merged['final_score'] = (0.7 * df_merged['personal_score'] + 0.3 * df_merged['cost_score']).round(2)
        
        return df_merged.sort_values('final_score', ascending=False)
        
    except Exception as e:
        print(f"Error in score_bank_asset: {e}")
        # Fallback to simple cost-based ranking
        df = pd.DataFrame(bank_results)
        df['final_score'] = df['total_payment'].rank(ascending=True, method='min')
        df['final_score'] = df['final_score'].apply(lambda r: 10 - r + 1)
        df['age_compatible'] = False
        df['occupation_compatible'] = False
        df['reason'] = "Không thể xác định độ tuổi và nghề nghiệp phù hợp"
        return df.sort_values('final_score', ascending=False)

# ==================== DỮ LIỆU MẪU NGÂN HÀNG ====================

def get_credit_rate_by_cic(cic_score):
    """Get credit rate group based on CIC score"""
    if cic_score >= 680:
        return "rate_group_1"
    elif cic_score >= 570:
        return "rate_group_2"
    else:
        return "rate_group_3"

def load_asset_banks_data():
    """Load asset banks data from Excel file"""
    try:
        ASSET_BANKS_DATA = pd.read_excel("./data/ASSET_BANKS_DATA.xlsx").iloc[1:].reset_index(drop=True)
        ASSET_BANKS_DATA.columns = ASSET_BANKS_DATA.columns.str.strip()
        
        ASSET_BANKS_DATA = ASSET_BANKS_DATA.rename(columns={
            'max_loan_term': 'max_term',
            'Fixed': 'fixed_rate',
            'Float': 'float_rate',
            'Fixed period': 'fixed_period',
            'grace period': 'grace_period'
        })
        
        for col in ['fixed_rate', 'float_rate', 'max_term', 'fixed_period', 'grace_period']:
            ASSET_BANKS_DATA[col] = pd.to_numeric(ASSET_BANKS_DATA[col], errors='coerce')

        # Gán NaN thành 0
        ASSET_BANKS_DATA = ASSET_BANKS_DATA.fillna(0)

        # Chia lãi suất cho 100 để đưa về dạng thập phân
        ASSET_BANKS_DATA['fixed_rate'] = ASSET_BANKS_DATA['fixed_rate'] / 100
        ASSET_BANKS_DATA['float_rate'] = ASSET_BANKS_DATA['float_rate'] / 100
        
        return ASSET_BANKS_DATA
    except Exception as e:
        print(f"Error loading asset banks data: {e}")
        return pd.DataFrame()

def load_credit_banks_data():
    """Load credit banks data from Excel file"""
    try:
        CREDIT_BANKS_DATA = pd.read_excel("./data/CREDIT_BANKS_DATA.xlsx").iloc[1:].reset_index(drop=True)
        CREDIT_BANKS_DATA.columns = CREDIT_BANKS_DATA.columns.str.strip()
        
        CREDIT_BANKS_DATA = CREDIT_BANKS_DATA.rename(columns={
            'Ngân hàng': 'bank_name',
            'Lãi suất nợ nhóm 1': 'rate_group_1',
            'Lãi suất nợ nhóm 2': 'rate_group_2',
            'Lãi suất nợ nhóm 3': 'rate_group_3'
        })
        
        for col in ['rate_group_1', 'rate_group_2', 'rate_group_3']:
            CREDIT_BANKS_DATA[col] = pd.to_numeric(CREDIT_BANKS_DATA[col], errors='coerce')
        
        return CREDIT_BANKS_DATA
    except Exception as e:
        print(f"Error loading credit banks data: {e}")
        return pd.DataFrame()

# =========================== OPENAI ==============================

def clean_json_response(content):
    # Remove triple backticks or markdown formatting if present
    return re.sub(r"^```(?:json)?|```$", "", content.strip(), flags=re.MULTILINE).strip()

def get_recommendation_reason(query_info: dict) -> dict:    

    prompt = f"""The user is applying for a loan with the following profile:
    - Occupation: {query_info['occupation']}
    - Monthly income: {query_info['income']} million VND
    - Desired loan amount: {query_info['loan_amount']} million VND
    - Desired loan term: {query_info['term_years']} years
    - Estimated monthly repayment: {query_info['down_payment']} million VND
    - Suggested bank: {query_info['bank_name']}
    Write 3–5 highly personalized and specific bullet points explaining why this bank is the best match for the user.

    You must:
    - Refer directly to the user's income and how the estimated monthly payment fits within 50–60% of it
    - Mention relevant benefits this bank offers (e.g., lower interest, fast approval, student-friendly terms, cashback)
    - Personalize based on their occupation (e.g., students get easier approvals, freelancers benefit from flexible requirements, office workers value fast digital processes)

    Each bullet point should be:
    - 1 sentence
    - No more than 25 words
    - Written in a friendly, professional tone

    Avoid generic statements. Be precise, contextual, and user-focused.

    Respond **only with valid JSON** in this format:

    {{
      "reasons": [
        "Reason 1...",
        "Reason 2...",
        "Reason 3...",
        "Reason 4...",
        "Reason 5..."
      ]
    }}

    Do not include markdown or explanations — only the JSON object above.
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o",  # or gpt-3.5-turbo
            messages=[
                {"role": "system", "content": "You are a helpful assistant specialized in loan recommendations."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=400
        )

        content = response.choices[0].message.content.strip()
        cleaned = re.sub(r"^```(?:json)?|```$", "", content.strip(), flags=re.MULTILINE).strip()
        return json.loads(cleaned)

    except json.JSONDecodeError as e:
        return {"error": str(e), "raw": content}
    except Exception as e:
        return {"error": str(e)}

# ==================== API ENDPOINTS ====================

@app.route('/api/asset-loan', methods=['POST'])
def asset_loan_api():
    """API for large asset loan calculation"""
    try:
        data = request.get_json()
        
        # Required fields
        required_fields = ['loan_amount', 'income', 'loan_collateral', 'down_payment', 'term_years', 'age', 'occupation']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        loan_amount = float(data['loan_amount'])
        income = float(data['income'])
        loan_collateral = float(data['loan_collateral'])
        down_payment = float(data['down_payment'])
        term_years = int(data['term_years'])
        age = int(data['age'])
        occupation = str(data['occupation'])
        
        # Step 1: Check eligibility
        eligibility = check_asset_loan_eligibility(
            loan_amount, income, loan_collateral, down_payment, term_years
        )
        
        if not eligibility['eligible']:
            return jsonify({
                "status": "not_eligible",
                "eligibility": eligibility
            })
        
        # Step 2: Load bank data and calculate loan schedules
        term_months = term_years * 12
        bank_results = []
        
        ASSET_BANKS_DATA = load_asset_banks_data()
        if ASSET_BANKS_DATA.empty:
            return jsonify({"error": "Could not load asset banks data"}), 500
        
        # app.logger.info(ASSET_BANKS_DATA.to_string())
        
        for _, bank_data in ASSET_BANKS_DATA.iterrows():
            schedule_result = generate_asset_repayment_schedule(
                loan_amount * 1_000_000,  # Convert to VND
                term_years,
                bank_data
            )
            if schedule_result:
                bank_results.append(schedule_result)
        
        if not bank_results:
            return jsonify({
                "status": "no_suitable_banks",
                "message": "No banks can accommodate this loan term"
            })
        
        # Step 3: Score and rank banks using asset scoring logic
        scored_banks = score_bank_asset(
            bank_results, 
            loan_amount, 
            loan_collateral, 
            income, 
            age, 
            occupation
        )
        top_3_banks = scored_banks.head(3)
        # app.logger.info(bank.get("reason"))
        
        # Format response
        query_info = {
        "loan_amount" : float(data['loan_amount']),
        "income" : float(data['income']),
        "loan_collateral" : float(data['loan_collateral']),
        "down_payment" : float(data['down_payment']),
        "term_years"  : int(data['term_years']),
        "age" : int(data['age']),
        "occupation" : str(data['occupation'])
        }

        recommendations = []
        for _, bank in top_3_banks.iterrows():

            query_info = {
            "bank_name": bank['bank_name'],
            "loan_amount" : float(data['loan_amount']),
            "income" : float(data['income']),
            "loan_collateral" : float(data['loan_collateral']),
            "down_payment" : float(data['down_payment']),
            "term_years"  : int(data['term_years']),
            "age" : int(data['age']),
            "occupation" : str(data['occupation'])
            }

            # Get AI-generated reasons
            reason_result = get_recommendation_reason(query_info)

            # Add to recommendations
            recommendations.append({
                "bank_name": bank['bank_name'],
                "total_payment": int(bank['total_payment'] / 1_000_000),
                "total_interest": int(bank['total_interest']),
                "final_score": bank['final_score'],
                "personal_score": bank.get('personal_score', 0),
                "cost_score": bank.get('cost_score', 0),
                "age_compatible": bank.get('age_compatible', False),
                "occupation_compatible": bank.get('occupation_compatible', False),
                "schedule" : bank['schedule'],
                "reason": reason_result.get("reasons", reason_result)  # fallback if there's an error
            })
        
        return jsonify({
            "status": "success",
            "eligibility": eligibility,
            "recommendations": recommendations
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/credit-loan', methods=['POST'])
def credit_loan_api():
    """API for credit loan calculation"""
    try:
        data = request.get_json()
        
        # Required fields
        required_fields = ['loan_amount', 'income', 'term_months', 'cic_score']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        loan_amount = float(data['loan_amount'])
        income = float(data['income'])
        term_months = int(data['term_months'])
        cic_score = int(data['cic_score'])
        
        # Step 1: Check eligibility
        eligibility = check_loan_eligibility(loan_amount, income, term_months)
        
        if not eligibility['eligible']:
            return jsonify({
                "status": "not_eligible",
                "eligibility": eligibility
            })
        
        # Step 2: Load bank data and calculate loan costs
        rate_group = get_credit_rate_by_cic(cic_score)
        bank_results = []
        
        CREDIT_BANKS_DATA = load_credit_banks_data()
        if CREDIT_BANKS_DATA.empty:
            return jsonify({"error": "Could not load credit banks data"}), 500
        
        for _, bank_data in CREDIT_BANKS_DATA.iterrows():   
            annual_rate = bank_data[rate_group]
            if (np.isnan(annual_rate)):
                continue
            schedule_result = calculate_declining_balance_schedule_summary(
                loan_amount * 1_000_000,  # Convert to VND
                annual_rate,
                term_months
            )
            schedule_result['bank_name'] = bank_data['bank_name']
            bank_results.append(schedule_result)
        
        # Step 3: Score and rank banks using Excel data
        scored_banks = score_banks_credit(bank_results)
        top_3_banks = scored_banks.head(3)
        
        # Format response
        recommendations = []
        for _, bank in top_3_banks.iterrows():
            recommendations.append({
                "bank_name": bank['bank_name'],
                "total_payment": int(bank['total_payment']/1_000_000),
                "total_interest": int(bank['total_interest']),
                "promotion_value": bank.get('promotion_value', 0),
                "final_score": bank['final_score'],
                "schedule" : bank['schedule']
                
            })
        
        return jsonify({
            "status": "success",
            "eligibility": eligibility,
            "cic_group": rate_group,
            "recommendations": recommendations
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Loan API is running"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
