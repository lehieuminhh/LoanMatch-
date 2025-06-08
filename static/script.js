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
    requirements: [
      'Công dân Việt Nam từ 20-65 tuổi',
      'Thu nhập tối thiểu: 10 triệu/tháng',
      'Thời gian làm việc: ≥ 12 tháng',
      'Không có nợ xấu tại các TCTD'
    ],
    documents: [
      'CMND/CCCD & Hộ khẩu',
      'Hợp đồng lao động',
      'Sao kê lương 3 tháng gần nhất',
      'Hóa đơn điện/nước (chứng minh nơi ở)'
    ],
    promotions: [
      'Miễn phí phí trả nợ trước hạn',
      'Ưu đãi lãi suất 8.5% trong 3 tháng đầu',
      'Tặng bảo hiểm khoản vay trị giá 2.000.000 VNĐ'
    ]
  },
  'ACB': {
    requirements: [
      'Công dân Việt Nam từ 20-60 tuổi',
      'Thu nhập tối thiểu: 8 triệu/tháng',
      'Thời gian làm việc: ≥ 6 tháng',
      'Không có nợ xấu trong 12 tháng gần nhất'
    ],
    documents: [
      'CMND/CCCD',
      'Sổ hộ khẩu/KT3',
      'Hợp đồng lao động',
      'Sao kê lương 3 tháng gần nhất',
      'Hóa đơn điện/nước/internet'
    ],
    promotions: [
      'Ưu đãi lãi suất chỉ từ 8.5%/năm',
      'Miễn phí tất toán khoản vay trước hạn',
      'Tặng voucher mua sắm trị giá 500.000 VNĐ'
    ]
  },
  'BIDV': {
    requirements: [
      'Công dân Việt Nam từ 18-65 tuổi',
      'Thu nhập tối thiểu: 7 triệu/tháng',
      'Thời gian làm việc: ≥ 12 tháng',
      'Không có nợ xấu tại BIDV và các TCTD khác'
    ],
    documents: [
      'CMND/CCCD',
      'Sổ hộ khẩu',
      'Hợp đồng lao động',
      'Bảng lương 3 tháng gần nhất',
      'Sao kê tài khoản ngân hàng'
    ],
    promotions: [
      'Lãi suất ưu đãi chỉ từ 7.5%/năm trong 6 tháng đầu',
      'Miễn phí phí trả nợ trước hạn sau 6 tháng',
      'Tặng bảo hiểm sức khỏe 1 năm'
    ]
  }
  // Thêm thông tin cho các ngân hàng khác ở đây
};

// Show loan details modal
function showLoanDetails(card) {
  const bankName = card.querySelector('.card-title').textContent.split('-')[0].trim();
  const interestRate = card.querySelector('p:nth-child(2)').textContent;
  const maxLoan = card.querySelector('p:nth-child(3)').textContent;
  const maxTerm = card.querySelector('p:nth-child(4)').textContent;
  const bankLogo = card.querySelector('img').src;

  document.getElementById('modalBankName').textContent = bankName;
  document.getElementById('modalBankLogo').src = bankLogo;
  document.getElementById('modalInterestRate').textContent = interestRate.split(':')[1].trim();
  document.getElementById('modalMaxLoan').textContent = maxLoan.split(':')[1].trim();
  document.getElementById('modalTerm').textContent = maxTerm.split(':')[1].trim();

  const bankInfo = bankDetails[bankName] || {
    requirements: [
      'Công dân Việt Nam từ 20-65 tuổi',
      'Thu nhập tối thiểu: 8 triệu/tháng',
      'Thời gian làm việc: ≥ 12 tháng',
      'Không có nợ xấu tại các TCTD'
    ],
    documents: [
      'CMND/CCCD & Hộ khẩu',
      'Hợp đồng lao động',
      'Sao kê lương 3 tháng gần nhất',
      'Hóa đơn điện/nước (chứng minh nơi ở)'
    ],
    promotions: [
      'Miễn phí phí trả nợ trước hạn',
      'Ưu đãi lãi suất trong 3 tháng đầu',
      'Tặng bảo hiểm khoản vay'
    ]
  };

  // Update requirements
  const requirementsList = document.querySelector('.requirement-list');
  requirementsList.innerHTML = '';
  bankInfo.requirements.forEach(req => {
    const li = document.createElement('li');
    li.textContent = req;
    requirementsList.appendChild(li);
  });

  // Update documents
  const documentsList = document.querySelector('.document-list');
  documentsList.innerHTML = '';
  bankInfo.documents.forEach(doc => {
    const li = document.createElement('li');
    li.textContent = doc;
    documentsList.appendChild(li);
  });

  // Update promotions
  const promotionsList = document.getElementById('modalPromotions');
  promotionsList.innerHTML = '';
  bankInfo.promotions.forEach(promo => {
    const li = document.createElement('li');
    li.textContent = promo;
    promotionsList.appendChild(li);
  });

  document.getElementById('loanDetailsModal').style.display = "block";
}

