VERSIÓN FINAL PARA CLOUDFLARE

Esta carpeta conserva el index.html aprobado y contiene los archivos del proxy.

IMPORTANTE:
Si tu proyecto actual es Cloudflare Pages con subida directa (sin Git), el panel debe aceptar el modo de despliegue que ejecuta _worker.js. Si el panel solo acepta activos estáticos, /master-api/ no podrá funcionar como proxy desde ese método.

NO cambies index.html.

Proxy:
  /master-api/* -> https://master.iw4.zip/instance/*

No requiere otro dominio.
