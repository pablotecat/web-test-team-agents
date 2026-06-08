// Load users on page load
document.addEventListener('DOMContentLoaded', () => {
  loadUsers();
  setupEditModal();
});

// Setup edit modal
function setupEditModal() {
  const modal = document.getElementById('editModal');
  const closeBtn = document.querySelector('.close-modal');
  const cancelBtn = document.getElementById('cancelEditBtn');
  const editForm = document.getElementById('editForm');

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  editForm.addEventListener('submit', handleEditSubmit);
}

// Load users from API
async function loadUsers() {
  try {
    const response = await fetch('/api/users');
    const users = await response.json();
    
    const tbody = document.getElementById('usersBody');
    const noUsers = document.getElementById('noUsers');
    
    if (users.length === 0) {
      noUsers.style.display = 'block';
      document.getElementById('usersTable').style.display = 'none';
    } else {
      noUsers.style.display = 'none';
      document.getElementById('usersTable').style.display = 'block';
      tbody.innerHTML = users.map(user => `
        <tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>${user.registeredAt}</td>
          <td class="actions">
            <button class="btn-action btn-edit" data-id="${user.id}">Editar</button>
            <button class="btn-action btn-delete" data-id="${user.id}">Eliminar</button>
          </td>
        </tr>
      `).join('');

      // Add event listeners to action buttons
      document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => openEditModal(btn.dataset.id));
      });

      document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => handleDelete(btn.dataset.id));
      });
    }
  } catch (error) {
    console.error('Error loading users:', error);
  }
}

// Open edit modal with user data
async function openEditModal(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const user = await response.json();

    if (response.ok) {
      document.getElementById('editUserId').value = user.id;
      document.getElementById('editName').value = user.name;
      document.getElementById('editEmail').value = user.email;
      document.getElementById('editPhone').value = user.phone;

      document.getElementById('editModal').style.display = 'block';
    } else {
      alert('Error loading user data');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error loading user data');
  }
}

// Handle edit form submission
async function handleEditSubmit(e) {
  e.preventDefault();
  
  const userId = document.getElementById('editUserId').value;
  const name = document.getElementById('editName').value;
  const email = document.getElementById('editEmail').value;
  const phone = document.getElementById('editPhone').value;

  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, phone })
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById('editModal').style.display = 'none';
      loadUsers();
      alert('Usuario actualizado exitosamente');
    } else {
      alert(data.error || 'Error al actualizar el usuario');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al actualizar el usuario');
  }
}

// Handle user deletion
async function handleDelete(userId) {
  if (!confirm('¿Está seguro de que desea eliminar este usuario?')) {
    return;
  }

  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    if (response.ok) {
      loadUsers();
      alert('Usuario eliminado exitosamente');
    } else {
      alert(data.error || 'Error al eliminar el usuario');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al eliminar el usuario');
  }
}
