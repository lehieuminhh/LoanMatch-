// Bank-specific loan details
const bankDetails = {
  'ABBank': {
    requirements: [
      "Vietnamese nationality",
      "Permanent/temporary residence in the same area where an ABBANK branch/transaction office is located",
      "Aged between 18 and 65",
      "Have collateral assets that meet ABBANK's regulations",
      "Applicants must have a stable source of income",
      "No bad debt at any bank/credit institution"
    ],
    documents: [
      "Loan application form (as per ABBank's template)",
      "National ID (CCCD), household registration book",
      "Marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statement",
      "Collateral documents: Land use right certificate, house purchase contract"
    ],
    promotions: [
      "1. Special loan package:",
      "• Interest rate from 9.65%/year",
      "• Fast approval within 24 hours",
      "2. Additional benefits:",
      "• Free property valuation",
      "• No early repayment fee"
    ]
  },
  'ACB': {
    requirements: [
      "Vietnamese nationality",
      "Aged 18 or above",
      "Have a stable income and sufficient repayment capacity",
      "Possess collateral such as the vehicle or property being purchased",
      "Maintain a good credit history with no record of bad debt"
    ],
    documents: [
      "Loan application form (as per ACB's template)",
      "National ID/ Citizen ID or passport",
      "Household registration book or temporary residence book", 
      "Certificate of marital status",
      "Income proof: Employment contract, salary statement",
      "Collateral documents: Land use right certificate, house purchase contract"
    ],
    promotions: [
      "1. Preferential interest rates:",
      "• 8.5% per annum for the first 3 months",
      "• 9% per annum for the first 6 months",
      "• 9.5% per annum for the first 12 months",
      "2. Additional benefits:",
      "• Free property valuation",
      "• Flexible repayment terms"
    ]
  },
  'BAOVIET Bank': {
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
      "1. Special offers:",
      "• Fixed interest rate for the first 12 months",
      "• Free asset valuation during the promotional period",
      "• Complimentary life insurance (depending on the campaign period)"
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
      "Income proof: Employment contract, salary statement",
      "Collateral documents: Land use right certificate, house purchase contract"
    ],
    promotions: [
      "1. Current promotions:",
      "• Preferential interest rate for the first 6 months",
      "• Home appraisal support service available"
    ]
  },
  'BV Bank': {
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
      "1. Special offers:",
      "• Low interest rate of 8.1% in the first year",
      "• Free account opening"
    ]
  },
  'Vikki Bank': {
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
      "1. Current offers:",
      "• Fixed preferential interest rate for 12 months",
      "• Reduced early repayment fees"
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
      "Citizen ID, household registration book",
      "Marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statement",
      "Collateral documents: Land use right certificate, house purchase contract"
    ],
    promotions: [
      "1. Current offers:",
      "• Preferential interest rate of 7.9%",
      "• Free account opening and SMS notification service"
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
      "Citizen ID, household registration book",
      "Marriage certificate or certificate of single status",
      "Income proof: Employment contract, salary statements",
      "Collateral documents: Land use right certificate, house purchase contract"
    ],
    promotions: [
      "1. Special benefits:",
      "• Gift upon contract signing",
      "• Flexible repayment schedule"
    ]
  },
  'Kienlong Bank': {
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
      "1. Special offers:",
      "• Low interest rates for rural areas",
      "• Flexible loan terms"
    ]
  }
};

// Export the bankDetails object
window.bankDetails = bankDetails; 