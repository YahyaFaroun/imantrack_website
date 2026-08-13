/**
 * ImanTrack Single-Page JavaScript
 * Handles Modals (Privacy & Terms) and Hash Routing
 */

document.addEventListener('DOMContentLoaded', () => {
  initModals();
});

/**
 * Handle Privacy & Terms Modal Popups and Hash Routing
 */
function initModals() {
  const privacyModal = document.getElementById('privacyModal');
  const termsModal = document.getElementById('termsModal');
  
  const openPrivacyBtns = document.querySelectorAll('.open-privacy-btn');
  const openTermsBtns = document.querySelectorAll('.open-terms-btn');
  
  const closeBtns = document.querySelectorAll('.modal-close');
  const modals = document.querySelectorAll('.modal');

  if (!privacyModal || !termsModal) return;

  // Open Privacy Modal
  const openPrivacy = () => {
    closeAllModals();
    privacyModal.classList.add('active');
    document.body.classList.add('no-scroll');
    window.location.hash = 'privacy';
  };

  // Open Terms Modal
  const openTerms = () => {
    closeAllModals();
    termsModal.classList.add('active');
    document.body.classList.add('no-scroll');
    window.location.hash = 'terms';
  };

  // Close all Modals
  const closeAllModals = () => {
    modals.forEach(modal => modal.classList.remove('active'));
    document.body.classList.remove('no-scroll');
    
    // Clear URL Hash without page jump
    if (window.location.hash) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };

  // Event Listeners for Opening
  openPrivacyBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openPrivacy();
  }));

  openTermsBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openTerms();
  }));

  // Event Listeners for Closing
  closeBtns.forEach(btn => btn.addEventListener('click', closeAllModals));

  // Close modal when clicking on background overlay
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeAllModals();
      }
    });
  });

  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Hash Routing Logic (for direct links from Apple App Store)
  const checkHash = () => {
    const hash = window.location.hash;
    if (hash === '#privacy') {
      openPrivacy();
    } else if (hash === '#terms') {
      openTerms();
    }
  };

  // Check hash on load and when it changes
  checkHash();
  window.addEventListener('hashchange', checkHash);
}
