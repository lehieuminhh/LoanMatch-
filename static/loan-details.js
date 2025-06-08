// Bank-specific loan details
const bankDetails = {
  'ABBank': {
    // ... existing code ...
  },
  'ACB': {
    // ... existing code ...
  },
  'BAOVIET Bank - Preferential Loan Package': {
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
      "Income proof: Employment contract, salary statement",
      "Collateral documents: Land use right certificate, house purchase contract"
    ],
    promotions: [
      "Fixed interest rate for the first 12 months",
      "Free asset valuation during the promotional period",
      "Complimentary life insurance (depending on the campaign period)"
    ]
  },
  'Bac A Bank - Preferential Loan Package': {
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
      "Income proof: Employment contract, salary statement",
      "Collateral documents: Land use right certificate, house purchase contract"
    ],
    promotions: [
      "Preferential interest rate for the first 6 months",
      "Home appraisal support service available"
    ]
  },
  'BV Bank - Preferential Loan Package': {
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
      "Income proof: Employment contract, salary statement",
      "Collateral documents: Land use right certificate, house purchase contract"
    ],
    promotions: [
      "Low interest rate of 8.1% in the first year",
      "Free account opening"
    ]
  },
  'Vikki Bank - Preferential Loan Package': {
    requirements: [
      "Collateral must be house/land",
      "Borrow up to 80% of the asset value",
      "Maximum loan term of 25 years"
    ],
    documents: [
      "Loan application form (Vikki Bank's template)",
      "Legal documents",
      "Documents proving the purpose of loan use",
      "Documents proving income",
      "Collateral documents"
    ],
    promotions: [
      "Fixed preferential interest rate for 12 months",
      "Reduced early repayment fees"
    ]
  },
  'Eximbank - Preferential Loan Package': {
    requirements: [
      "Loan limit up to 85% of the asset value",
      "Borrow up to 25 years",
      "Collateral from family members is accepted"
    ],
    documents: [
      "Loan application form (as per Eximbank's template)",
      "Citizen ID, household registration book",
      "Marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statement",
      "Collateral documents: Land use right certificate, house purchase contract"
    ],
    promotions: [
      "Preferential interest rate of 7.9%",
      "Free account opening and SMS notification service"
    ]
  },
  'HDBank - Preferential Loan Package': {
    requirements: [
      "Borrow up to 80% of the asset value",
      "Maximum loan term of 20 years",
      "Flexible installment repayment available"
    ],
    documents: [
      "Loan application form (as per HDBank's template)",
      "Citizen ID, household registration book",
      "Marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements",
      "Collateral documents: Land use right certificate, house purchase contract"
    ],
    promotions: [
      "Gift upon contract signing"
    ]
  },
  'Kienlong Bank - Preferential Loan Package': {
    requirements: [
      "Borrow 75% of the asset value",
      "Maximum term of 15–20 years",
      "Suburban land can be used as collateral"
    ],
    documents: [
      "Loan application form (as per Kien Long Bank's template)",
      "ID card/Citizen ID/Passport",
      "Household registration or temporary residence book",
      "Certificate of marital status",
      "Income proof: Employment contract, payslip",
      "Collateral documents: Land use right certificate"
    ],
    promotions: [
      "Low interest rates for rural areas"
    ]
  },
  'LPBank - Preferential Loan Package': {
    requirements: [
      "Borrow up to 80% of the asset value",
      "Maximum loan term of 25 years",
      "Flexible collateral options"
    ],
    documents: [
      "Loan application form (as per LPBank's template)",
      "ID card/Citizen ID/Passport",
      "Household registration or temporary residence book",
      "Certificate of marital status",
      "Income proof: Employment contract, payslip",
      "Collateral documents: Land use right certificate"
    ],
    promotions: [
      "Preferential interest rate for the first 12 months",
      "Support for notarization costs"
    ]
  }
};

// Show loan details modal
function showLoanDetails(card) {
  try {
    const bankName = card.querySelector('.card-title').textContent;
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

// Modal close logic
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('loanDetailsModal');
  const closeBtn = document.querySelector('.loan-modal-close');
  
  if (closeBtn) {
    closeBtn.onclick = function() {
      modal.style.display = "none";
    };
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}); 