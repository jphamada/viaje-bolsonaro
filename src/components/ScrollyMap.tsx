"use client";

import React, { useEffect, useRef, useState } from "react";
import maplibregl, { Map as MapLibreMap, GeoJSONSource } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { StoryStep } from "@/types";
import { FULL_ROUTE_DETAILED, STEP_ROUTE_INDICES } from "@/data/storySteps";

interface ScrollyMapProps {
  steps: StoryStep[];
  activeStepId: number;
}

// Vector style without API key needed: Carto Positron (Editorial Clean Light style)
const POSITRON_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export const ScrollyMap: React.FC<ScrollyMapProps> = ({ steps, activeStepId }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const activeMarkerRef = useRef<maplibregl.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const activeStep = steps.find((s) => s.id === activeStepId) || steps[0];

  // 1. Initialize MapLibre
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialStep = steps[0];

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: POSITRON_STYLE,
      center: initialStep.mapState.center,
      zoom: initialStep.mapState.zoom,
      pitch: initialStep.mapState.pitch ?? 30,
      bearing: initialStep.mapState.bearing ?? 0,
      attributionControl: false, // Customized clean attribution below
      fadeDuration: 0,
      interactive: false, // Bloquea toda interacción manual del usuario
      dragPan: false,
      scrollZoom: false,
      boxZoom: false,
      dragRotate: false,
      keyboard: false,
      doubleClickZoom: false,
      touchZoomRotate: false,
      touchPitch: false,
    });

    map.on("load", () => {
      // Background Full Route (Dotted/Ghost Line)
      map.addSource("full-route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: FULL_ROUTE_DETAILED,
          },
        },
      });

      map.addLayer({
        id: "full-route-casing",
        type: "line",
        source: "full-route",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#a3a3a3",
          "line-width": 3,
          "line-opacity": 0.4,
          "line-dasharray": [2, 2],
        },
      });

      // Active / Progressive Route Line
      const initialEndIdx = STEP_ROUTE_INDICES[0] ?? 3;
      map.addSource("active-route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: FULL_ROUTE_DETAILED.slice(0, initialEndIdx + 1),
          },
        },
      });

      map.addLayer({
        id: "active-route-line",
        type: "line",
        source: "active-route",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#b91c1c", // NYT Red
          "line-width": 3.5,
          "line-opacity": 0.9,
        },
      });

      // Cities / Stops Points
      map.addSource("story-points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: steps.map((s) => ({
            type: "Feature",
            properties: {
              id: s.id,
              name: s.locationName,
              title: s.title,
            },
            geometry: {
              type: "Point",
              coordinates: s.mapState.center,
            },
          })),
        },
      });

      // Point Outer Halo
      map.addLayer({
        id: "points-outer",
        type: "circle",
        source: "story-points",
        paint: {
          "circle-radius": [
            "case",
            ["==", ["get", "id"], initialStep.id],
            10,
            6,
          ],
          "circle-color": "#b91c1c",
          "circle-opacity": 0.2,
          "circle-stroke-width": 1.5,
          "circle-stroke-color": "#b91c1c",
        },
      });

      // Point Core
      map.addLayer({
        id: "points-core",
        type: "circle",
        source: "story-points",
        paint: {
          "circle-radius": [
            "case",
            ["==", ["get", "id"], initialStep.id],
            6,
            4,
          ],
          "circle-color": [
            "case",
            ["==", ["get", "id"], initialStep.id],
            "#b91c1c",
            "#ffffff",
          ],
          "circle-stroke-width": 2,
          "circle-stroke-color": "#1c1917",
        },
      });

      // HTML Pulse Marker on active step
      const el = document.createElement("div");
      el.className = "scrolly-active-pulse-pin";
      el.innerHTML = `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-8 h-8 rounded-full bg-red-600/30 animate-ping"></div>
          <div class="w-3.5 h-3.5 rounded-full bg-red-700 border-2 border-white shadow-md"></div>
        </div>
      `;

      activeMarkerRef.current = new maplibregl.Marker({
        element: el,
        anchor: "center",
      })
        .setLngLat(initialStep.mapState.center)
        .addTo(map);

      mapRef.current = map;
      setMapLoaded(true);
    });

    // Handle container resize
    const resizeObserver = new ResizeObserver(() => {
      map.resize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      if (activeMarkerRef.current) {
        activeMarkerRef.current.remove();
      }
      map.remove();
      mapRef.current = null;
    };
  }, [steps]);

  // 2. FlyTo and update route when activeStepId changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded || !activeStep) return;

    // Smooth camera transition
    map.flyTo({
      center: activeStep.mapState.center,
      zoom: activeStep.mapState.zoom,
      pitch: activeStep.mapState.pitch ?? 35,
      bearing: activeStep.mapState.bearing ?? 0,
      duration: 2200,
      essential: true,
      curve: 1.42,
    });

    // Move the active HTML pulse marker
    if (activeMarkerRef.current) {
      activeMarkerRef.current.setLngLat(activeStep.mapState.center);
    }

    // Update active route line progressively up to current active step
    const activeIndex = steps.findIndex((s) => s.id === activeStep.id);
    const endIdx = STEP_ROUTE_INDICES[activeIndex] ?? FULL_ROUTE_DETAILED.length - 1;
    const lineCoords = FULL_ROUTE_DETAILED.slice(0, endIdx + 1);

    const activeRouteSource = map.getSource("active-route") as GeoJSONSource;
    if (activeRouteSource) {
      activeRouteSource.setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: lineCoords,
        },
      });
    }

    // Update circles highlight style
    if (map.getLayer("points-core")) {
      map.setPaintProperty("points-core", "circle-radius", [
        "case",
        ["==", ["get", "id"], activeStep.id],
        7,
        4,
      ]);
      map.setPaintProperty("points-core", "circle-color", [
        "case",
        ["==", ["get", "id"], activeStep.id],
        "#b91c1c",
        "#ffffff",
      ]);
    }

    if (map.getLayer("points-outer")) {
      map.setPaintProperty("points-outer", "circle-radius", [
        "case",
        ["==", ["get", "id"], activeStep.id],
        12,
        6,
      ]);
    }
  }, [activeStepId, activeStep, steps, mapLoaded]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#e5e5e5]">
      {/* MapLibre DOM Node - Totalmente bloqueado para interacción de puntero/touch */}
      <div
        ref={mapContainerRef}
        className="w-full h-full pointer-events-none select-none"
      />

      {/* Editorial HUD Overlay: Step title & coordinates */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex flex-col gap-1 rounded bg-white/90 p-3 shadow-md backdrop-blur-md border border-neutral-200 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-700 animate-pulse" />
          <span className="font-bold text-neutral-800 uppercase tracking-wider">
            {activeStep.locationName}
          </span>
        </div>
        <div className="text-[10px] text-neutral-500">
          LAT {activeStep.mapState.center[1].toFixed(4)}° | LON{" "}
          {activeStep.mapState.center[0].toFixed(4)}° | ZOOM{" "}
          {activeStep.mapState.zoom}x
        </div>
      </div>

      {/* Cartographic Attribution */}
      <div className="pointer-events-none absolute bottom-1 right-2 z-10 text-[9px] text-neutral-400 font-sans bg-white/70 px-1.5 py-0.5 rounded">
        Carto Positron © OpenStreetMap contributors
      </div>
    </div>
  );
};
