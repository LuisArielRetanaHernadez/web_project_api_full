# Tripleten Web Project API Full

Aplicación full stack para crear y compartir tarjetas con imágenes, con autenticación de usuarios, gestión de perfiles, likes y publicación de contenido. El proyecto fue desplegado en una infraestructura basada en AWS EC2, con dominio configurado, Nginx como proxy inverso y PM2 para mantener la API en ejecución de forma estable.

> La implementación se realizó en AWS EC2 porque fue la solución disponible en ese momento. Google Cloud no pudo utilizarse por limitaciones de credenciales y permisos de acceso.

## Arquitectura de producción

La aplicación se despliega con una infraestructura moderna y fiable:

- Amazon EC2 como servidor de aplicación
- Dominio configurado para acceder a la API y al frontend
- Nginx como reverse proxy y manejo de HTTPS
- PM2 para ejecutar la API de backend en producción
- MongoDB Atlas o base de datos remota
- Frontend estático servido desde el mismo servidor o mediante build de Vite

### Diagrama general

```text
Usuario
  |
  v
Dominio / DNS
  |
  v
Nginx
  |-- proxy /api -> Backend (Express + Node.js)
  |-- serve -> Frontend (build de Vite)
  v
PM2
  |
  v
Backend en Node.js
  |
  v
MongoDB
```

## URLs de la aplicación

- Frontend: https://www.tudominio.com
- API: https://api.tudominio.com
- Backend local (desarrollo): http://localhost:3000
- Frontend local (desarrollo): http://localhost:5173

## Tecnologías

### Frontend

- React
- Vite
- React Router
- JavaScript
- CSS modular y estilos propios

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JWT para autenticación
- bcryptjs para contraseñas
- Celebrate para validación
- Winston + Axiom para logs
- dotenv para variables de entorno

## Funcionalidades

- Registro e inicio de sesión con email y contraseña
- Autenticación con JWT
- Recuperación del perfil del usuario autenticado
- Actualización de nombre y descripción
- Cambio de avatar
- Creación, eliminación y listado de tarjetas
- Agregar y quitar likes
- Vista ampliada de imágenes
- Validación de entradas con Celebrate
- Manejo centralizado de errores

## Estructura del proyecto

```text
web_project_api_full/
├── backend/         # API REST, modelos, controladores y middlewares
├── frontend/        # Aplicación React
├── README.md        # Documentación del proyecto
└── .gitignore
```

## Requisitos

- Node.js 18 o superior
- npm
- MongoDB Atlas o una base de datos MongoDB disponible
- Instancia EC2 de AWS o servidor propio con acceso root/administrador
- Nginx instalado
- PM2 instalado globalmente
- Dominio apuntando al servidor

## Entorno de despliegue elegido

El proyecto se implementó en AWS EC2 por disponibilidad, compatibilidad y facilidad de configuración en el entorno de trabajo. Esta decisión permitió levantar el backend y configurar el acceso público con dominio, Nginx y PM2 de forma rápida y estable.

Google Cloud no fue opción en esta entrega debido a limitaciones de credenciales y permisos para crear la infraestructura necesaria.

## Instalación local

Clona el repositorio e instala dependencias:

```bash
git clone <URL_DEL_REPOSITORIO>
cd web_project_api_full

cd backend
npm install

cd ../frontend
npm install
```

### Variables de entorno del backend

Crea el archivo `backend/.env` con algo como:

```env
NODE_ENV=production
PORT=3000
MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/mi-base
JWT_SECRET=tu_secreto_super_seguro
AXIOM_TOKEN=tu_token_axiom
AXIOM_DATASET=web_api_full
```

### Variables de entorno del frontend

El frontend usa variables de entorno según el entorno:

```env
VITE_API_URL=https://api.tudominio.com
```

Para desarrollo local:

```env
VITE_API_URL=http://localhost:3000
```

## Ejecución local

```bash
# Terminal 1 - backend
cd backend
npm run dev

# Terminal 2 - frontend
cd frontend
npm run dev
```

La app estará disponible en:

- Frontend: http://localhost:5173
- API: http://localhost:3000

## Comandos del backend

```bash
npm install
npm run dev
npm start
npm run lint
```

## Comandos del frontend

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Despliegue en servidor propio

### 1. Clonar el proyecto

```bash
cd /var/www
git clone <URL_DEL_REPO> web_project_api_full
```

### 2. Instalar dependencias

```bash
cd /var/www/web_project_api_full/backend
npm install

cd /var/www/web_project_api_full/frontend
npm install
npm run build
```

### 3. Configurar variables de entorno

En el backend, crea un archivo `.env` con las credenciales reales del servidor y MongoDB.
En el frontend, crea el `.env.production` con la URL real de la API:

```env
VITE_API_URL=https://api.tudominio.com
```

### 4. Ejecutar con PM2

Instala PM2 si no está disponible:

```bash
npm install -g pm2
```

Desde la carpeta del backend:

```bash
pm2 start app.js --name web-project-api-full
pm2 save
pm2 startup
```

Para verificar el estado:

```bash
pm2 list
pm2 logs web-project-api-full
```

### 5. Configurar Nginx

Ejemplo de configuración de reverse proxy para la API:

```nginx
server {
    listen 80;
    server_name api.tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Ejemplo para el frontend:

```nginx
server {
    listen 80;
    server_name www.tudominio.com tudominio.com;

    root /var/www/web_project_api_full/frontend/dist;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

Después de guardar el archivo, activa la configuración:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

### 6. HTTPS con SSL

Para el dominio real, genera certificados con Certbot:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tudominio.com -d www.tudominio.com -d api.tudominio.com
```

A partir de ahí, Nginx redirige automáticamente a HTTPS.

## API REST

La API principal sirve endpoints para autenticación y gestión de tarjetas.

### Autenticación y usuarios

| Método | Ruta | Autenticación | Descripción |
| --- | --- | --- | --- |
| `POST` | `/signin` | No | Inicia sesión y devuelve un JWT. |
| `POST` | `/signup` | No | Registra un usuario. |
| `GET` | `/users` | Sí | Devuelve usuarios. |
| `GET` | `/users/me` | Sí | Obtiene el perfil del usuario autenticado. |
| `PUT` | `/users/me` | Sí | Actualiza nombre y descripción. |
| `PATCH` | `/users/me/avatar` | Sí | Actualiza el avatar. |

### Tarjetas

| Método | Ruta | Autenticación | Descripción |
| --- | --- | --- | --- |
| `GET` | `/cards` | No | Obtiene todas las tarjetas. |
| `GET` | `/cards/:userId` | No | Obtiene tarjetas por usuario. |
| `POST` | `/cards` | Sí | Crea una tarjeta con `name` y `link`. |
| `DELETE` | `/cards/:cardId` | Sí | Elimina una tarjeta propia. |
| `PUT` | `/cards/:cardId/likes` | Sí | Añade un like. |
| `DELETE` | `/cards/:cardId/likes` | Sí | Quita un like. |

Ejemplo de cabecera autorizada:

```http
Authorization: Bearer <JWT>
```

## Buenas prácticas de despliegue

- Nunca subir archivos `.env` al repositorio
- Usar variables de entorno para credenciales y secretos
- Mantener PM2 activo con reintentos automáticos
- Configurar logs de Nginx y backend para auditoría
- Hacer backups de la base de datos y de los archivos del proyecto
- Usar HTTPS en producción

## Autor

Luis Ariel Retana Hernández
