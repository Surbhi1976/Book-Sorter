document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('signup-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();
      alert(data.message);

      if (response.ok) {
        localStorage.setItem('username', name);
        localStorage.setItem('userEmail', email);
        window.location.href = 'http://127.0.0.1:5500/booklyn.html';
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  });
});
