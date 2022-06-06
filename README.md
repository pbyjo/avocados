# NEXTJS Avocados

#### Instalación de next js

Podemos iniciar un proyecto manual instalando las siguientes dependencias
`npm install react react-dom next`

### Routing

#### Rutas básicas

Las rutas estaticas en nextjs funcionan mendiante archivos dentro de la carpeta pages.

Existen dos tipos de rutas:
- Rutas Estáticas
    - /about/

- Rutas dinámicas:
    - /user/pbyjo
    -/user/joel

Las rutas dinámicas pueden cambiar segun variables.

#### Rutas dinámicas

En el mismo namefile del archivo alojado en pages podemos pasarle una variable que nos servira como ruta dentro de la url del proyecto.

Existe un hook llamado `useRouter` que nos permite usar el router que tiene next para engachar las paginaciones que tenga nextjs.

podemos desestructurar la propiedad necesaria 

``` js 
import {useRouter} from 'next/router'

const router = useRouter() || const {query: {id} } = useRouter()
```

`query.id` es la forma como nextjs trabaja con las rutas/,

los directorios en url son mejor conocidos como query.

**Como hacer rutas dinámicas mas complejas?**

Podemos crear directorios en profundidad, las carpetas tambien pueden recibir un nombre dinamico [], y asi mismo dentro de estas crear un index que nos permita visualizar en ese nivel una página.

#### UnderTheHood setup y páginas: optimizaciones ocultas

chunk.- pedazo de código
CSR.- Client Side Rendering
SSR.- Server Side Rendering

Al momento de compilar separa el código con la técnica code splitting. Ademas de aplicar hashes a los assets. Ademas que para cada pagina generara un chunk especifico y mantendrá el código que se usara durante toda la aplicación

Podemos ver que las paginas generadas son SSR dándonos más SEO que con CSR

RESUMEN: Next.js aplica al bundle final diferentes optimizaciones como ser vendor files que hacen que no nos preocupemos de la configuración del proyecto. Ademas que nos da un mejor SEO por el server side rendering.

#### UnderTheHood páginas: pre rendering de páginas

 SSR cada vez que llegue una nueva consulta Next va a ejecutar el codigo y va a devolver la vista renderizada en html, en cambio en Static rendering Next solo va a ejecutar el codigo UNA sola vez (eso sucede en el momento en que hacemos deploy) y a partir de aqui cada vez que llegue una consulta nueva siempre va a devolver la misma vista html que renderizo la primera vez, esto es mucho mas eficiente ya que el codigo solo se renderiza en el servidor una sola vez y al generar los archivos estaticos estos pueden ser alojados y distribuidos en un CDN lo que los hacen increiblemente rapidos

#### Enlazando páginas

ext.JS reuiere que dentro del componente de Link se encuentre una etiqueta <a></a>, de forma que sea amigable para el SEO. Si no la agregas, de igual forma funciona, pero verás un warning de parte de Next.JS

#### UnderTheHood enlazando páginas: prefetching automático

Next.js ha actualizado esta parte del prefetching de paginas desde su version 10.0.3 , ahora su comportamiento por default es hacer es realizar el prefetching de cada uno de los componentes `Link` que se encuentre en la pagina actual al momento que esta se renderiza , No cuando se le hace hover. Esta parte ya ha sido incluida en su Documentacion

Si queremos deshabilitar este comportaminento por default y solo hacer el prefetching cuando sea un hover o en el evento `onMouseEnter`

simplemente debemos setear su configuracion en `false`

``` js
<Link href="/about"  prefetch={ false } > 
    <a> About </a>
</Link>
```

De esta forma ya podemos obtener el mismo comportamiento de la clase , el profesor le funciona ya que en este curso al parecer la ultima version en su momento era la 9

### API y debugging

Para la creacicón de la api, necesitamos simular en este caso la db y sus métodos.

necesitamos 3 archivos: la data que seria nuestro obj con los productos. la db que llama la data y crea metodos como getAll y getById, un delay emulando la promesa. Y por ultimo la api que transforma esa llamada a la db en un json para consumo como endpoint.

En este caso realizamos el procedimiento con javascript vanilla, sin embargo next nos ofrece par de metodos para crear un response y el request dentro de la api.

``` ts
import {NextApiRequest, NextApiResponse} from 'next'
import Database from '@database'

const avos = async (req: NextApiRequest, res: NextApiResponse) {
    const db = new Database()
    const data = await db.getAll()
    const length = data.length

    res.status = 200
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({data, length}))
} 

export default avos;
```

#### Creando y consumiendo nuestra propia API

Para consumir los item de nuestra db por id creamos una ruta dinámica. La fn dentro de esta ruta es parecida a la de nuestro endpoint de todos los datos por medio del método `getAll()`; en vez de ella llamamos el item mediante `getById` lo sincronizamos con nuestro `query.id` pasandolo como parámetro a la fn:

``` js
import { NextApiRequest, NextApiResponse } from "next";
import Database from "../../../database/db"

const avos = async (NextApiRequest, NextApiResponse) => {
    const db = Database
    const id = NextApiRequest.query.id
    const item = await db.getById(id);

    NextApiResponse.setHeader('Content-Type', 'application/json');
    NextApiResponse.status(200).json(item);
};

export default avos;
```

para hacer debugging podemos utilizar el siguiente script:
`dev:bug": "NODE_OPTIONS='--inspect'next dev`

En el navegador podemos escribir:
`about:inspect`

Recordemos que nextJS es una aplicación de nodeJS por lo que acceder al debug en el navegador es de igual forma.

