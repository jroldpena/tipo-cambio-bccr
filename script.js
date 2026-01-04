async function consultarTipoCambio() {
    // Configuración con tus credenciales
    const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJCQ0NSLVNEREUiLCJzdWIiOiJKLXJvbGRAaG90bWFpbC5jb20iLCJhdWQiOiJTRERFLVNpdGlvRXh0ZXJubyIsImV4cCI6MjUzNDAyMzAwODAwLCJuYmYiOjE3NjUxNzE0NjksImlhdCI6MTc2NTE3MTQ2OSwianRpIjoiNTlkMGIyNjUtN2QxYi00NDVkLWEyNTQtYjE0YTFhZWUxNjU3IiwiZW1haWwiOiJKLXJvbGRAaG90bWFpbC5jb20ifQ.WD-2f97SIu-N8GhnAz5tBio8jVuH3NyrJp_70L58eas';
    const BCCR_EMAIL = 'j-rold@hotmail.com'; // Corregido el formato del correo
    const NOMBRE = 'Usuario'; // Puedes cambiarlo por tu nombre registrado
    
    // Obtener fecha actual en formato DD/MM/YYYY
    const ahora = new Date();
    const dia = String(ahora.getDate()).padStart(2, '0');
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const año = ahora.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${año}`;

    // Indicadores: 317 (Compra), 318 (Venta)
    const indicadores = { compra: 317, venta: 318 };

    async function obtenerValor(indicador) {
        // El BCCR requiere estos parámetros exactos en el QueryString
        const url = `https://indicadoreseconomicos.bccr.fi.cr/IndicadoresEconomicos/WebServices/wsIndicadoresEconomicos.asmx/ObtenerIndicadoresEconomicos?Indicador=${indicador}&FechaInicio=${fechaFormateada}&FechaFinal=${fechaFormateada}&Nombre=${encodeURIComponent(NOMBRE)}&SubNiveles=N&CorreoElectronico=${encodeURIComponent(BCCR_EMAIL)}&Token=${TOKEN}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error en la red');
            
            const text = await response.text();
            const parser = new DOMParser();
            
            // 1. Parsear el XML externo
            const xmlDoc = parser.parseFromString(text, "text/xml");
            const innerXmlString = xmlDoc.getElementsByTagName("string")[0].textContent;
            
            // 2. Parsear el XML interno (donde están los datos reales)
            const innerDoc = parser.parseFromString(innerXmlString, "text/xml");
            const valor = innerDoc.getElementsByTagName("NUM_VALOR")[0].textContent;
            
            return parseFloat(valor).toFixed(2);
        } catch (error) {
            console.error(`Error con indicador ${indicador}:`, error);
            return null;
        }
    }

    // Actualizar Interfaz
    document.getElementById('loading').style.display = 'block';
    
    const compra = await obtenerValor(indicadores.compra);
    const venta = await obtenerValor(indicadores.venta);

    if (compra && venta) {
        document.getElementById('compra').innerText = `₡${compra}`;
        document.getElementById('venta').innerText = `₡${venta}`;
        document.getElementById('fecha').innerText = fechaFormateada;
        document.getElementById('results').classList.remove('hidden');
    } else {
        alert("Hubo un error al consultar los datos. Revisa la consola (F12).");
    }
    
    document.getElementById('loading').style.display = 'none';
}

// Ejecutar al cargar la página
window.onload = consultarTipoCambio;