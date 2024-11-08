let btn_cctv = document.getElementById("btn_calendario").addEventListener('click', function() {
    fetch("./calendario.html") // Reemplaza con la ruta a tu archivo HTML
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red' + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('dato_calendario').innerHTML = html;

            // Ahora, carga el archivo JS relacionado
            const script = document.createElement('script');
            script.src = './js/calendario.js';  // Reemplaza con la ruta de tu archivo JS
            script.type = 'text/javascript';

            script.onload = function() {
                generateCalendar();
            };

            document.body.appendChild(script);
        })
        .catch(error => {
            console.error('Hubo un problema con la operación fetch:', error);
        });
});