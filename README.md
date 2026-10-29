# Especial Interactivo de Scrollytelling Cartográfico

Investigación visual interactiva: **La Fuga de Flávio Bolsonaro: De Brasilia a Miami**.

Desarrollado con una estética editorial sobria y rigurosa al estilo de *The New York Times* y *LA NACION Data*, utilizando la técnica de **scrollytelling** (mapa fijo bloqueado contra interacción manual + narrativa flotante reactiva sincronizada por scroll).

## 🚀 Stack Tecnológico

- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript.
- **Cartografía**: MapLibre GL JS con tiles vectoriales libres **Carto Positron** (sin API keys).
- **Control de Navegación**: Mapa 100% bloqueado (`interactive: false`, sin controles de zoom/arrastre manual) con transiciones suaves automáticas mediante `map.flyTo()`.
- **Detección de Scroll**: `IntersectionObserver` nativo configurado con margen central (`-45% 0px -45% 0px`).
- **Estilos**: Tailwind CSS con paleta editorial sobria (fondos marfil, tipografía con serifas para titulares y acentos carmesí).

---

## 🗺️ Las 5 Etapas del Recorrido

1. **Brasilia → Foz de Iguazú (Brasil)**
   - *Horario*: 27 de octubre (tramo inicial).
   - *Detalle*: Traslado por vía terrestre de más de 1.500 km dentro del territorio brasileño hacia la zona fronteriza para evitar controles en terminales aéreas locales.
2. **Cruce de frontera (Puente Internacional Tancredo Neves)**
   - *Horario*: 27 de octubre, 22:50 (hora argentina).
   - *Detalle*: Cruce formal de frontera por el puente Tancredo Neves sobre el río Iguazú junto a su esposa y sus dos hijas hacia Puerto Iguazú.
3. **Puerto Iguazú (Argentina)**
   - *Horario*: 28 de octubre, 00:21 (hora argentina).
   - *Detalle*: Despegue en vuelo privado a bordo de un Gulfstream G400 (Baires Fly). Plan de vuelo trazado sobrevolando Paraguay, Bolivia y Perú para evitar ingresar al espacio aéreo brasileño.
4. **Guayaquil (Ecuador)**
   - *Horario*: 28 de octubre (escala técnica).
   - *Detalle*: Escala de reabastecimiento de combustible en la costa del Pacífico antes de continuar hacia Norteamérica.
5. **Miami (Estados Unidos)**
   - *Horario*: 28 de octubre, llegada por la mañana.
   - *Detalle*: Aterrizaje final en el Aeropuerto Ejecutivo de Opa-locka (Miami-Dade, Florida), culminando la travesía internacional.

---

## 🛠️ Cómo ejecutar

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
npm start
```
Abre [http://localhost:3000](http://localhost:3000) en el navegador.
