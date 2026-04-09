const baRange = document.getElementById('baRange');
const afterImage = document.getElementById('afterImage');
const divider = document.getElementById('divider');

if (baRange && afterImage && divider) {
  const updateBeforeAfter = () => {
    const value = baRange.value;
    afterImage.style.clipPath = `inset(0 0 0 ${value}%)`;
    divider.style.left = `${value}%`;
  };

  baRange.addEventListener('input', updateBeforeAfter);
  updateBeforeAfter();
}

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const extraItems = document.querySelectorAll('.extra-item');

let expanded = false;

function applyGalleryFilter() {
  const activeButton = document.querySelector('.filter-btn.active');
  const currentFilter = activeButton ? activeButton.dataset.filter : 'all';

  galleryItems.forEach((item) => {
    const category = item.dataset.category || '';
    const matches = currentFilter === 'all' || category.includes(currentFilter);
    const hiddenByLoadMore = item.classList.contains('extra-item') && !expanded;

    item.style.display = matches && !hiddenByLoadMore ? 'block' : 'none';
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    applyGalleryFilter();
  });
});

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    expanded = !expanded;
    extraItems.forEach((item) => {
      item.classList.toggle('hidden', !expanded);
    });
    loadMoreBtn.textContent = expanded ? 'Show Less' : 'Load More';
    applyGalleryFilter();
  });
}

applyGalleryFilter();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const serviceType = document.getElementById('serviceType');
    const message = document.getElementById('message');

    let isValid = true;

    const showError = (field) => {
      field.style.borderColor = 'red';
      isValid = false;
    };

    const clearError = (field) => {
      field.style.borderColor = '';
    };

    if (!name.value.trim()) {
      showError(name);
    } else {
      clearError(name);
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value)) {
      showError(email);
    } else {
      clearError(email);
    }

    const phonePattern = /^[0-9+\-\s()]{7,}$/;
    if (!phone.value.trim() || !phonePattern.test(phone.value)) {
      showError(phone);
    } else {
      clearError(phone);
    }

    if (!serviceType.value.trim()) {
      showError(serviceType);
    } else {
      clearError(serviceType);
    }

    if (!message.value.trim()) {
      showError(message);
    } else {
      clearError(message);
    }

    if (isValid) {
      alert('Form submitted successfully!');
      form.reset();
    }
  });
}