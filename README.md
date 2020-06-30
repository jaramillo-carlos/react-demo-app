## ¿Qué es una PWA?
No hay una definición concreta sobre que es una PWA. Lo mejor es entender como es el panorama actual.

- [example](pwastats.com);
- [example](wpostats.com);

### ¿Cómo es la web hoy?
- Spoiler Alert: No funciona muy bien en mobile.
- Más del 50% de nuestros usuarios está en mobile.
- Tenemos malas conexiones en los dispositivos móviles, conexiones tipo 3G y LTE no son particularmente confiables. Esto genera que un sitio promedio tarda 14 segundos en cargar en mobile.
- La UX no es solamente el diseño de nuestra app, tiene que ver con que tan rápido funciona nuestra aplicación en el mundo real, con un teléfono que tiene una conexión mala.

Hay estudios que demuestran la importancia de lograr que tu sitio funcione rápidamente en dispositivos móviles:
- 50% de los usuarios se van de un sitio que tarda más de 3 segundos en cargar.
- Cada segundo de demora nos cuesta un 5-10% de nuestras ventas.

### Objetivos
- Performance
- Instalable en Homescreen
- Dar soporte Offline

## Similitudes y diferencias entre una PWA y una App nativa:

### Similitudes:
- Trabajar Offline
- Recibir notificaciones
- Ser instaladas en la HomeScreen

### Diferencias:

#### Las Apps Nativas
- Acceso de mejor calidad a las funcionalidades nativas de Android y iOS
- Mayor libertad para crear apps avanzadas
- Mejor performance
- Mejores funcionalidades específicas de cada plataforma

#### Las PWAs
- Mejor desempeño en SEO
- Más sencillo conseguir y convertir usuarios
- Son mejores para sitios de medios, noticias o aplicaciones virales
- Costos de producción menores
- Facilidad para conseguir usuarios

Al momento de decidir deberíamos hacernos la siguiente pregunta:

#### ¿Podemos crear una experiencia de usuario dramáticamente SUPERIOR con una app nativa?
¡Si la respuesta es SI, y dispones del personal y los recursos para hacerlo, pués adelante!
De lo contrario, la mejor decisión es: ¡Crear una PWA!

# Google Lighthouse
Antes era un plugin, ahora viene por defecto. `Click derecho -> Inspect -> Audits -> Perform an audit`.
Se encarga de simular un dispositivo, nexus5, una conexión de red de mala caldiad, 3g con 400k, y realentiza la cpu del computador.

Es una herramienta oficial de Google que viene con Chrome, con la cual podemos hacer un diagnóstico a una Web App. Estos diagnósticos se centran en Performance y Accesibilidad, pero también tiene una herramienta para diagnosticar si nuestra Web App se considera una PWA o no y que pasos debemos de tomar para que lo sea.

Lighthouse no sustituye hacer pruebas con un dispositivo móvil real, siempre realiza pruebas en un dispositivo móvil.

## Performance
El diagnostico de Performance nos muestra dos de los conceptos más importantes en performance: First meaningful Paint y First interactive.

### First meaningful Paint o primer pintado significativo
Esto señala cuanto tiempo tardo el navegador en renderizar la aplicación en segundos o fracciones, de una forma que tenga sentido. Cuanto tarda  la representación (renderización) del contenido más significativo en el sitio. Generalmente queremos que este situado entre 1 y 2 segundos.

### First interactive o primera interacción
señala el tiempo cuando ya se cargó React, inicializo la aplicación y que podamos correr comandos dentro de la aplicación.

### ¿Cómo bajamos estos tiempos?
Para bajar el Time To First Meaningful Paint podemos hacer Server Side Rendering, reducir el tamaño de nuestro HTML y CSS o simplemente teniendo servidores más rápidos.
El Time To Interactive tiene mucho que ver con el framework que estemos utilizando, usualmente queremos que tarde menos de 5 segundos.

# Add to home screen (Creando un Web Manifest)
create-react-app nos da un Web Manifest pre armado el cual debemos configurar. Todo lo que tiene que ver con nuestro Web Manifest está dentro de los archivos index.html y manifest.json de la carpeta public de nuestro proyecto.
Por el momento vamos a trabajar dentro del archivo manifest.json, en el podemos ver varios atributos, los cuales son:

- **short_name:** Es el nombre que se utiliza en la Homescreen.
- **name:** Es el nombre de nuestra aplicación.
- **icons:** Especifica un array de imágenes que servirán como iconos de la aplicación. Cambiaremos el “favicon.ico” por “icon.png”, especificamos el tamaño a 512x512 y el tipo a “image/png”.
- **start_url:** Nos indica en que página comienza nuestra aplicación, por compatibilidad siempre conviene que sea “/” en lugar de “./index.html”.
- **display:** Define el modo de visualización para la aplicación. Standalone significa que la aplicación puede correr por su misma.
- **theme_color:** Define qué color vamos a usar en la barra de tareas de Android para que combine con nuestra aplicación.
- **related_applications:** Sirve si queremos que Chrome en el Add to Homescreen recomiende una aplicación del Store.

