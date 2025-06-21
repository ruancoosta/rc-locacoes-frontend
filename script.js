
// script.js

// Function to show the registration form
function showForm() {
  document.getElementById("form-cadastro").style.display = "block"; // Show the form
}

// Function to hide the registration form
function hideForm() {
  document.getElementById("form-cadastro").style.display = "none"; // Hide the form
}

// Function to handle form submission and save data to DB (simulated here)
document.getElementById("formCadastro").addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent default form submission

  // Collect form data
  const nome = document.getElementById("nome").value;
  const moto = document.getElementById("moto").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const status = document.getElementById("status").value;

  // Prepare data to send to the backend
  const locatarioData = {
    nome: nome,
    moto: moto,
    whatsapp: whatsapp,
    status: status
  };

  // Sending data to the backend (simulated as if we were saving to DB)
  fetch('https://rc-locacoes-backend.onrender.com/cadastrar-locatario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(locatarioData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert("Locatário cadastrado com sucesso!");
      hideForm(); // Hide the form after successful submission
      // Optionally, refresh the locatario list
      loadLocatarios();
    } else {
      alert("Erro ao cadastrar locatário.");
    }
  })
  .catch(error => {
    console.error('Erro:', error);
    alert("Erro ao salvar dados.");
  });
});

// Function to load the list of locatários from the backend
function loadLocatarios() {
  fetch('https://rc-locacoes-backend.onrender.com/locatarios')
    .then(res => res.json())
    .then(data => {
      const locatariosList = document.getElementById("locatarios-list");
      locatariosList.innerHTML = ''; // Clear the list before adding new items
      data.locatarios.forEach(locatario => {
        const li = document.createElement("li");
        li.innerHTML = `
          <p><strong>Nome:</strong> ${locatario.nome}</p>
          <p><strong>Moto:</strong> ${locatario.moto}</p>
          <p><strong>WhatsApp:</strong> ${locatario.whatsapp}</p>
          <p><strong>Status:</strong> <span class="status ${locatario.status}">${locatario.status}</span></p>
        `;
        locatariosList.appendChild(li);
      });
    })
    .catch(error => console.error('Erro ao carregar locatários:', error));
}

// Load the list of locatários when the page is loaded
window.onload = function() {
  loadLocatarios();
};
