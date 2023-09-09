document.getElementById('reviewForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const bookName = document.getElementById('bookName').value;
  const reviewerName = document.getElementById('reviewerName').value;
  const rating = document.getElementById('rating').value;

  const response = await fetch('/addReview', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bookName, reviewerName, rating })
  });

  const result = await response.json();
  if (result.success) {
      alert('Review added successfully!');
  } else {
      alert('Error adding review.');
  }
});
