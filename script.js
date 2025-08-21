// =====================
// Dynamic Affiliate Tracking (Single-Link Solution)
// =====================
(function() {
  // 1. Get 'ref' ID from URL (e.g., ?ref=jane)
  const urlParams = new URLSearchParams(window.location.search);
  const affiliateId = urlParams.get('ref');

  // 2. Save to browser storage if 'ref' exists
  if (affiliateId) {
    localStorage.setItem('affiliateRef', affiliateId);
    
    // 3. Auto-add ?ref=ID to all internal links (for navigation)
    document.querySelectorAll('a[href*="yourwebsite.com"], a[href^="/"], a[href^="./"]').forEach(link => {
      if (link.href.includes('#')) return; // Skip anchor links
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
    
    // Keep navbar visible when mobile menu is open
    if (navbarMenu.classList.contains('active')) {
      document.querySelector('.navbar').classList.remove('hidden');
    }
  });

  // Close mobile menu when clicking on links
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
const navbarHeight = navbar.offsetHeight;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Show navbar at top of page
  if (currentScroll <= 0) {
    navbar.classList.remove('hidden');
    return;
  }

  // Hide navbar on scroll down, show on scroll up
  if (currentScroll > lastScroll && !navbar.classList.contains('hidden')) {
    // Only hide if scrolled more than 100px to prevent immediate hiding
    if (currentScroll > 100) {
      navbar.classList.add('hidden');
    }
  } else if (currentScroll < lastScroll && navbar.classList.contains('hidden')) {
    navbar.classList.remove('hidden');
  }

  lastScroll = currentScroll;
});

// =====================
// Smooth Scrolling
// =====================
// For scroll indicator arrow
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

// Smooth scroll for all anchor links
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
  // Skip if it's an anchor tag (like the size guide link)
  if (button.tagName === 'BUTTON') {
    button.addEventListener('click', () => {
      // Close all other answers first
      document.querySelectorAll('.faq-answer').forEach(answer => {
        if (answer !== button.nextElementSibling) {
          answer.classList.remove('open');
          // Also remove 'active' class from questions
          answer.previousElementSibling.classList.remove('active');
        }
      });

      // Toggle the clicked answer
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
  // 1. Get 'ref' ID from URL (e.g., ?ref=ambjohn)
  const urlParams = new URLSearchParams(window.location.search);
  const affiliateId = urlParams.get('ref');

  // 2. Save to browser storage if 'ref' exists
  if (affiliateId) {
    localStorage.setItem('affiliateRef', affiliateId);
    console.log("Affiliate set:", affiliateId);
    
    // Show a subtle notification
    showAffiliateNotification(affiliateId);
  }
})();

// Show a subtle notification that you're browsing via affiliate
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
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.5s';
    setTimeout(() => notification.remove(), 500);
  }, 5000);
}

// =====================
// Product Order Function
// =====================
function placeOrder(productName) {
  // Default WhatsApp number (yours)
  let phoneNumber = "26663031771";
  
  // Get affiliate ID from URL or localStorage
  const urlParams = new URLSearchParams(window.location.search);
  let affiliateId = urlParams.get('ref') || localStorage.getItem('affiliateRef');
  
  console.log("Affiliate ID found:", affiliateId);
  
  // If affiliate ID exists, use their WhatsApp number
  if (affiliateId) {
    // SIMPLIFIED: Direct mapping of affiliate IDs to numbers
    const affiliateNumbers = {
      'ambjohn': '26658849859',
      'styylo4mode': '26663568230',
      // Add new affiliates here: 'username': 'whatsapp-number'
    };
    
    // If affiliate exists in your list, use their number
    if (affiliateNumbers[affiliateId]) {
      phoneNumber = affiliateNumbers[affiliateId];
      console.log("Using affiliate number:", phoneNumber);
    } else {
      console.log("Affiliate ID not found, using default number");
    }
  } else {
    console.log("No affiliate ID found, using default number");
  }
  
  // Create WhatsApp message
  const message = `I want to order: ${productName}`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  // Open WhatsApp
  window.open(whatsappUrl, "_blank");
}

// =====================
// The rest of your existing script.js code follows below...
// (mobile menu, navbar scroll, smooth scrolling, FAQ functionality)
// =====================
// Initialize any product order buttons
document.querySelectorAll('.order-button').forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.dataset.productName || 'a product';
    placeOrder(productName);
  });
});



