# Despliegue en Vercel — La Frutería

El proyecto ya está completamente configurado y optimizado para desplegarse en **Vercel** en un par de clics.

## Configuración ya preparada en el código:
- ✅ **`vercel.json`**: Configurado con redirección limpia SPA (`rewrites` hacia `index.html`) y encabezados de caché inmutable para imágenes y assets.
- ✅ **Fotografías y recursos estáticos**: Ubicados en `/public/images/`, garantizando que en el build de producción se copien directamente a `dist/images/` sin rutas rotas ni errores 404.
- ✅ **Comando de compilación**: `npm run build` genera la carpeta `dist`.
- ✅ **TypeScript & Tailwind CSS v4**: Compilación sin errores probada y verificada.

---

## Pasos para desplegar en Vercel:

### Opción 1: Conectar mediante GitHub (Recomendada)
1. Sube este proyecto a tu cuenta de **GitHub** (o GitLab / Bitbucket).
2. Entra en [vercel.com](https://vercel.com/) e inicia sesión con tu cuenta de GitHub.
3. Haz clic en **"Add New..."** > **"Project"**.
4. Selecciona el repositorio de **La Frutería**.
5. Vercel detectará automáticamente:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Haz clic en el botón azul **"Deploy"**. En menos de 1 minuto tendrás la web online con tu dominio `.vercel.app` (y podrás añadir tu dominio personalizado gratis con SSL automático).

### Opción 2: Despliegue directo desde la terminal (Vercel CLI)
Si prefieres desplegar directamente desde tu ordenador:
```bash
npm install -g vercel
vercel
```
Sigue las preguntas en pantalla (presiona Enter para aceptar los valores por defecto) y tu web estará publicada al instante.
