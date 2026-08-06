# TechPaws

Sitio web responsive para el servicio técnico TechPaws.

## Formulario de contacto

1. Crear un formulario gratuito en https://formspree.io/ usando `pawstech5@gmail.com`.
2. Copiar `.env.example` como `.env.local`.
3. Reemplazar `TU_ID_DE_FORMULARIO` por el identificador entregado por Formspree.

En Vercel, agregar la misma variable `NEXT_PUBLIC_FORMSPREE_ENDPOINT` en la configuración del proyecto antes de desplegar.

## Desarrollo

Requiere Node.js 22.13 o superior.

```bash
pnpm install
pnpm dev
```

## Despliegue

Importar la carpeta en Vercel, agregar la variable del formulario y publicar.
