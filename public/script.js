// Handle registration form submission
const form = document.getElementById('registrationForm');
if (form) {
  form.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, phone })
    });
    
    const data = await response.json();
    const messageDiv = document.getElementById('message');
    
    if (response.ok) {
      messageDiv.className = 'message success';
      messageDiv.textContent = 'Registro exitoso. ¡Gracias!';
      form.reset();
      setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
      }, 3000);
    } else {
      messageDiv.className = 'message error';
      messageDiv.textContent = data.error || 'Error al registrarse';
    }
  } catch (error) {
    console.error('Error:', error);
    const messageDiv = document.getElementById('message');
    messageDiv.className = 'message error';
    messageDiv.textContent = 'Error al registrarse';
  }
}