Para probar nuestro Add to Homescreen debemos tener en cuenta que un requisito fundamental de las PWA es que todo funcione con HTTPS (Que tengamos una conexión encriptada). Por el nivel de seguridad que requerimos para algunas funcionalidades. Para desarollo podemos usar un servicio llamado **NGROK** el cual hace un tunel, y nos da un servidor https que redirige a nuestra maquina. `ngrok http $CURRENT_PORT` ej: `ngrok http 5000`

Nuestra aplicación por defecto es fullscreen, así que NO OLVIDES de brindar un camino al home.

En iOS necesitamos añadir alguna metadata al index.html de nuestro proyecto. Al momento de probar nuestra aplicación en iOS nos daremos cuenta de que el Add to Homescreen en este caso debe ser añadido manualmente por el usuario. En IOS, para testear necesitamos un iphone, una mac o el simulador de xcode.

En IOS es levemente más lento abrir una PWA, porque IOS utiliza un browser levemente diferente a safari.  Podemos setear splash screen (patron de ios) en el manifest para tener vista previa decorativas al abrir la app

También se reinicia cada que navegas entre aplicaciones (puede arreglarse extendiendo react router). En IOS No tenemos notificaciones, Los serviceworkers estan disponibles, pero sólo tenemos 50 megas de espacio. y segun la documentación se pueden borrar en cualquier momento.

Así que no es muy recomendable hacer PWA y full screen en IOS, ya que en IOS no es tan popular y debugear una aplicación con todos estos problemas es muy costoso.


Una vez cumplimos todos los requisitos, chrome nos sugiere agregaña al screen.

# ¿Qué es un Service Worker?
Son la característica más importante de una PWA. Hecha por el equipo de chrome, que ya hasta safari la incluyó.

Es lo que hace posible que las PWA funcionen, es un script que nuestro navegador corre detrás de escena y este no puede tocar el DOM.

Podemos tener control absoluto a nivel red de nuestra aplicación gracias a los service workers. Por ejemplo podemos manejar el cache, o la estrategías de red, como cachear cosas por adelantado. También nos permite hacer push notifications.

## Introducción a Workbox
Create-react-app incluye un service worker. Los service workers solo funcionan en producción.

Una recomendación siempre que trabajemos con service workers es ir a Clear Storage en la tab de Application de las DevTools, y limpiar la información del sitio. Esto desinstalara todo lo que es cache y limpiara los service workers.

El service worker de Create React App hace algo llamado “SW Precache“, lo que hace es precargar y dejar disponibles offline todos los archivos (assets) necesarios para correr la aplicación. Una recomendación a la hora de hacer debugging es refrescar el sitio pues un service worker por lo general se inicializa después de la primera carga.

NUNCA conviene escribir nuestro propio service worker especialmente con herramientas de bajo nivel. Ya que al manejar todos los request de navegación podemos crear bugs muy dificiles de arreglar, como dejar la aplicación cacheada, y más.

Para implementar nuestro propio service worker usaremos Workbox (by Google), una librería creada por Google para crear Service Workers. (Permite hasta manejar google analytics offline)

Hay un pequeño detalle al momento de implementar Workbox en nuestro proyecto y es que estamos yendo en contra de los principios de Create React App y esto solo significa una cosa “eject”, esto nos llenaría de archivos que no nos sirven. Para evitar hacer eject vamos a instalar react-app-rewired y el plugin para webpack de workbox.

## Para evitar hacer eject en el CRA
`react-app-rewired` Nos permite modificar el comportamiendo de CRA sin hacer eject. Requiere un archivo de `config.overrides.js` para modificar la configuración interna del proceso de build.

`react-app-rewire-workbox workbox-webpack-plugin`

El funcionamiento de un service worker por defecto toma una lista de assets para precargarlos y si la ruta coincide exactamente con un asset entonces lo tomara de cache.

## Implementando Workbox
Workbox tiene una característica llamada registerNavigationRoute la cual se encarga de hacer el funcionamiento por defecto de un service worker más aparte si encuentra una url que no conoce va a buscar una url, en este caso index.html y que el se encargue de lo que va a mostrar.

Existen diferentes estrategias de carga.

### Network Only.
Es la primera y fundamental, esta se encarga checar si hay conexión a internet, si existe una conexión realiza la petición de información, en caso de no haber conexión se rompe la página.

