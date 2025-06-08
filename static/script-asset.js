function toggleFilter(button) {
  const box = button.closest(".filter-box");
  box.classList.toggle("open");

  const arrow = button.querySelector(".arrow");
  if (arrow) {
    arrow.textContent = box.classList.contains("open") ? "▲" : "▼";
  }
}

// Bank-specific loan details
const bankDetails = {
  'ABBank': {
    websiteUrl: 'https://abbank.vn/vay/vay-mua-nha-du-an.html',
    requirements: [
      "Vietnamese nationality",
      "Permanent/temporary residence in the same area where an ABBANK branch/transaction office is located, or in neighboring areas with bank presence",
      "Aged between 18 and 65",
      "Have collateral assets that meet ABBANK's regulations",
      "Applicants for ABBANK home loans must have a stable source of income to ensure repayment capability",
      "No bad debt at any bank/credit institution at the time of applying for the ABBANK home loan"
    ],
    documents: [
      "Loan application form (as per ABBank's template)",
      "National ID (CCCD), household registration book, marriage certificate or certificate of single status",
      "Legal documents: Business registration certificate, tax code (if applicable)",
      "Income proof: Employment contract, salary statement, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
    ]
  },
  'ACB': {
    websiteUrl: 'https://acb.com.vn/vay-von/vay-mua-nha-dat',
    requirements: [
      "Vietnamese nationality",
      "Aged 18 or above",
      "Have a stable income and sufficient repayment capacity",
      "Possess collateral such as the vehicle or property being purchased, or other real estate",
      "Maintain a good credit history with no record of bad debt"
    ],
    documents: [
      "Loan application form (as per ACB's template)",
      "National ID/ Citizen ID or passport",
      "Household registration book or temporary residence book",
      "Certificate of marital status",
      "Income proof: Employment contract, salary statement...",
      "Collateral documents: Land use right certificate, house purchase contract..."
    ],
    promotions: [
      "ACB Bank offers a preferential mortgage interest rate of 8.5% per annum for the first 3 months",
      "ACB Bank offers a preferential mortgage interest rate of 9% per annum for the first 6 months",
      "ACB Bank offers a preferential mortgage interest rate of 9.5% per annum for the first 12 months"
    ]
  },

  'BaoVietBank': {
    websiteUrl: 'https://www.baovietbank.vn/vn/cho-vay/chi-tiet/vay-mua-nha-o-29-09-2020',
    requirements: [
      "Have collateral (real estate)",
      "Maximum loan limit up to 80% of asset value",
      "Maximum loan term from 20 to 25 years",
      "Proof of income is required"
    ],
    documents: [
      "Loan application form (as per Bao Viet Bank's template)",
      "National ID/ Citizen ID or passport",
      "Household registration book or long-term temporary residence certificate",
      "Certificate of marital status",
      "Income proof: Employment contract, salary statement...",
      "Collateral documents: Land use right certificate, house purchase contract..."
    ],
    promotions: [
      "Fixed interest rate for the first 12 months",
      "Free asset valuation during the promotional period",
      "Complimentary life insurance (depending on the campaign period)"
    ]
  },
  'Bac A Bank': {
    requirements: [
      "Have collateral assets",
      "Loan limit up to approximately 75% of the asset value",
      "Maximum loan term of 20 years"
    ],
    documents: [
      "Loan application form (as per Bac A Bank's template)",
      "National ID/ Citizen ID or passport",
      "Household registration book or temporary residence certificate",
      "Certificate of marital status",
      "Income proof: Employment contract, salary statement...",
      "Collateral documents: Land use right certificate, house purchase contract..."
    ],
    promotions: [
      "Preferential interest rate for the first 6 months",
      "Home appraisal support service available"
    ]
  },
  'BVBank': {
    requirements: [
      "Borrow up to 80% of the asset value",
      "Clear income documentation required",
      "Maximum loan term of 25 years"
    ],
    documents: [
      "Loan application form (as per BVBank's template)",
      "National ID/ Citizen ID or passport",
      "Household registration book or temporary residence book",
      "Certificate of marital status",
      "Income proof: Employment contract, salary statement, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Low interest rate of 8.1% in the first year",
      "Free account opening"
    ]
  },

  'VikkiBank': {
    requirements: [
      "Collateral must be house/land",
      "Borrow up to 80% of the asset value",
      "Maximum loan term of 25 years"
    ],
    documents: [
      "Loan application form (Vikki Bank's template)",
      "Legal documents",
      "Documents proving the purpose of loan use (house purchase contract, transfer agreement, deposit contract, etc.)",
      "Documents proving income (income from salary, business activities, property rental, etc.)",
      "Collateral documents"
    ],
    promotions: [
      "Fixed preferential interest rate for 12 months",
      "Reduced early repayment fees"
    ]
  },

  'Eximbank': {
    requirements: [
      "Loan limit up to 85% of the asset value",
      "Borrow up to 25 years",
      "Collateral from family members is accepted"
    ],
    documents: [
      "Loan application form (as per Eximbank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statement, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Preferential interest rate of 7.9%",
      "Free account opening and SMS notification service"
    ]
  },

  'HDBank': {
    requirements: [
      "Borrow up to 80% of the asset value",
      "Maximum loan term of 20 years",
      "Flexible installment repayment available"
    ],
    documents: [
      "Loan application form (as per HDBank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Gift upon contract signing"
    ]
  },
  'KienlongBank': {
    requirements: [
      "Borrow 75% of the asset value",
      "Maximum term of 15–20 years",
      "Suburban land can be used as collateral"
    ],
    documents: [
      "Loan application cum loan plan form (as per Kien Long Bank's template)",
      "ID card/Citizen ID/Passport, household registration or temporary residence book of the borrower and co-debtor (if any)",
      "Certificate of marital status",
      "Income proof: Employment contract, payslip, bank statement, financial reports...",
      "Collateral documents: Land use right certificate, house purchase contract..."
    ],
    promotions: [
      "Low interest rates for rural areas"
    ]
  },

  'LPBank': {
    requirements: [
      "Borrow up to 80% of the asset value",
      "Maximum loan term of 25 years",
      "Flexible collateral options"
    ],
    documents: [
      "Loan application form (as per LPBank's template)",
      "ID card/Citizen ID/Passport, household registration or temporary residence book of the borrower and co-debtor (if any)",
      "Certificate of marital status",
      "Income proof: Employment contract, payslip, bank statement, financial reports...",
      "Collateral documents: Land use right certificate, house purchase contract..."
    ],
    promotions: [
      "Preferential interest rate for the first 12 months",
      "Support for notarization costs"
    ]
  },
  'MBBank': {
    requirements: [
      "Borrow 80–90% of the asset value",
      "Loan term of 20–25 years",
      "Collateral from family-owned property accepted"
    ],
    documents: [
      "Loan application form (as per MB Bank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Preferential interest rate as low as 7.5%",
      "Free loan insurance",
      "24/7 support via mobile app"
    ]
  },
  'MSB': {
    requirements: [
      "Borrow up to 90% of the collateral asset's value",
      "Maximum loan term of 25 years",
      "Real estate owned by family members accepted as collateral"
    ],
    documents: [
      "Loan application form (as per MSB's template)",
      "ID card/Citizen ID, household registration book or temporary residence document",
      "Income proof: Employment contract, salary statements...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Preferential interest rate from 6.99%/year for the first 12 months",
      "No early repayment fee after the first year",
      "Complimentary life insurance included with the loan (depending on the program)"
    ]
  },

  'NamABank': {
    requirements: [
      "Borrow up to 80% of the collateral asset's value",
      "Maximum loan term of 20–25 years",
      "Collateral must be legally valid and clearly documented"
    ],
    documents: [
      "Loan application form (as per Nam A Bank's template)",
      "ID card/Citizen ID, household registration book or temporary residence document",
      "Income proof: Employment contract, salary statements...",
      "Collateral documents: Land use right certificate (Red book/Pink Book), house purchase contract..."
    ],
    promotions: [
      "Preferential interest rate from 6.99%/year for the first 12 months",
      "No early repayment fee after the first year",
      "Complimentary life insurance included with the loan (depending on the program)"
    ]
  },

  'NCB': {
    requirements: [
      "Borrow up to 80% of the collateral asset's value",
      "Maximum loan term of 20–25 years",
      "Collateral must be legally valid and clearly documented"
    ],
    documents: [
      "Loan application form (as per NCB's template)",
      "ID card/Citizen ID, household registration book or temporary residence document",
      "Income proof: Employment contract, salary statements...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Preferential interest rate from 6.99%/year for the first 12 months",
      "No early repayment fee after the first year",
      "Complimentary life insurance included with the loan (depending on the program)"
    ]
  },

  'OCB': {
    requirements: [
      "Loan limit up to 85% of the asset value",
      "Maximum loan term of 25 years"
    ],
    documents: [
      "Loan application form (as per OCB's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Preferential interest rate from 7.5%/year",
      "Free loan insurance"
    ]
  },
  'Modern Bank Vietnam': {
    requirements: [
      "Borrow up to 80% of the asset value",
      "Loan term up to 20 years"
    ],
    documents: [
      "Loan application form (as per Modern Bank Vietnam's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
    ],
    promotions: [
      "Free payment account opening",
      "Preferential loan insurance fees"
    ]
  },
  'PGBank': {
    requirements: [
      "Borrow 70–75% of the asset value",
      "Maximum loan term of 20 years"
    ],
    documents: [
      "Loan application form (as per PGBank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Fixed interest rate for the first 12 months",
      "Discount on valuation fee"
    ]
  },
  'PublicBank': {
    requirements: [
      "Borrow 75–80% of the asset value",
      "Loan term: 20–25 years"
    ],
    documents: [
      "Loan application form (as per Public Bank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Interest rate of 8.0% in the first year",
      "Welcome gift for new customers"
    ]
  },
  'PVcomBank': {
    requirements: [
      "Clear collateral required",
      "Borrow 80–85% of the asset value",
      "Maximum term of 25 years"
    ],
    documents: [
      "Loan application form (as per PVcomBank's template)",
      "ID card/Citizen ID, household registration book or temporary residence document",
      "Income proof: Employment contract, salary statements...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Preferential interest rate from 7.9%",
      "Discount on loan insurance fee"
    ]
  },
  'SacomBank': {
    requirements: [
      "Borrow up to 100% of the collateral value",
    ],
    documents: [
      "Loan application form (as per SacomBank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Interest rate from 7.8%/year"
    ]
  },
  'SaigonBank': {
    requirements: [
      "Borrow 70–75% of the asset value",
      "Maximum term: 20 years"
    ],
    documents: [
      "Loan application form (as per Saigon Bank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Preferential loan insurance fee",
      "Discount on asset valuation fee"
    ]
  },
  'SCB': {
    requirements: [
      "Borrow up to 85% of the asset value",
      "Maximum loan term of 25 years"
    ],
    documents: [
      "Loan application form (as per SCB's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Interest rate of 8.2% in the first year",
      "Shopping voucher gift"
    ]
  },
  'SeABank': {
    requirements: [
      "Borrow 75–80% of the asset value",
      "Loan term: 20–25 years"
    ],
    documents: [
      "Loan application form (as per SeABank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Interest rate from 7.7%/year",
      "Free asset valuation"
    ]
  },
  'SHB': {
    requirements: [
      "Borrow 75–80% of the asset value",
      "Loan term: up to 25 years"
    ],
    documents: [
      "Loan application form (as per SHB's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Free loan insurance",
      "Lower interest rate for customers with good credit history"
    ]
  },
  'Techcombank': {
    requirements: [
      "Borrow 85–90% of the asset value",
      "Up to 25 years",
      "Online loan application supported"
    ],
    documents: [
      "Loan application form (as per Techcombank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Preferential interest rate from 6.99%",
      "No early repayment penalty"
    ]
  },
  'TPBank': {
    requirements: [
      "Vietnamese or foreign nationality",
      "Aged 18 to 75",
      "Stable income and sufficient repayment ability during the committed period",
      "Collateral must be the property to be purchased or real estate owned by the borrower or their family"
    ],
    documents: [
      "Loan application form (as per TPBank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: []
  },
  'VIB': {
    requirements: [
      "Vietnamese nationality, or Vietnamese citizen with a foreign spouse",
      "Aged 18 or above and not over 70 at loan maturity",
      "Residing/working in a province/city with a VIB branch or transaction office",
      "Minimum monthly income of VND 15 million"
    ],
    documents: [
      "Loan application form (as per VIB's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Preferential interest rate from only 5.9%/year, fixed for the first 6 months",
      "Loan support up to 85% of the property's value",
      "Simple application process",
      "Transparent and straightforward appraisal process",
      "Free early principal repayment up to VND 25 million/month"
    ]
  },
  'Viet A Bank': {
    requirements: [
      "Borrow up to 80% of the asset value",
      "Maximum loan term of 20 years",
      "Legal and valid collateral required"
    ],
    documents: [
      "Loan application form (as per Viet A Bank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Preferential interest rate of 8.2% in the first year",
      "Free processing fee"
    ]
  },
  'VietBank': {
    requirements: [
      "Borrow up to 80% of the asset value",
      "Maximum loan term of 25 years",
    ],
    documents: [
      "Loan application form (as per Viet Bank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Interest rate from 7.9% in the first year",
      "Free loan insurance"
    ]
  },
  'VPBank': {
    requirements: [
      "Borrow up to 100% of the asset value",
      "Maximum loan term of 25 years"
    ],
    documents: [
      "Loan application form (as per VPBank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Preferential interest rate from 6.9%",
      "Free furniture voucher"
    ]
  },
  'Hong Leong Bank': {
    requirements: [
      "Borrow 75–85% of the asset value",
      "Maximum term: 20 years",
      "Property located in major cities"
    ],
    documents: [
      "Loan application form (as per Hong Leong Bank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Free loan registration"
    ]
  },
  'HSBC': {
    requirements: [
      "Borrow up to 90% of the asset value",
      "Term up to 25 years",
      "Support available for foreign borrowers"
    ],
    documents: [
      "Loan application form (as per HSBC's template)",
      "ID card/Citizen ID, household registration book or temporary residence certificate",
      "Income proof: Employment contract, salary statements...",
    ],
    promotions: [
      "Complimentary international loan insurance"
    ]
  },
  'Indovina Bank': {
    requirements: [
      "Borrow up to 80% of the asset value",
      "Maximum loan term of 25 years"
    ],
    documents: [
      "Loan application form (as per Indovina Bank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "No early repayment fee after 3 years"
    ]
  },
  'VRB': {
    requirements: [
      "Borrow up to 80% of the asset value",
      "Maximum loan term of 20 years",
      "Collateral from family members accepted"
    ],
    documents: [
      "Loan application form (as per VRB's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Free account opening"
    ]
  },
  'Shinhan Bank': {
    requirements: [
      "Borrow 80–85% of the asset value",
      "Maximum loan term of 25 years",
      "Accept red book or residential house as collateral"
    ],
    documents: [
      "Loan application form (as per Shinhan Bank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Remote loan application available"
    ]
  },
  'Woori Bank': {
    requirements: [
      "Borrow up to 80% of the asset value",
      "Maximum loan term of 25 years",
      "Accept red book or residential house as collateral"
    ],
    documents: [
      "Loan application form (as per Woori Bank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Free health insurance"
    ]
  },
  'Agribank': {
    requirements: [
      "Borrow 70–80% of the asset value",
      "Maximum loan term of 20 years",
      "Priority for rural areas"
    ],
    documents: [
      "Loan application form (as per Agribank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Gift savings book or items"
    ]
  },
  'BIDV': {
    requirements: [
      "Borrow up to 80% of the asset value",
      "Maximum loan term of 25 years"
    ],
    documents: [
      "Loan application form (as per BIDV's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Free home insurance"
    ]
  },
  'Vietcombank': {
    requirements: [
      "Borrow up to 100% of the asset value",
      "Maximum loan term of 25 years",
      "Professional loan approval process"
    ],
    documents: [
      "Loan application form (as per Vietcombank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Free legal and notarization support"
    ]
  },
  'VietinBank': {
    requirements: [
      "Loan amount: up to 70% of the value of the home purchase contract",
      "Loan term: up to 20 years",
      "Collateral: fully secured by the property rights arising from the social housing purchase contract (NOXH) or other assets as per VietinBank's regulations"
    ],
    documents: [
      "Loan application form (as per VietinBank's template)",
      "Citizen ID, household registration book, marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements, financial reports...",
      "Collateral documents: Land use right certificate (Red book/Pink book), house purchase contract..."
    ],
    promotions: [
      "Free home insurance"
    ]
  },
  'Nam A Bank': {
    requirements: [
      "Vietnamese nationality",
      "Age 18-65",
      "Stable income",
      "Good credit history",
      "Collateral required"
    ],
    documents: [
      "Loan application form",
      "ID card/Citizen ID/Passport",
      "Household registration",
      "Marriage certificate (if applicable)",
      "Income proof documents",
      "Collateral documents"
    ],
    promotions: [
      "Interest rate from 8.9%/year",
      "Loan up to 80% of property value",
      "Term up to 20 years"
    ]
  },
  'Public Bank': {
    requirements: [
      "Vietnamese nationality",
      "Age 21-65",
      "Minimum income requirement",
      "Clean credit record"
    ],
    documents: [
      "Loan application form",
      "Personal identification documents",
      "Proof of income",
      "Property documents",
      "Other supporting documents"
    ],
    promotions: [
      "Competitive interest rates",
      "Fast approval process",
      "Flexible repayment terms"
    ]
  },
  'Sacombank': {
    requirements: [
      "Vietnamese nationality",
      "Age 18-65",
      "Stable income source",
      "Good credit history"
    ],
    documents: [
      "Loan application form",
      "ID/Passport",
      "Household registration",
      "Income verification documents",
      "Property documentation"
    ],
    promotions: [
      "Preferential rates for first 6 months",
      "Up to 80% property value financing",
      "Free property valuation"
    ]
  },
  'Saigonbank': {
    requirements: [
      "Vietnamese citizenship",
      "Age 18-65",
      "Regular income",
      "No adverse credit history"
    ],
    documents: [
      "Application form",
      "Identity documents",
      "Residence verification",
      "Income proof",
      "Property papers"
    ],
    promotions: [
      "Special rates for loyal customers",
      "Quick approval process",
      "Flexible loan terms"
    ]
  },
  'VietABank': {
    requirements: [
      "Vietnamese nationality",
      "Age 18-65",
      "Stable employment",
      "Clean credit record"
    ],
    documents: [
      "Loan application",
      "Personal ID documents",
      "Proof of residence",
      "Income documentation",
      "Property documents"
    ],
    promotions: [
      "Competitive interest rates",
      "Up to 75% financing",
      "Extended loan terms available"
    ]
  },
  'Vietbank': {
    requirements: [
      "Vietnamese citizenship",
      "Age 18-65",
      "Regular income source",
      "Good credit standing"
    ],
    documents: [
      "Loan application form",
      "Identity verification",
      "Residence proof",
      "Income statements",
      "Property documentation"
    ],
    promotions: [
      "Attractive interest rates",
      "Fast processing time",
      "Flexible repayment options"
    ]
  },
  'Hongleong Bank': {
    requirements: [
      "Vietnamese nationality",
      "Age 21-65",
      "Minimum income criteria",
      "Clean credit history"
    ],
    documents: [
      "Application documents",
      "Personal identification",
      "Proof of residence",
      "Income verification",
      "Property papers"
    ],
    promotions: [
      "Competitive rates",
      "Quick approval",
      "Flexible terms"
    ]
  },
  'Vietinbank': {
    requirements: [
      "Vietnamese citizenship",
      "Age 18-65",
      "Stable income",
      "Good credit record"
    ],
    documents: [
      "Loan application",
      "ID documents",
      "Residence verification",
      "Income proof",
      "Property documentation"
    ],
    promotions: [
      "Preferential interest rates",
      "Up to 85% financing",
      "Extended loan terms",
      "Fast approval process"
    ]
  }
};  // End of bankDetails object

// Show loan details modal
function showLoanDetails(card) {
  try {
    const bankName = card.querySelector('.card-title').textContent.split('-')[0].trim();
    const interestRate = card.querySelector('p:nth-child(2)').textContent;
    const maxLoan = card.querySelector('p:nth-child(3)').textContent;
    const maxTerm = card.querySelector('p:nth-child(4)').textContent;
    const bankLogo = card.querySelector('img').src;

    const modal = document.getElementById('loanDetailsModal');
    if (!modal) {
      console.error('Modal element not found');
      return;
    }

    document.getElementById('modalBankName').textContent = bankName;
    document.getElementById('modalBankLogo').src = bankLogo;
    document.getElementById('modalInterestRate').textContent = interestRate.split(':')[1].trim();
    document.getElementById('modalMaxLoan').textContent = maxLoan.split(':')[1].trim();
    document.getElementById('modalTerm').textContent = maxTerm.split(':')[1].trim();

    // Get bank details from the bankDetails object
    const bankInfo = bankDetails[bankName];
    if (!bankInfo) {
      console.error('Bank information not found for:', bankName);
      return;
    }

    // Update requirements
    const requirementsList = document.querySelector('.requirement-list');
    if (requirementsList) {
      requirementsList.innerHTML = '';
      bankInfo.requirements.forEach(req => {
        const li = document.createElement('li');
        li.textContent = req;
        requirementsList.appendChild(li);
      });
    }

    // Update documents
    const documentsList = document.querySelector('.document-list');
    if (documentsList) {
      documentsList.innerHTML = '';
      bankInfo.documents.forEach(doc => {
        const li = document.createElement('li');
        li.textContent = doc;
        documentsList.appendChild(li);
      });
    }

    // Update promotions
    const promotionsList = document.getElementById('modalPromotions');
    if (promotionsList) {
      promotionsList.innerHTML = '';
      bankInfo.promotions.forEach(promo => {
        const li = document.createElement('li');
        if (promo.match(/^\d+\./)) {
          li.setAttribute('data-level', '1');
          li.textContent = promo;
        } else {
          li.textContent = promo.replace(/^[•\s]+/, '• ');
        }
        promotionsList.appendChild(li);
      });
    }

    modal.style.display = "block";
  } catch (error) {
    console.error('Error in showLoanDetails:', error);
  }
}

// Show payment schedule modal
function showPaymentSchedule(button) {
  const loanDetailsModal = document.getElementById('loanDetailsModal');
  const paymentScheduleModal = document.getElementById('paymentScheduleModal');

  // Get loan details
  const interestRate = document.getElementById('modalInterestRate').textContent;
  const maxLoan = document.getElementById('modalMaxLoan').textContent;
  const term = document.getElementById('modalTerm').textContent;

  // Update payment schedule fields
  document.getElementById('mortgageAmount').textContent = maxLoan;
  document.getElementById('borrowingTerm').textContent = term;
  document.getElementById('annualInterestRate').textContent = interestRate;

  // Hide loan details modal and show payment schedule modal
  loanDetailsModal.style.display = "none";
  paymentScheduleModal.style.display = "block";
}

// Close payment schedule modal
function closePaymentSchedule() {
  const paymentScheduleModal = document.getElementById('paymentScheduleModal');
  const loanDetailsModal = document.getElementById('loanDetailsModal');

  paymentScheduleModal.style.display = "none";
  loanDetailsModal.style.display = "block";
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Modal close logic
  const modal = document.getElementById('loanDetailsModal');
  const closeBtn = document.querySelector('.loan-modal-close');

  if (closeBtn) {
    closeBtn.onclick = function () {
      modal.style.display = "none";
    };
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Tab switching functionality
  document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all tabs
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

      // Add active class to clicked tab
      button.classList.add('active');
      const tabContent = document.getElementById(`${button.dataset.tab}-tab`);
      if (tabContent) {
        tabContent.classList.add('active');
      }

      // If switching to payment schedule tab, update the values
      if (button.dataset.tab === 'schedule') {
        const interestRate = document.getElementById('modalInterestRate').textContent;
        const maxLoan = document.getElementById('modalMaxLoan').textContent;
        const term = document.getElementById('modalTerm').textContent;

        document.getElementById('mortgageAmount').textContent = maxLoan;
        document.getElementById('borrowingTerm').textContent = term;
        document.getElementById('annualInterestRate').textContent = interestRate;
      }
    });
  });

  // Feedback functionality
  const stars = document.querySelectorAll('.star');
  const ratingText = document.querySelector('.rating-text');
  const submitButton = document.getElementById('submitFeedback');
  const feedbackSuccess = document.getElementById('feedbackSuccess');
  let currentRating = 0;

  const ratingTexts = {
    1: 'Very unsatisfied',
    2: 'Unsatisfied',
    3: 'Neutral',
    4: 'Satisfied',
    5: 'Very satisfied'
  };

  // Handle star click
  stars.forEach(star => {
    star.addEventListener('click', function () {
      const rating = parseInt(this.dataset.rating);
      currentRating = rating;

      // Update active state
      stars.forEach(s => {
        if (parseInt(s.dataset.rating) <= rating) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });

      // Update text
      ratingText.textContent = ratingTexts[rating];
    });
  });

  // Handle feedback submission
  if (submitButton) {
    submitButton.addEventListener('click', function () {
      if (!currentRating) {
        alert('Please select a rating!');
        return;
      }

      const feedbackText = document.getElementById('feedbackText').value;
      console.log('Feedback submitted:', { rating: currentRating, text: feedbackText });

      // Show success message
      feedbackSuccess.style.display = 'block';

      // Reset form after 3 seconds
      setTimeout(() => {
        currentRating = 0;
        stars.forEach(s => s.classList.remove('active'));
        ratingText.textContent = 'Rating';
        document.getElementById('feedbackText').value = '';
        feedbackSuccess.style.display = 'none';
      }, 3000);
    });
  }

  // Loan application form
  const loanApplicationForm = document.getElementById('loanApplicationForm');
  if (loanApplicationForm) {
    loanApplicationForm.onsubmit = function (e) {
      e.preventDefault();
      const fullName = document.getElementById('fullName').value;
      const phoneNumber = document.getElementById('phoneNumber').value;
      const loanAmount = document.getElementById('loanAmount').value;
      const loanTerm = document.getElementById('loanTerm').value;

      alert(`Cảm ơn ${fullName} đã đăng ký!\nChúng tôi sẽ liên hệ với bạn qua số điện thoại ${phoneNumber} trong thời gian sớm nhất.`);

      document.getElementById('loanDetailsModal').style.display = "none";
      this.reset();
    };
  }

  // Filter logic
  const applyFiltersBtn = document.getElementById('applyFilters');
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', function () {
      this.classList.add('loading');
      const filters = {
        loanAmount: document.getElementById('loanAmount')?.value || '',
        monthlyIncome: document.getElementById('monthlyIncome')?.value || '',
        ageGroup: getCheckedValues('Age Group'),
        occupationalStatus: getCheckedValues('Occupational Status'),
        desiredTerm: document.getElementById('termSlider')?.value || ''
      };

      setTimeout(() => {
        // filterResults(filters);
        this.classList.remove('loading');
        if (window.innerWidth <= 768) {
          document.querySelector('.result-section')?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    });
  }

  // Pre-fill calculator inputs when opening modal
  document.querySelectorAll('.details-button').forEach(button => {
    button.addEventListener('click', function () {
      const card = this.closest('.result-card');
      if (card) {
        const interestRate = parseFloat(card.querySelector('p:nth-child(2)').textContent.match(/\d+\.?\d*/)[0]);
        const maxLoan = parseInt(card.querySelector('p:nth-child(3)').textContent.match(/\d+/)[0]) * 1000000;
        const maxTerm = parseInt(card.querySelector('p:nth-child(4)').textContent.match(/\d+/)[0]);
      }
    });
  });
});

