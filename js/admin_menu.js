// Get references to the radio buttons and the extraForm div
const yesRadio = document.getElementById('Promotion');
const noRadio = document.getElementById('noPromotion');
const extraForm = document.getElementById('extraForm');

// Add event listeners to the radio buttons
yesRadio.addEventListener('change', toggleExtraForm);
noRadio.addEventListener('change', toggleExtraForm);

// Function to toggle the visibility of the extraForm div
function toggleExtraForm() {
  if (yesRadio.checked) {
    extraForm.style.display = 'block';
  } else {
    extraForm.style.display = 'none';
  }
}