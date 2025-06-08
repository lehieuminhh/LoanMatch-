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
  'MSB': {
    requirements: [
      'Vietnamese nationality',
      'Age 20 to 65',
      'Minimum income 8 million VND/month',
      'No bad debt record'
    ],
    documents: [
      'ID card/Citizen card',
      'Household registration',
      'Labor contract',
      'Last 3 months salary statement',
      'Bank statement for the last 3 months'
    ],
    promotions: [
      '1. Premium loan package:',
      '• Interest rate from 9.6%/year',
      '• Loan up to 2000 million VND',
      '• Fast approval within 24 hours',
      '2. Digital banking benefits:',
      '• Free online banking services',
      '• Free interbank transfers',
      '• Mobile banking app with loan tracking',
      '3. Special offers:',
      '• Insurance package worth up to 100 million VND',
      '• Flexible repayment terms',
      '• Early repayment fee reduction'
    ]
  },
  'SHB Bank': {
    requirements: [
      'Vietnamese nationality',
      'Age 20 to 65',
      'Minimum income 8 million VND/month',
      'No bad debt record'
    ],
    documents: [
      'ID card/Citizen card',
      'Household registration',
      'Labor contract',
      'Last 3 months salary statement',
      'Bank statement for the last 3 months'
    ],
    promotions: [
      '1. Premium loan package:',
      '• Interest rate from 8.5%/year',
      '• Loan up to 1000 million VND',
      '• Fast approval within 24 hours',
      '2. Digital banking benefits:',
      '• Free online banking services',
      '• Free interbank transfers',
      '• Mobile banking app with loan tracking',
      '3. Special offers:',
      '• Insurance package worth up to 50 million VND',
      '• Flexible repayment terms',
      '• Early repayment fee reduction'
    ]
  },
  'OCB': {
    requirements: [
      'Vietnamese nationality',
      'Age 20 to 65',
      'Minimum income 8 million VND/month',
      'Clean credit history'
    ],
    documents: [
      'ID card/Citizen card',
      'Household registration',
      'Labor contract',
      'Last 3 months salary statement',
      'Tax return (if applicable)'
    ],
    promotions: [
      '1. Standard loan package:',
      '• Interest rate from 8%/year',
      '• Loan amount up to 500 million VND',
      '• Term up to 60 months',
      '2. Digital advantages:',
      '• Online application available',
      '• Real-time loan status tracking',
      '• Free OCB mobile banking',
      '3. Additional benefits:',
      '• Zero processing fee',
      '• Flexible payment schedules',
      '• Complementary credit card'
    ]
  },
  'Techcombank': {
    requirements: [
      'Vietnamese nationality',
      'Age 20 to 70',
      'Minimum income 10 million VND/month',
    ],
    documents: [
      'ID card/Citizen card',
      'Household registration/KT3',
      'Labor contract',
      'Last 3 months salary statement',
      'Utility bills (electricity/water/internet)'
    ],
    promotions: [
      '1. Loan package for real estate:',
      '• Loan essence from only: 7.3%/year',
      '• Loan term up to: 35 years',
      '• Disbursement immediately upon signing a notarized sale and purchase contract, applicable to real estate with a certificate of ownership in Hanoi, Ho Chi Minh City with other conditions',
      '2. Attractive incentives:',
      '• With a super preferential salary from only 7.5%/6 months; 7.3%/12 months.',
      '• Continue to REDUCE interest for the following periods after the end of the fixed interest rate by 0.3% - 0.8% - 1.2%/year, based on the customer\'s assets and transactions at Techcombank',
      '• The maximum pre-approved term is equal to the outstanding balance',
      '• Used for many purposes such as buying real estate, buying cars, consuming (building/repairing houses/purchasing furniture, account appraisal, etc.)',
      '3. Program application for:',
      'Individual customers who have a real estate loan account at Techcombank and have paid a part of the loan account balance, the amount paid is from 100 million VND or more',
      'Do not violate the credit usage history according to Techcombank\'s regulations from time to time',
      'Credit rating: from B3 or higher',
      'The customer\'s total outstanding balance at all credit institutions at the time of settling the bank loan to buy real estate is larger than at the present time'
    ]
  },
  'VPBank': {
    requirements: [
      'Vietnamese nationality',
      'Age 21 to 65',
      'Minimum income 8 million VND/month',
      'No bad debt in the last 24 months'
    ],
    documents: [
      'ID card/Citizen card',
      'Household registration/KT3',
      'Labor contract',
      'Last 3 months salary statement'
    ],
    promotions: [
      '1. Special loan package:',
      '• Interest rate from 16%/year',
      '• Disbursement within 24 hours',
      '• Free processing fee',
      '2. Online application benefits:',
      '• Additional 0.5% interest rate reduction',
      '• Free early repayment fee',
      '• Cashback up to 1,000,000 VND'
    ]
  },
  'ACB': {
    requirements: [
      'Vietnamese nationality',
      'Age 20 to 60',
      'Minimum income 8 million VND/month',
      'No bad debt in the last 12 months'
    ],
    documents: [
      'ID card/Citizen card',
      'Household registration/KT3',
      'Labor contract',
      'Last 3 months salary statement',
      'Utility bills'
    ],
    promotions: [
      '1. Standard loan package benefits:',
      '• Interest rate from 9.6%/year',
      '• Free early settlement fee',
      '• Shopping voucher worth 500,000 VND',
      '2. Premium loan package benefits:',
      '• Preferential interest rate for the first 6 months',
      '• Free loan insurance',
      '• Extended loan term up to 84 months'
    ]
  },
  'TPBank': {
    requirements: [
      'Vietnamese nationality',
      'Age 20 to 65',
      'Minimum income 8 million VND/month',
      'No bad debt record'
    ],
    documents: [
      'ID card/Citizen card',
      'Household registration',
      'Labor contract',
      'Last 3 months salary statement'
    ],
    promotions: [
      '1. Quick loan package benefits:',
      '• Interest rate from 10.8%/year',
      '• 24-hour disbursement guarantee',
      '• Free loan insurance',
      '2. Digital loan application benefits:',
      '• Additional 0.3% interest rate reduction',
      '• eKYC verification available',
      '• Free account maintenance fee'
    ]
  },
  'HDBank': {
    requirements: [
      'Vietnamese nationality',
      'Age 20 to 65',
      'Minimum income 8 million VND/month',
      'No bad debt record'
    ],
    documents: [
      'ID card/Citizen card',
      'Household registration',
      'Labor contract',
      'Last 3 months salary statement'
    ],
    promotions: [
      '1. Quick loan package benefits:',
      '• Interest rate from 8%/year',
      '• 24-hour disbursement guarantee',
      '• Free loan insurance',
      '2. Digital loan application benefits:',
      '• Additional 0.3% interest rate reduction',
      '• eKYC verification available',
      '• Free account maintenance fee'
    ]
  },
  'Sacombank': {
    requirements: [
      'Vietnamese nationality',
      'Age 20 to 65',
      'Minimum income 8 million VND/month',
      'No bad debt record'
    ],
    documents: [
      'ID card/Citizen card',
      'Household registration',
      'Labor contract',
      'Last 3 months salary statement'
    ],
    promotions: [
      '1. Standard loan package benefits:',
      '• Interest rate from 9.6%/year',
      '• Free early settlement fee',
      '• Shopping voucher worth 500,000 VND',
      '2. Premium loan package benefits:',
      '• Preferential interest rate for the first 6 months',
      '• Free loan insurance',
      '• Extended loan term up to 60 months'
    ]
  },
  'VIB': {
    requirements: [
      'Vietnamese nationality',
      'Age 21 to 65',
      'Minimum income 8 million VND/month',
      'No bad debt in the last 24 months'
    ],
    documents: [
      'ID card/Citizen card',
      'Household registration/KT3',
      'Labor contract',
      'Last 3 months salary statement'
    ],
    promotions: [
      '1. Special loan package:',
      '• Interest rate from 16%/year',
      '• Disbursement within 24 hours',
      '• Free processing fee',
      '2. Online application benefits:',
      '• Additional 0.5% interest rate reduction',
      '• Free early repayment fee',
      '• Cashback up to 1,000,000 VND'
    ]
  }
};