// Modal close logic
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('loanDetailsModal');
  const closeBtn = document.querySelector('.loan-modal-close');
  closeBtn.onclick = () => modal.style.display = "none";
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Real-time slider for Desired Term
  const termSlider = document.getElementById('termSlider');
  const currentTerm = document.getElementById('currentTerm');

  if (termSlider && currentTerm) {
    currentTerm.textContent = `${termSlider.value} ${termSlider.value === '1' ? 'month' : 'months'}`;
    termSlider.addEventListener('input', function () {
      currentTerm.textContent = `${this.value} ${this.value === '1' ? 'month' : 'months'}`;
    });
  }

  // Add click to each "Details" button
  document.querySelectorAll('.details-button').forEach(button => {
    button.onclick = function (e) {
      e.preventDefault();
      const card = this.closest('.result-card');
      showLoanDetails(card);
    };
  });
});

// Loan application submission
document.getElementById('loanApplicationForm').onsubmit = function (e) {
  e.preventDefault();
  const fullName = document.getElementById('fullName').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const loanAmount = document.getElementById('loanAmount').value;
  const loanTerm = document.getElementById('loanTerm').value;

  alert(`Cảm ơn ${fullName} đã đăng ký!\nChúng tôi sẽ liên hệ với bạn qua số điện thoại ${phoneNumber} trong thời gian sớm nhất.`);

  document.getElementById('loanDetailsModal').style.display = "none";
  this.reset();
};

// Filter logic
document.getElementById('applyFilters').addEventListener('click', function () {
  this.classList.add('loading');
  const filters = {
    loanAmount: document.getElementById('loanAmount').value,
    monthlyIncome: document.getElementById('monthlyIncome').value,
    ageGroup: getCheckedValues('Age Group'),
    occupationalStatus: getCheckedValues('Occupational Status'),
    desiredTerm: document.getElementById('termSlider')?.value || ''
  };

  setTimeout(() => {
    filterResults(filters);
    this.classList.remove('loading');
    if (window.innerWidth <= 768) {
      document.querySelector('.result-section').scrollIntoView({ behavior: 'smooth' });
    }
  }, 1000);
});

function getCheckedValues(filterTitle) {
  const filterBox = Array.from(document.querySelectorAll('.filter-title'))
    .find(el => el.textContent.includes(filterTitle))
    ?.closest('.filter-box');
  if (!filterBox) return [];
  return Array.from(filterBox.querySelectorAll('input[type="checkbox"]:checked'))
    .map(cb => cb.parentElement.textContent.trim());
}

function filterResults(filters) {
  const resultCards = document.querySelectorAll('.result-card');
  let visibleCount = 0;

  resultCards.forEach(card => {
    const loanAmount = parseInt(card.querySelector('p:nth-child(3)').textContent.match(/\d+/)[0]);
    let shouldShow = true;

    if (filters.loanAmount && !isNaN(filters.loanAmount)) {
      shouldShow = shouldShow && loanAmount >= parseInt(filters.loanAmount);
    }

    card.style.display = shouldShow ? 'flex' : 'none';
    if (shouldShow) {
      card.classList.add('fade-in');
      visibleCount++;
    }
  });

  const noResultsMsg = document.querySelector('.no-results-message') || createNoResultsMessage();
  noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
}

function createNoResultsMessage() {
  const msg = document.createElement('div');
  msg.className = 'no-results-message';
  msg.innerHTML = `
    <div style="text-align: center; padding: 40px; color: #666;">
      <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; margin-bottom: 16px;">
        <path fill="#999" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5..."/>
      </svg>
      <h3 style="margin: 0 0 8px; color: #333;">Không tìm thấy kết quả phù hợp</h3>
      <p style="margin: 0; color: #666;">Vui lòng thử lại với các tiêu chí khác</p>
    </div>
  `;
  document.querySelector('.results-grid').appendChild(msg);
  return msg;
}
