function placeOrder(productName) {
    const phoneNumber = "26663031771"; 
    const message = `I want to order: ${productName}.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  }

  // Smooth scroll to collections when clicking the indicator
document.querySelector('.scroll-indicator').addEventListener('click', () => {
  document.querySelector('.collections-section').scrollIntoView({ 
    behavior: 'smooth' 
  });
});

// Optional: Hide header on scroll down, show on scroll up
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll) {
    // Scrolling down
    document.querySelector('.hero h1').style.opacity = 1 - currentScroll / 300;
  } else {
    // Scrolling up
    document.querySelector('.hero h1').style.opacity = 1;
  }
  lastScroll = currentScroll;
});