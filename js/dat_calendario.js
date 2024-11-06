let btn_cctv = document.getElementById("btn_calendario").addEventListener('click', function() {
    fetch("./calendario.html") // Reemplaza con la ruta a tu archivo HTML
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('datos').innerHTML = html
        })
        .catch(error => {
            console.error('Hubo un problema con la operación fetch:', error);
        });
});