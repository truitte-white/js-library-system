document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('edit-status-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);
    const data = {
      BookStatus: formData.get('BookStatus')
    };

    fetch(`/rfs-library/books/${formData.get('BookId')}/edit-status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message || 'Status updated successfully');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
});
