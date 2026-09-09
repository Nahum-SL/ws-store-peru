# WebService
Esta app, utiliza NodeJS como entorno de desarrollo para acceder y gestionar los datos desde MySQL y servirlos a través de un API REST en formato JSON. 
Sera usado desde un proyecto en Android Studio

---

## Requerimientos
| Tecnologia | Uso |
|---|---|
| NodeJS | Soporte para JS |
| MySQL | Base de datos |
| ThunderClient / Postman | Prueba como cliente | 

---

## 📦 Arquitectura del proyecto

```text
ws-store-peru/
├── dto/                # DTO responsable de validar los input 
└── code                # Codigo hecho con JavaScript
```

---

## Base de datos
Restaure la BD, tabla y registros desde el archivo **database_store_peru.sql**. Antes de continuar verifique que este proceso se realizó correctamente.

---

## Despliegue
1. Clone el repositorio.
```
git clone https://github.com/Nahum-SL/ws-store-peru.git
```

2. Instale el proyecto.
```shell
# Instalar dependencias
pnpm install
# o
npm install
npm.cmd install
```

3. Ejecute el servidor local.
```shell
pnpm dev

npm run dev
```

---

## Autor
Desarrolado por: **[Nahum Salazar Levano](https://github.com/Nahum-SL)**

---
