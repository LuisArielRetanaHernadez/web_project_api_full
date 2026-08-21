# Tripleten Web Project API Full

Aplicación web full stack para crear y compartir tarjetas con imágenes. Las personas usuarias pueden registrarse, iniciar sesión, editar su perfil, actualizar su avatar, crear y eliminar sus propias tarjetas, marcar tarjetas con "me gusta" y abrir las imágenes en una vista ampliada.

## Demo

- Frontend: [https://webfullapi.vercel.app/](https://webfullapi.vercel.app/)
- API: [https://api-webfullapi.vercel.app/](https://api-webfullapi.vercel.app/)

## Tecnologías

### Frontend

- React 18
- React Router
- Vite
- JavaScript (ES modules)

### Backend

- Node.js y Express
- MongoDB con Mongoose
- JWT para autenticación
- bcryptjs para proteger contraseñas
- Celebrate para validar solicitudes
- Winston y Axiom para registros

## Funcionalidades

- Registro e inicio de sesión con email y contraseña.
- Rutas protegidas mediante tokens JWT.
- Consulta y actualización de los datos del perfil.
- Actualización del avatar.
- Creación de tarjetas con nombre e imagen.
- Eliminación de las tarjetas propias.
- Añadir y quitar "me gusta" a las tarjetas.
- Vista ampliada de las imágenes.

## Estructura del proyecto

```text
web_project_api_full/
├── backend/       # API REST, modelos, controladores y middleware
├── frontend/      # Aplicación React y estilos
└── README.md
```

## Requisitos

- Node.js 18 o una versión posterior.
- npm.
- Una instancia de MongoDB.

## Instalación y ejecución local

Clona el repositorio e instala las dependencias de cada parte:

```bash
git clone <URL_DEL_REPOSITORIO>
cd web_project_api_full

cd backend
npm install

cd ../frontend
npm install
```

Configura las variables de entorno del backend en `backend/.env`:

```env
NODE_ENV=development
PORT=3000
MONGO_URL=<URL_DE_CONEXION_A_MONGODB>
JWT_SECRET=<SECRETO_PARA_FIRMAR_TOKENS>
```

Configura la URL de la API para el frontend en `frontend/.env.development`:

```env
VITE_API_URL=http://localhost:3000/
```

Ejecuta cada servicio desde su propia terminal:

```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

El frontend estará disponible normalmente en `http://localhost:5173`.

## Comandos disponibles

### Backend

```bash
npm run dev     # Servidor de desarrollo con nodemon
npm start       # Servidor de producción
npm run lint    # Revisión de estilo
```

### Frontend

```bash
npm run dev     # Servidor de desarrollo Vite
npm run build   # Compilación para producción
npm run preview # Vista previa de la compilación
npm run lint    # Revisión de estilo
```

## API REST

La API de producción está disponible en `https://api-webfullapi.vercel.app/`. Las rutas protegidas requieren el encabezado:

```http
Authorization: Bearer <JWT>
```

### Autenticación y usuarios

| Método | Ruta | Autenticación | Descripción |
| --- | --- | --- | --- |
| `POST` | `/users/signup` | No | Registra una persona usuaria. |
| `POST` | `/users/signin` | No | Inicia sesión y devuelve un JWT. |
| `GET` | `/users` | Sí | Obtiene todas las personas usuarias. |
| `GET` | `/users/me` | Sí | Obtiene el perfil de la persona autenticada. |
| `GET` | `/users/:id` | Sí | Obtiene una persona usuaria por ID. |
| `PUT` | `/users/me` | Sí | Actualiza nombre y descripción. |
| `PATCH` | `/users/me/avatar` | Sí | Actualiza el avatar. |

### Tarjetas

| Método | Ruta | Autenticación | Descripción |
| --- | --- | --- | --- |
| `GET` | `/cards` | No | Obtiene todas las tarjetas. |
| `GET` | `/cards/:userId` | No | Obtiene las tarjetas de una persona usuaria. |
| `POST` | `/cards` | Sí | Crea una tarjeta con `name` y `link`. |
| `DELETE` | `/cards/:cardId` | Sí | Elimina una tarjeta propia. |
| `PUT` | `/cards/:cardId/likes` | Sí | Añade un "me gusta". |
| `DELETE` | `/cards/:cardId/likes` | Sí | Quita un "me gusta". |

## Despliegue

El frontend y el backend están preparados para desplegarse por separado. En el despliegue del frontend, define:

```env
VITE_API_URL=https://api-webfullapi.vercel.app/
```

En el despliegue del backend, configura al menos `MONGO_URL` y `JWT_SECRET` como variables de entorno. No incluyas credenciales reales en el repositorio.

## Autor

Luis Ariel Retana Hernández