Finalmente una vez tengamos nuestra api lista vamos a Home y nos traemos la data al componente mediante una promesa en el hook useEffect para luego pasarselo al estado local y poder imprimirlo mediante una iteración.

``` js
useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
        const result = await fetch(url)
        const data = await result.json()
        const avoList = data.data
        console.log(avoList)
        setLoading(false)
        return setProductList(avoList)
    }
    
    fetchData()
}, [])
```

#### Extendiendo el Document

Podemos extender las etiquetas del document en un archivo especial: 
`_document.js || _document.tsx`

Importante este archivo debe ir en pages.

Aqui podemos crear una config macro para nuestras etiquetas html que configura y abarcan toda la web, incluyendo el <Head />

**Nota:**
> - Ya que el Document se renderiza en servidor, los eventos como onClick no funcionarán.

> - Los componentes de React fuera de <Main /> no serán inicializados por el navegador. No añadir lógica de la aplicación aquí o CSS personalizado (como styled-jsx). Si necesita componentes compartidos en todas sus páginas (como un menú o una barra de herramientas).

> - getInitialPropsfunción de Document no se llama durante las transiciones del lado del cliente, ni cuando una página está optimizada estáticamente.

#### Extendiendo el App

Al igual que _document podemos crear _app donde podemos enlazar un provider de context o redux, podemos agregar props adicionales, themes o incluso un Layout.

Podemos inyectar anabólicos (providers, themes, props, o cualquier cosa que necesitemos) a toda nuestra aplicación.

#### path @alias

para crear alias a nuestras rutas, no es mas que crear un archivo en la raiz llamado `jsconfig.json` y en un obj agregar las diferentes rutas a configurar.

#### Explora las soluciones de CSS en NextJS y su flexibilidadExplora las soluciones de CSS en NextJS y su flexibilidad

Next nos ofrece diferentes soluciones:

    - Global css (.css)
    - Module css (.module.css)
    - css in JS (styled JSX como nodo) 

Para *sass*

`npm i sass --save-dev`

Importan el modulo global que gestiona todos sus archivos sass en `_app` si queremos pasar por props las clases de sass o directamente en el componente que vayamos a estilar

``` js
import mainStyles from '@stytes/main.module.scss'
```

Y le importamos de la siguiente forma segun sea la necesidad de lo que necesitemos estilar:

``` html
<section className={mainStyles['main-container']}></section>
```

Teniendo en cuenta que en sass tengo una clase llamada `.main-container {}`

Tambien podriamos pasar estos estilos por props o mejor aún utilizarlo en el react context.

#### Finalizando las páginas

Gracias a useRouter y las páginas dinámicas podemos crear una ruta por cada producto al solo tener un archivo para todas las rutas dinamicas.
Tenemos un footer que agregaremos en Layout, un carrito y una pagina acerca de información sobre la tienda.

#### Utilizando vercel para deploy

Al conectar github con vercel podemos hacer deploy de forma facil al darles permisos para crear el build y hostearlo de manera automática.

### M_ Data Fetching y Pre-rendering

#### Introducción a los pre-render modes

CSR ➡ ❌ Afecta el SEO
✔ algo positivo no tenemos problemas de TTFB (Time To First Byte)

SSR ➡ ❌ Afecta el redimiendo de nuestro sitio web con el TTFB (Time To First Byte)
✔ algo positivo es que mejora el SEO

SSG ➡ ❎ Lo mejor de los dos mundos
✔ No tenemos problemas de TTFB ni tampoco con el SEO
-----
Client Side: el código se ejecuta en el navegador y tendremos problemas con el SEO
SSR: El contenido se ejecuta en el servidor, para contenido dinámico, y ésto permite que se pueda indexar
SSG: El contenido se genera en el deploy, ayuda al seo, pero no recomendable para contenido muy dinamico

#### UnderTheHood Server Side Rendering: getServerSideProps

Para realizar server side rendering next nos provee una fn() llamada `getServerSideProps` aqui es donde haremos la llamada a nuestra api de forma asincrona.

Esta fn() reemplazaria useEffect() ya que este hook se renderiza del lado del cliente.

`getServerSideProps` no acepta rutas relativas sino absolutas con dominio incluido, y necesita hacer un fetch de forma isomorfica ya que como funciona del lado del servidor no podemos hacer fetching desde el objeto window.

``` js 
import fetch from 'isomorphic-unfetch'

export const getServerSideProps = async () => {
    const loading = true;
    const result = await fetch(url)
    const data = await result.json()
    const productList = data.data
    loading = !loading;
    return {
        props: {
            productList,
        }
    }
}
```

Puede ser un fetch o se puede hacer uan consulta directa a la base de datos:

``` js 
export const getServerSideProps = async () => {
  const results = await query(`
      SELECT * FROM playeras
      ORDER BY id DESC
  `);

  return {
    props: {
      shirts: JSON.parse(JSON.stringify(results)),
    },
  };  
};
```

Una alternativa al hardcoding para actualizar la URL de la API de la aplicación es crear un archivo index.ts en una carpeta config: 

``` tsx
const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http : //localhost:3000' : 'URL Vercel de tu App'; 
// Cambiará dependiendo de la variable de entorno NODE_ENV
```

Y en tu archivo index.tsx reemplazas el string construido de fetch API, con la constante server que exportaste en el archivo index.ts de la carpeta config.

``` tsx
import { server } from '../config'; // Importas la constante server

export const getServerSideProps = async () => {

  const response = await fetch(`${server}/api/avo`); // La agregas en Fetch API
```

Reto: 
`https://github.com/jonalvarezz/platzi-nextjs/blob/main/pages/yes-or-no.tsx`

