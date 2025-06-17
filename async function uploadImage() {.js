async function uploadImage() {
  const input = document.getElementById('fileInput');
  const status = document.getElementById('status');

  if (input.files.length === 0) {
    status.textContent = "Por favor seleccioná una foto primero.";
    return;
  }

  const file = input.files[0];
  const formData = new FormData();
  formData.append('files', file);

  status.textContent = "Subiendo foto...";

  try {
    const response = await fetch('https://uploadthing.com/api/files', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer UPLOADTHING_TOKEN='eyJhcGlLZXkiOiJza19saXZlX2NiMjhmMGMxYjk2NDU1NzRjNDhmMGUxZjIzNjUwZDk2YzMzNzRmNjkwMTM0NzA5NTRkODQ1OWRkZDZiZTVmMGIiLCJhcHBJZCI6ImN0enQ1NTkybTkiLCJyZWdpb25zIjpbInNlYTEiXX0=',
      },
      body: formData,
    });

    const result = await response.json();
    console.log(result);
    if (result[0]?.url) {
      status.innerHTML = `✅ ¡Foto subida con éxito!<br><a href="${result[0].url}" target="_blank">Ver imagen</a>`;
    } else {
      status.textContent = "Hubo un error al subir la imagen.";
    }
  } catch (err) {
    console.error(err);
    status.textContent = "Error inesperado.";
  }
}
