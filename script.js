// script.js
async function getQuote() {
    const keyword = document.getElementById('keyword').value.trim();
  
    if (keyword === '') {
      alert('Please enter a keyword to get a quote.');
      return;
    }
  
    try {
      const response = await fetch('https://quote-gen-backend.onrender.com/generate-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });
  
      const data = await response.json();
  
      if (data.quote) {
        document.getElementById('quote').textContent = data.quote;
      } else {
        document.getElementById('quote').textContent = 'No quote found for the given keyword.';
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      document.getElementById('quote').textContent = 'Error fetching quote. Please try again later.';
    }
  }
  