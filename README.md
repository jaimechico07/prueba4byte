# 📦 Product Catalog - Prueba Técnica Frontend

## 🚀 Instalación y Ejecución

### Requisitos previos
- Node.js 18+
- Angular CLI 21+

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en desarrollo
ng serve

# 3. Abrir navegador en
http://localhost:4200

## 🚀 Demo
Aplicación web de catálogo de productos con autenticación, CRUD completo y búsqueda en tiempo real.

### Credenciales de acceso
Usuario: mor_2314
Contraseña: 83r5^_

## 📋 Requerimientos Cumplidos

### ✅ Autenticación
- Login con username/password consumiendo `/auth/login`
- Token almacenado en localStorage
- Interceptor HTTP para enviar token como Bearer
- AuthGuard para proteger rutas
- Logout con limpieza de token

### ✅ Catálogo de Productos
- Listado en tabla con PrimeNG
- Paginación (5, 10, 20 items por página)
- Búsqueda global por nombre en tiempo real
- Imágenes con tamaño consistente

### ✅ Detalle de Producto
- Vista individual con imagen, nombre, descripción, precio y categoría
- Botón de regreso al listado

### ✅ CRUD Completo
- **Create**: Formulario para crear nuevos productos
- **Read**: Listado y detalle
- **Update**: Edición de productos existentes
- **Delete**: Eliminación con diálogo de confirmación

### ✅ UI/UX
- Diseño limpio y responsive
- Componentes PrimeNG: Table, Button, InputText, Card, Toast, ConfirmDialog, Select
- Mensajes de éxito/error con Toast
- Loading states con ProgressSpinner
- Diálogo de confirmación para acciones destructivas

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Angular | 20.x | Framework principal |
| TypeScript | 5.x | Lenguaje |
| PrimeNG | 20.x | Componentes UI |
| PrimeIcons | 7.x | Iconos |
| RxJS | 7.x | Manejo de observables |
| Signals | 20.x | Estado reactivo |

## 📁 Estructura del Proyecto

rc/app/
├── core/
│ ├── guards/
│ │ └── auth.guard.ts # Protección de rutas
│ ├── interceptors/
│ │ └── auth.interceptor.ts # Inyección de token
│ └── services/
│ └── auth.service.ts # Autenticación
├── features/
│ ├── login/
│ │ └── login.component.ts # Pantalla de login
│ ├── products/
│ │ ├── product-list/ # Listado de productos
│ │ ├── product-detail/ # Detalle de producto
│ │ └── product-form/ # Crear/Editar producto
│ └── services/
│ └── product.service.ts # CRUD productos
├── app.config.ts # Configuración global
└── app.routes.ts # Definición de rutas

### 📱 Funcionalidades
**Login**
- Pantalla inicial con formulario de autenticación
- Validación de campos
- Mensaje de error para credenciales inválidas
- Redirección automática al catálogo

**Listado de Productos**
- Tabla con imagen, nombre, categoría, precio y acciones
- Paginación integrada
- Búsqueda en tiempo real por nombre
- Botones: Ver detalle, Editar, Eliminar
- Botón para crear nuevo producto
- Botón de logout

**Detalle de Producto**
- Información completa del producto
- Imagen de mayor tamaño
- Categoría con badge
- Precio destacado
- Descripción completa
- Rating (si está disponible)

**Crear/Editar Producto**
- Formulario con validaciones
- Campos: título, precio, categoría, imagen URL, descripción
- Select para categorías predefinidas
- Vista previa de imagen
- Mensajes de éxito/error

### 🎨 Componentes PrimeNG Utilizados
| Componente | Módulo | Uso |
|-------|-------|-------|
| Table |	TableModule |	Listado de productos |
| Button | ButtonModule | Acciones |
| InputText | InputTextModule |	Campos de texto |
| Select | SelectModule | Selección de categoría |
| Card | CardModule | Contenedores |
| Toast | ToastModule |	Notificaciones |
| ProgressSpinner | ProgressSpinnerModule | Loading |
| ConfirmDialog | ConfirmDialogModule | Confirmación de eliminación |
| Messages |	MessagesModule | Mensajes de error |

### 🌐 API Endpoints Utilizados
| Método |	Endpoint |	Uso |
|-------|-------|-------|
| POST | /auth/login | Autenticación |
| GET	| /products | Obtener todos |
| GET | /products/:id |	Obtener uno |
| POST | /products | Crear producto |
| PUT |	/products/:id | Actualizar producto |
| DELETE | /products/:id |	Eliminar producto |

## 🛠️ Tecnologías Utilizadas
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Angular | 21.x | Framework principal |
| TypeScript | 5.9.x | Lenguaje |
| PrimeNG | 21.x | Componentes UI |
| PrimeIcons | 7.x | Iconos |
| RxJS | 7.8.x | Manejo de observables |
| Signals | 21.x | Estado reactivo |

### API Externa
- [FakeStore API](https://fakestoreapi.com) - API pública para pruebas