// Show loan details modal
function showLoanDetails(card) {
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
}

// Modal close logic
function initializeModalHandlers() {
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

  // Add click to each "Details" button
  document.querySelectorAll('.details-button').forEach(button => {
    button.onclick = function (e) {
      e.preventDefault();
      const card = this.closest('.result-card');
      if (card) {
        showLoanDetails(card);
      }
    };
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initializeModalHandlers();

  // Real-time slider for Desired Term (in months)
  const termSlider = document.getElementById('termSlider');
  const currentTerm = document.getElementById('currentTerm');

  if (termSlider && currentTerm) {
    currentTerm.textContent = `${termSlider.value} ${termSlider.value === '1' ? 'month' : 'months'}`;
    termSlider.addEventListener('input', function () {
      currentTerm.textContent = `${this.value} ${this.value === '1' ? 'month' : 'months'}`;
    });
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

  // Form submission
  const loanApplicationForm = document.getElementById('loanApplicationForm');
  if (loanApplicationForm) {
    loanApplicationForm.onsubmit = function (e) {
      e.preventDefault();
      const fullName = document.getElementById('fullName')?.value || '';
      const phoneNumber = document.getElementById('phoneNumber')?.value || '';
      const loanAmount = document.getElementById('loanAmount')?.value || '';
      const loanTerm = document.getElementById('loanTerm')?.value || '';

      alert(`Cảm ơn ${fullName} đã đăng ký!\nChúng tôi sẽ liên hệ với bạn qua số điện thoại ${phoneNumber} trong thời gian sớm nhất.`);

      const modal = document.getElementById('loanDetailsModal');
      if (modal) {
        modal.style.display = "none";
      }
      this.reset();
    };
  }

  // Rating functionality
  const stars = document.querySelectorAll('.star');
  const ratingText = document.querySelector('.rating-text');
  const ratingDescription = document.querySelector('.rating-description');
  const submitButton = document.getElementById('submitFeedback');
  const feedbackSuccess = document.getElementById('feedbackSuccess');
  let currentRating = 0;

  const ratingDescriptions = {
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

      // Update description
      ratingDescription.textContent = ratingDescriptions[rating];
    });

    // Handle hover effects
    star.addEventListener('mouseenter', function () {
      const rating = parseInt(this.dataset.rating);
      ratingDescription.textContent = ratingDescriptions[rating];
    });

    star.addEventListener('mouseleave', function () {
      ratingDescription.textContent = currentRating ? ratingDescriptions[currentRating] : '';
    });
  });

  // Handle feedback submission
  if (submitButton) {
    submitButton.addEventListener('click', function () {
      if (!currentRating) {
        alert('Please select a rating before submitting!');
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
        ratingDescription.textContent = '';
        document.getElementById('feedbackText').value = '';
        feedbackSuccess.style.display = 'none';
      }, 3000);
    });
  }

  // Tab switching functionality
  document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all tabs
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

      // Add active class to clicked tab
      button.classList.add('active');
      const tabContent = document.getElementById(`${button.dataset.tab}-tab`);
      tabContent.classList.add('active');
    });
  });
});

