# Guía de Configuración de Sanity CMS

## 1. Instalación
Si no se instalaron las dependencias automáticamente, ejecuta:
```bash
npm install sanity @sanity/client @sanity/image-url next-sanity @sanity/vision
```

## 2. Configuración del Proyecto en Sanity

1.  **Login**: Abre una terminal y ejecuta:
    ```bash
    npx sanity login
    ```
    Sigue las instrucciones para loguearte en el navegador.

2.  **Crear Proyecto**:
    ```bash
    npx sanity init
    ```
    - Selecciona "Create new project"
    - Nombre del proyecto: `TodoEnPackaging` (o el que prefieras)
    - Dataset: `production` (default)
    - Output path: `.` (directorio actual)
    - **IMPORTANTE**: Cuando pregunte si quieres usar TypeScript, di que **SÍ**.
    - Cuando pregunte por el template, selecciona "Clean project with no predefined schemas" (ya que ya creamos los schemas manualmente).

3.  **Obtener Credenciales**:
    - Ve a [https://www.sanity.io/manage](https://www.sanity.io/manage)
    - Selecciona tu proyecto.
    - El **Project ID** está en el dashboard principal.
    - Para el **Token**:
        - Ve a "API" > "Tokens" > "Add API token".
        - Dale un nombre (ej: "NextJS Website").
        - Permisos: **Editor** (para leer y escribir si fuera necesario, o Viewer si solo leerás).
        - Copia el token generado.

## 3. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto y agrega:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id_aqui
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=tu_token_aqui
```

## 4. Despliegue de Sanity Studio

Para desplegar el estudio de administración en la nube de Sanity (opcional, pero recomendado para producción):

```bash
npx sanity deploy
```
Esto te dará una URL (ej: `https://tu-proyecto.sanity.studio`) donde podrás gestionar el contenido.

## 5. Ejecución

Corre el servidor de desarrollo:
```bash
npm run dev
```
Visita `http://localhost:3000/studio` para ver el gestor de contenido integrado en tu sitio (si configuraste la ruta `/studio` en Next.js, lo cual requiere un paso extra de crear la página `app/studio/[[...index]]/page.tsx`).

**Nota**: Como este proyecto usa `app` directory, para tener el Studio embebido en `/studio`, necesitas crear la ruta. Si no, usa `npx sanity start` para correr el studio en otro puerto (ej: 3333).

### Para habilitar /studio en Next.js App Router:

Crea el archivo `app/studio/[[...index]]/page.tsx`:

```tsx
"use client"

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```
