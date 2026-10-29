import { StoryStep } from "@/types";

export const STORY_STEPS: StoryStep[] = [
  {
    id: 1,
    time: "27 de octubre (tramo inicial)",
    kicker: "Tramo Terrestre",
    locationName: "Brasilia → Foz de Iguazú (Brasil)",
    title: "El escape por ruta hacia la frontera sur",
    text: "Traslado por vía terrestre dentro del territorio brasileño hacia la zona fronteriza con Argentina. Un recorrido de más de 1.500 kilómetros que conectó la capital federal con el extremo suroeste de Paraná para evitar controles aeroportuarios iniciales.",
    mapState: {
      center: [-47.8, -15.7],
      zoom: 6.8, // Alejado ~50% de escala para abarcar el corredor Brasilia-Foz con mayor contexto
      pitch: 35,
      bearing: -15
    },
    highlightFeature: "brasilia-foz"
  },
  {
    id: 2,
    time: "27 de octubre, 22:50",
    kicker: "Paso Internacional",
    locationName: "Puente Tancredo Neves (Foz – Puerto Iguazú)",
    title: "El cruce formal de la frontera hacia territorio argentino",
    text: "Cruce formal de frontera a través del Puente Internacional Tancredo Neves sobre el río Iguazú junto a su esposa y sus dos hijas, registrándose en el control migratorio oficial antes de ingresar a la provincia de Misiones.",
    mapState: {
      center: [-54.5898, -25.5902],
      zoom: 11.8, // Alejado para mostrar el río Iguazú, la frontera y ambas ciudades
      pitch: 45,
      bearing: 30
    },
    highlightFeature: "puente-tancredo-neves"
  },
  {
    id: 3,
    time: "28 de octubre, 00:21",
    kicker: "Despegue Aéreo",
    locationName: "Aeropuerto de Puerto Iguazú (Argentina)",
    title: "Vuelo privado esquivando el espacio aéreo brasileño",
    text: "Despegue a bordo de un vuelo privado en un avión Gulfstream G400 de la firma Baires Fly. La aeronave inició su trayecto internacional sobrevolando Paraguay, Bolivia y Perú con un plan de navegación diseñado expresamente para evitar ingresar al espacio aéreo de Brasil.",
    mapState: {
      center: [-54.4871, -25.5966],
      zoom: 14.2, // Alejado para contextualizar el despegue hacia Paraguay
      pitch: 40,
      bearing: -10
    },
    highlightFeature: "aeropuerto-iguazu"
  },
  {
    id: 4,
    time: "28 de octubre (escala técnica)",
    kicker: "Reabastecimiento",
    locationName: "Guayaquil, Ecuador",
    title: "Carga de combustible en la costa del Pacífico",
    text: "Aterrizaje en el Aeropuerto Internacional de Guayaquil para realizar una escala técnica con el fin exclusivo de cargar combustible antes de proseguir el cruce hacia Centroamérica y Norteamérica.",
    mapState: {
      center: [-79.8836, -2.1574],
      zoom: 11.5, // Alejado para apreciar el golfo de Guayaquil y la costa ecuatoriana
      pitch: 35,
      bearing: 15
    },
    highlightFeature: "guayaquil"
  },
  {
    id: 5,
    time: "28 de octubre (por la mañana)",
    kicker: "Destino Final",
    locationName: "Miami (EE.UU.)",
    title: "Aterrizaje en el área metropolitana de Miami",
    text: "Aterrizaje final en Miami, Florida. Con este arribo a suelo estadounidense concluyó el operativo internacional de traslado de Flávio Bolsonaro y su familia.",
    mapState: {
      center: [-80.2783, 25.9070],
      zoom: 14.8, // Alejado para mostrar el condado de Miami-Dade y el sur de Florida
      pitch: 50,
      bearing: 25
    },
    highlightFeature: "miami-opalocka"
  }
];

// Puntos clave de las 5 etapas
export const STEP_KEY_POINTS: [number, number][] = [
  [-47.8825, -15.7942], // 1. Brasilia
  [-54.5898, -25.5902], // 2. Puente Tancredo Neves
  [-54.4735, -25.7373], // 3. Aeropuerto de Puerto Iguazú
  [-79.8836, -2.1574],  // 4. Guayaquil (vía Paraguay, Bolivia, Perú)
  [-80.2783, 25.9070]   // 5. Opa-locka, Miami
];

// Ruta detallada que incluye el desvío aéreo por Paraguay, Bolivia y Perú
export const FULL_ROUTE_DETAILED: [number, number][] = [
  // Tramo 1: Brasilia hacia Foz
  [-47.8825, -15.7942], // Brasilia
  [-49.2539, -16.6869], // Goiânia
  [-51.4641, -21.1275], // São Paulo oeste
  [-54.5854, -25.5163], // Foz de Iguazú

  // Tramo 2: Cruce Puente Tancredo Neves
  [-54.5898, -25.5902], // Puente Tancredo Neves

  // Tramo 3: Aeropuerto Puerto Iguazú
  [-54.4735, -25.7373], // Aeropuerto Cataratas del Iguazú

  // Tramo 4: Vuelo Gulfstream G400 evitando Brasil (sobrevuelo Paraguay, Bolivia, Perú)
  [-57.5195, -24.5271], // Paraguay (norte Asunción)
  [-63.1805, -17.8042], // Santa Cruz de la Sierra, Bolivia
  [-68.1500, -16.5000], // Altiplano boliviano
  [-73.5000, -11.0000], // Perú (corredor andino)
  [-77.0428, -6.5000],  // Perú norte
  [-79.8836, -2.1574],  // Guayaquil, Ecuador

  // Tramo 5: Guayaquil hacia Miami Opa-locka
  [-77.5000, 3.5000],   // Pacífico colombiano
  [-79.5000, 8.9824],   // Panamá
  [-81.5000, 16.5000],  // Caribe
  [-81.0000, 22.0000],  // Estrecho de Florida
  [-80.2783, 25.9070]   // Aeropuerto Ejecutivo de Opa-locka, Miami
];

// Índices en FULL_ROUTE_DETAILED correspondientes al final de cada etapa
export const STEP_ROUTE_INDICES = [
  3,  // Fin paso 1 (Foz)
  4,  // Fin paso 2 (Puente Tancredo Neves)
  5,  // Fin paso 3 (Aeropuerto Iguazú)
  11, // Fin paso 4 (Guayaquil tras vuelo por Py, Bo, Pe)
  16  // Fin paso 5 (Miami Opa-locka)
];
