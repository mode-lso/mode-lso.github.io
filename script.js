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
// Product Order Function (with product link)
// =====================
function placeOrder(productName, productId) {
  // Default WhatsApp number (yours)
  let phoneNumber = "26663031771";

  // Get affiliate ID from URL or localStorage
  const urlParams = new URLSearchParams(window.location.search);
  let affiliateId = urlParams.get('ref') || localStorage.getItem('affiliateRef');

  // Use affiliate number if found
  const affiliateNumbers = {
    'ambjohn': '26658849859',
    'styylo4mode': '26663568230',
    // Add more affiliates here
  };
  if (affiliateId && affiliateNumbers[affiliateId]) {
    phoneNumber = affiliateNumbers[affiliateId];
  }

  // Build product link (direct link with anchor to product)
  const baseUrl = window.location.href.split('#')[0];
  const productLink = `${baseUrl}#${productId}`;

  // Final WhatsApp message
  const message = `I want to order: ${productName}\n\nView product here: ${productLink}`;

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




// =====================
// Product Highlight Effect (MORE ROBUST VERSION)
// =====================
function highlightOrderedProduct() {
  // Check if URL has a product ID hash (e.g., #af1-green-black-gold)
  const productId = window.location.hash.substring(1);
  
  if (!productId) return; // Exit if no product ID in URL
  
  console.log("Trying to highlight product with ID:", productId);
  
  function tryToHighlight() {
    const productElement = document.getElementById(productId);
    
    if (productElement) {
      console.log("Product found, highlighting:", productId);
      
      // Scroll to the product
      setTimeout(() => {
        productElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }, 300);
      
      // Add highlight effect with animation
      productElement.classList.add('highlight-product');
      
      // Remove highlight after 5 seconds
      setTimeout(() => {
        productElement.classList.remove('highlight-product');
      }, 5000);
      
      return true;
    }
    
    return false;
  }
  
  // Try to highlight immediately
  if (!tryToHighlight()) {
    // If not found, try again after a short delay (DOM might still be loading)
    const checkInterval = setInterval(() => {
      if (tryToHighlight()) {
        clearInterval(checkInterval);
      }
    }, 100);
    
    // Stop trying after 3 seconds
    setTimeout(() => {
      clearInterval(checkInterval);
      console.log("Could not find product with ID:", productId);
    }, 3000);
  }
}

// Run the highlight function when page loads
if (document.readyState === 'loading') {
  // Loading hasn't finished yet
  document.addEventListener('DOMContentLoaded', highlightOrderedProduct);
} else {
  // `DOMContentLoaded` has already fired
  setTimeout(highlightOrderedProduct, 100);
}

// Also run when hash changes (if user manually edits URL)
window.addEventListener('hashchange', highlightOrderedProduct);