function getCheckedValues(filterTitle) {
  const filterBox = Array.from(document.querySelectorAll('.filter-title'))
    .find(el => el.textContent.includes(filterTitle))
    ?.closest('.filter-box');

  if (!filterBox) return [];

  return Array.from(filterBox.querySelectorAll('input[type="checkbox"]:checked'))
    .map(cb => cb.parentElement.textContent.trim());
}

// function filterResults(filters) {
//   const resultCards = document.querySelectorAll('.result-card');
//   let visibleCount = 0;

//   resultCards.forEach(card => {
//     const loanAmount = parseInt(card.querySelector('p:nth-child(3)').textContent.match(/\d+/)[0]);
//     let shouldShow = true;

//     if (filters.loanAmount && !isNaN(filters.loanAmount)) {
//       shouldShow = shouldShow && loanAmount >= parseInt(filters.loanAmount);
//     }

//     card.style.display = shouldShow ? 'flex' : 'none';
//     if (shouldShow) {
//       card.classList.add('fade-in');
//       visibleCount++;
//     }
//   });

//   const noResultsMsg = document.querySelector('.no-results-message') || createNoResultsMessage();
//   noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
// }

function createNoResultsMessage() {
  const msg = document.createElement('div');
  msg.className = 'no-results-message';
  msg.innerHTML = `
    <div style="text-align: center; padding: 40px; color: #666;">
      <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; margin-bottom: 16px;">
        <path fill="#999" d="M15.5 14h-.79l-.28-.27
          A6.471 6.471 0 0 0 16 9.5
          C16 5.91 13.09 3 9.5 3
          S3 5.91 3 9.5
          5.91 16 9.5 16
          c1.61 0 3.09-.59 4.23-1.57l.27.28v.79
          l5 4.99L20.49 19l-4.99-5z
          M9.5 14C7.01 14 5 11.99 5 9.5
          S7.01 5 9.5 5
          14 7.01 14 9.5
          11.99 14 9.5 14z"/>
      </svg>
      <h3 style="margin: 0 0 8px; color: #333;">Không tìm thấy kết quả phù hợp</h3>
      <p style="margin: 0; color: #666;">Vui lòng thử lại với các tiêu chí khác</p>
    </div>
  `;
  document.querySelector('.results-grid').appendChild(msg);
  return msg;
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD") // Remove accents
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, ''); // Remove all non-letter/number
}

