let idProfesor = null;
let idAlumno = null;

// Obtener los datos del alumno desde el almacenamiento de sesión
document.addEventListener('DOMContentLoaded', async () => {
  const alumno = JSON.parse(sessionStorage.getItem('alumno'));
  if (!alumno) {
    alert("No se ha encontrado la sesión del alumno.");
    window.location.href = "login.html"; // Redirigir si no se encuentra la sesión
    return;
  }

  idAlumno = alumno.id;

  try {
    const response = await fetch(`http://localhost:3000/profesor-por-alumno/${idAlumno}`);
    const data = await response.json();
    idProfesor = data.id_profesor;
    loadMessages();
  } catch (error) {
    console.error("Error al obtener profesor:", error);
  }
});

// Cargar todos los mensajes previos entre el alumno y el profesor
async function loadMessages() {
  try {
    const response = await fetch(`http://localhost:3000/chat?id_profesor=${idProfesor}&id_alumno=${idAlumno}`);
    const messages = await response.json();

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = ''; // Limpiar los mensajes anteriores

    messages.forEach(msg => {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add('chat-message');
      messageDiv.classList.add(msg.emisor);
      messageDiv.textContent = msg.mensaje;
      chatBox.appendChild(messageDiv);
    });
  } catch (error) {
    console.error("Error al cargar mensajes:", error);
  }
}

// Enviar nuevo mensaje
document.getElementById('send-message-btn').addEventListener('click', async () => {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  if (!message) return;

  try {
    const formData = new FormData();
    formData.append('id_profesor', idProfesor);
    formData.append('id_alumno', idAlumno);
    formData.append('emisor', 'alumno');
    formData.append('mensaje', message);

    const response = await fetch('http://localhost:3000/enviar-mensaje', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      messageInput.value = '';
      loadMessages(); // Recargar los mensajes
    } else {
      alert("Error al enviar el mensaje.");
    }
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
  }
});
