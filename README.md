# 💰 Consulta Tipo de Cambio BCCR (Costa Rica)

Esta es una aplicación web sencilla y moderna construida con **HTML5, CSS3 y JavaScript** que consulta en tiempo real el tipo de cambio (Compra y Venta) directamente desde el servicio web del **Banco Central de Costa Rica (BCCR)**.

## 🚀 Características
* **Consulta en vivo:** Obtiene los indicadores 317 (Compra) y 318 (Venta).
* **Interfaz Responsiva:** Diseño limpio que se adapta a dispositivos móviles.
* **Solución CORS integrada:** Utiliza un proxy para permitir peticiones desde el navegador sin errores de seguridad.
* **Automatización de fecha:** Siempre consulta la fecha actual del sistema.

## 🛠️ Tecnologías utilizadas
* **HTML5** - Estructura semántica.
* **CSS3** - Estilos personalizados con diseño de tarjetas.
* **JavaScript (ES6+)** - Lógica de consumo de API SOAP y manipulación del DOM.
* **AllOrigins API** - Proxy para gestionar el intercambio de recursos de origen cruzado (CORS).

## ⚙️ Configuración

Para usar este proyecto con tus propias credenciales, abre el archivo `script.js` y asegúrate de configurar las siguientes constantes:

```javascript
const BCCR_TOKEN = 'TU_TOKEN_AQUÍ';
const BCCR_EMAIL = 'tu-correo@ejemplo.com';
const BCCR_NAME = 'Tu Nombre';
