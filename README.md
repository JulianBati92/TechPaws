# TechPaws

Sitio web responsive con formulario y backend propio para enviar consultas mediante Gmail SMTP.

## Configuración en Vercel

Crear estas variables en **Project Settings → Environment Variables**:

- `SMTP_USER`: `pawstech5@gmail.com`
- `SMTP_PASS`: una contraseña de aplicación de Gmail nueva, sin espacios
- `CONTACT_EMAIL`: `pawstech5@gmail.com`

No guardar la contraseña en GitHub ni en archivos del proyecto. Si una contraseña fue compartida, revocarla y generar otra.

## Desarrollo local

Requiere Node.js 22.13 o superior.

```bash
npm install
npm run dev
```

## Despliegue

Vercel detecta Next.js automáticamente. No hace falta configurar el comando de compilación: utiliza `npm run build`.