function showMatchingCards(recommendations) {
  const cards = document.querySelectorAll('.result-card');

  cards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.trim();
    const normalizedTitle = normalize(title);

    const match = recommendations.find(r =>
      normalizedTitle.includes(normalize(r.bank_name))
    );

    const existing = card.querySelector('.total-payment');
    if (existing) existing.remove();

    if (match) {
      card.style.display = 'block';
      // card.style.minHeight = '420px';

      // const totalPayEl = document.createElement('p');
      // totalPayEl.className = 'total-payment';
      // totalPayEl.innerHTML = `<strong>Total payment:</strong> ${formatCurrency(match.total_payment)} million VND`;
      // card.querySelector('.card-info').appendChild(totalPayEl);

      const reasonText = document.getElementById("reasonText");
      if (match?.reason || match?.promotion_value || match?.total_payment) {
        let reasonHTML = "";

        if (match.reason) {
          reasonHTML += `<p>${match.reason}</p>`;
        }

        if (match.promotion_value) {
          reasonHTML += `<p>Cashback: ${match.promotion_value * 100}%</p>`;
        }

        if (match.total_payment) {
          reasonHTML += `<p>Total payment: ${formatCurrency(match.total_payment)} million VND</p>`;
        }

        reasonText.innerHTML = reasonHTML;
      } else {
        reasonText.innerText = "No reason available.";
      }

      // Show reason if provided
      // const reasonEl = card.querySelector('.selection-reason');
      // reasonEl.textContent = `Reason: ${match.reason || "no reason"}`;
      // reasonEl.classList.remove('hidden');
    } else {
      card.style.display = 'none';
    }
  });
}

function formatCurrency(num) {
  return new Intl.NumberFormat('vi-VN').format(num);
}

function updateTermLabel(val) {
  const label = document.getElementById('currentTerm');
  label.textContent = val + ' year' + (val > 1 ? 's' : '');
}