// =====================
// Dynamic Affiliate Tracking (Single-Link Solution)
// =====================
(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const affiliateId = urlParams.get('ref');

  if (affiliateId) {
    localStorage.setItem('affiliateRef', affiliateId);

    document.querySelectorAll('a[href*="yourwebsite.com"], a[href^="/"], a[href^="./"]').forEach(link => {
      if (link.href.includes('#')) return; 
      const url = new URL(link.href, window.location.origin);
      if (!url.searchParams.has('ref')) {
        url.searchParams.set('ref', affiliateId);
        link.href = url.toString();
      }
    });
  }
})();

// =====================
// Mobile Menu Toggle
// =====================
const mobileMenu = document.getElementById('mobile-menu');
const navbarMenu = document.querySelector('.navbar-menu');

if (mobileMenu && navbarMenu) {
  mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    
    if (navbarMenu.classList.contains('active')) {
      document.querySelector('.navbar').classList.remove('hidden');
    }
  });

  document.querySelectorAll('.navbar-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      navbarMenu.classList.remove('active');
    });
  });
}

// =====================
// Navbar Scroll Behavior
// =====================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
if (navbar) {
  const navbarHeight = navbar.offsetHeight;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      navbar.classList.remove('hidden');
      return;
    }
    if (currentScroll > lastScroll && !navbar.classList.contains('hidden')) {
      if (currentScroll > 100) {
        navbar.classList.add('hidden');
      }
    } else if (currentScroll < lastScroll && navbar.classList.contains('hidden')) {
      navbar.classList.remove('hidden');
    }
    lastScroll = currentScroll;
  });
}

// =====================
// Smooth Scrolling
// =====================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    const collectionsSection = document.querySelector('.collections-section');
    if (collectionsSection) {
      collectionsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// =====================
// FAQ Functionality
// =====================
document.querySelectorAll('.faq-question').forEach(button => {
  if (button.tagName === 'BUTTON') {
    button.addEventListener('click', () => {
      document.querySelectorAll('.faq-answer').forEach(answer => {
        if (answer !== button.nextElementSibling) {
          answer.classList.remove('open');
          answer.previousElementSibling.classList.remove('active');
        }
      });
      const answer = button.nextElementSibling;
      answer.classList.toggle('open');
      button.classList.toggle('active');
    });
  }
});

// =====================
// SIMPLE Affiliate Tracking
// =====================
(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const affiliateId = urlParams.get('ref');

  if (affiliateId) {
    localStorage.setItem('affiliateRef', affiliateId);
    console.log("Affiliate set:", affiliateId);
    showAffiliateNotification(affiliateId);
  }
})();

function showAffiliateNotification(affiliateId) {
  const notification = document.createElement('div');
  notification.innerHTML = `Referred by: ${affiliateId}`;
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.backgroundColor = '#1A6FDF';
  notification.style.color = 'white';
  notification.style.padding = '8px 12px';
  notification.style.borderRadius = '4px';
  notification.style.fontSize = '14px';
  notification.style.zIndex = '1000';
  notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  notification.id = 'affiliate-notification';
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.5s';
    setTimeout(() => notification.remove(), 500);
  }, 5000);
}

// =====================
// Product Order Function (with product link)
// =====================
function placeOrder(productName, productId) {
  let phoneNumber = "26663031771";

  const urlParams = new URLSearchParams(window.location.search);
  let affiliateId = urlParams.get('ref') || localStorage.getItem('affiliateRef');

  const affiliateNumbers = {
    'ambjohn': '26658849859',
    'styylo4mode': '26663568230',
  };
  if (affiliateId && affiliateNumbers[affiliateId]) {
    phoneNumber = affiliateNumbers[affiliateId];
  }

  const baseUrl = window.location.href.split('#')[0];
  const productLink = `${baseUrl}#${productId}`;

  const message = `I want to order: ${productName}\n\nView product here: ${productLink}`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
}

// =====================
// IMPROVED Product Highlight Effect
// =====================
function highlightProduct() {
  if (!document.body.classList.contains('product-page')) return;

  const hash = window.location.hash;
  if (!hash) return;
  
  const productId = hash.substring(1);

  // Remove any previous highlights
  document.querySelectorAll('.highlight-product').forEach(el => {
    el.classList.remove('highlight-product');
  });

  setTimeout(function() {
    const productElement = document.getElementById(productId);
    if (productElement) {
      console.log('Product found! Highlighting:', productId);

      productElement.scrollIntoView({behavior: 'smooth', block: 'center'});
      productElement.classList.add('highlight-product');
    }
  }, 300);
}

// Run on full page load
window.addEventListener('load', function() {
  highlightProduct();
});

// Also run when hash changes
window.addEventListener('hashchange', highlightProduct);

// Clear highlights when navigating away
window.addEventListener('beforeunload', function() {
  document.querySelectorAll('.highlight-product').forEach(el => {
    el.classList.remove('highlight-product');
  });
});