function updateTermLabel(val) {
  const label = document.getElementById('currentTerm');
  label.textContent = val + ' month' + (val > 1 ? 's' : '');
}

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


function calculateMonthlyPayment(principal, monthlyRate, term) {
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) /
    (Math.pow(1 + monthlyRate, term) - 1);
}

function generateAmortizationSchedule(principal, monthlyRate, term, monthlyPayment) {
  let schedule = [];
  let balance = principal;
  let totalInterest = 0;

  for (let month = 1; month <= term; month++) {
    const interest = balance * monthlyRate;
    const principalPaid = monthlyPayment - interest;
    balance -= principalPaid;
    totalInterest += interest;

    schedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPaid,
      interest,
      balance: Math.max(0, balance),
      totalInterest
    });
  }

  return schedule;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function displayResults(monthlyPayment, schedule) {
  // Update summary
  document.getElementById('monthlyPayment').textContent = formatCurrency(monthlyPayment);
  document.getElementById('totalInterest').textContent = formatCurrency(schedule[schedule.length - 1].totalInterest);
  document.getElementById('totalPayment').textContent = formatCurrency(monthlyPayment * schedule.length);

  // Update schedule table
  const tbody = document.getElementById('scheduleBody');
  tbody.innerHTML = '';

  schedule.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.month}</td>
      <td>${formatCurrency(row.payment)}</td>
      <td>${formatCurrency(row.principal)}</td>
      <td>${formatCurrency(row.interest)}</td>
      <td>${formatCurrency(row.balance)}</td>
    `;
    tbody.appendChild(tr);
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

      const loanAmountInput = document.getElementById('loanAmount');
      const loanTermInput = document.getElementById('loanTerm');
      const interestRateInput = document.getElementById('interestRate');

      if (loanAmountInput) loanAmountInput.value = maxLoan;
      if (loanTermInput) loanTermInput.value = maxTerm / 12; // Convert months to years
      if (interestRateInput) interestRateInput.value = interestRate;
    }
  });
});

// Initialize loan schedule calculation
function initializeLoanSchedule() {
  const mortgageAmount = 400000;
  const borrowingTerm = 30;
  const annualInterestRate = 5.00;
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const numberOfPeriods = borrowingTerm * 12;

  // Calculate monthly payment using the formula: P = L[c(1 + c)^n]/[(1 + c)^n - 1]
  // Where: P = Payment, L = Loan amount, c = monthly interest rate, n = number of payments
  const monthlyPayment = (mortgageAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPeriods)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPeriods) - 1);

  generateAmortizationSchedule(mortgageAmount, monthlyInterestRate, numberOfPeriods, monthlyPayment);
}

function generateAmortizationSchedule(principal, monthlyRate, totalPeriods, monthlyPayment) {
  let balance = principal;
  const tbody = document.getElementById('scheduleBody');
  tbody.innerHTML = '';

  // We'll show the last few rows as in the image (342-360)
  const startPeriod = 342;

  for (let month = startPeriod; month <= totalPeriods; month++) {
    const interest = balance * monthlyRate;
    const principalPaid = monthlyPayment - interest;
    balance = Math.max(0, balance - principalPaid);

    const percentageInterest = (interest / monthlyPayment * 100).toFixed(2);
    const percentagePrincipal = (principalPaid / monthlyPayment * 100).toFixed(2);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${month}</td>
      <td>($${monthlyPayment.toFixed(0)})</td>
      <td>($${interest.toFixed(0)})</td>
      <td>($${principalPaid.toFixed(0)})</td>
      <td>$${balance.toFixed(0)}</td>
      <td>${percentageInterest}%</td>
      <td>${percentagePrincipal}%</td>
    `;
    tbody.appendChild(tr);
  }
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
          reasonHTML += "<p>Occupation is compatible</p>";
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