#### ¿Cuándo usar Network Only?
Por defecto si no queremos cache o manejamos información en tiempo real.

### Network First
Es otra estrategia de carga, se encarga mandar la petición a internet, si la conexión a internet esta caída entonces tomara la información que tenga almacenada en cache.

#### ¿Cuándo usar Network First?
Cuando queremos la última versión de un asset y tener soporte offline.

## Aplicando Estrategias de Carga

### Cache First.
Es una estrategia de carga que lo primero que hace es ir al cache y si encuentra el recurso lo sirve directamente. En caso de no encontrarlo va a ir a red, guardar la información en cache y servir esa versión. No volverá a salir de nuevo, guardará en caché por siempre.

Esta estrategia puede ser peligrosa y solo es recomendable cuando queremos máxima velocidad y estamos manejando un recurso que nunca cambia, como una imagen o alguna fuente.

### Stale While Revalidate
Esta es una estrategia de carga muy particular y que mejor funciona a la hora de mejorar el rendimiento. Lo que hace es ir a cache y a red al mismo tiempo, toma la versión más rápida que siempre será la de cache y en cuanto recibe la de red va a actualizar la versión de cache.

Es recomendable esta estrategia cuando queremos mucha velocidad y estamos manejando un recurso que puede estar levemente desactualizado.
Al momento de escribir nuestras estrategias en Workbox SI IMPORTA el orden en que pongamos las cosas, si queremos una estrategia o regla por defecto debemos poner esa regla hasta el final de todo.

## Google Analytics Offline
Como primer paso debemos incorporar `react-ga`, un plugin que nos permite correr Google Analytics dentro de React.

Para unir nuestro plugin a la historia de React Router la mejor opción es incorporarlo dentro de la historia de la aplicación cambiando el BrowserRouter por un Router común, creamos un nuevo history para poder extender los métodos del Router, y que cada vez que el usuario cambie de pagina haga tracking de una page view.

Si tienes algún AdBlocker desactívalo cuando estés desarrollando tu sitio para que evitar que bloqueé Google Analytics.

Workbox ya cuenta con un método para facilitar que Google Analytics funcione de forma offline, va a capturar todas las peticiones que hagamos a GA, las va a guardar en memoria y cuando el usuario retome la conexión a internet se enviaran las peticiones.

## Web Share API
Web Share API es una API reciente de Android que nos permite usar el Share nativo del sistema operativo.

Para implementarlo hay que tener presente que solo funcionara si hacemos click a algún link, esto es una medida de precaución para que nadie abuse de la API obligándonos a tener que compartir algo que no queremos. Además, Tenemos que detectar si tenemos la característica para poder usarla.

Web Share API solamente funciona con HTTPS.

```javascript
link.on('click', function(e) {
  e.prevent.default();
  if(!navigator.share) return;
  navigator.share({
    title, text, url
  })
})
```

## Trabajando Offline
La forma de saber si la aplicación esta offline u online es a través de una variable llamada Navigator.onLine, algo muy importante a tener en cuenta es que la variable nos va a decir que estamos online siempre y cuando no estemos offline lo cual significa que si el usuario tiene mala conexión a internet igual va a marcar como online.

La forma correcta de checar si el navegador esta online u offline es con dos eventos que se añaden a window, “offline” y “online”.

```javascript
if (navigator.onLine) {
  // estamos online
} else {
  // estamos offline
}

// JAMAS ESTO:
setInterval(function(e) {
  if (navigator.onLine) {
    // estamos online
  }
}, 10)

// Siempre eventos
window.addEventListener('online',
  function(e) {
    // estamos online
  }
)
window.addEventListener('offline',
  function(e) {
    // estamos offline
  }
)
```

## Notificaciones
Hay que tener en cuenta que, si el usuario apenas entra a nuestro sitio y le aparece un mensaje para permitir las notificaciones esto está afectando la UX, por lo cual debemos darle un contexto de porque le vamos a enviar notificaciones a nuestro usuario.

### Existen tres tipos de permiso para las notificaciones:
- Estado por defecto: no sabemos si podemos enviar notificaciones o no, aquí es donde debemos preguntarle al usuario si quiere recibir las notificaciones.
- Granted: el usuario ha concedido el permiso.
- Denied: directamente no podemos enviar las notificaciones.

Primero que nada, debemos preguntar si nuestro navegador puede mandar notificaciones. Para ello vamos a checar si hay un objeto Notification en window y un Service Worker en el navegador, esto es así debido a que en Android necesitamos un Service Worker para que las notificaciones funcionen. En iOS no hay soporte para notificaciones.

```javascript
// pedir permisos
await Notification.requestPermission();

if(Notification.permission === 'granted') {
  // podemos enviar notificaciones
}
```

----------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
