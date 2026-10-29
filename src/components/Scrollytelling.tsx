"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { StoryStep } from "@/types";
import { StoryCard } from "./StoryCard";
import { Compass, Share2, ArrowDown } from "lucide-react";

// Dynamically import ScrollyMap to prevent SSR issues with MapLibre GL
const ScrollyMap = dynamic(
  () => import("./ScrollyMap").then((mod) => mod.ScrollyMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 text-neutral-500">
        <Compass className="w-8 h-8 animate-spin mb-2 text-neutral-400" />
        <span className="text-xs font-mono uppercase tracking-widest">
          Cargando Cartografía...
        </span>
      </div>
    ),
  }
);

interface ScrollytellingProps {
  steps: StoryStep[];
}

export const Scrollytelling: React.FC<ScrollytellingProps> = ({ steps }) => {
  const [activeStepId, setActiveStepId] = useState<number>(steps[0].id);
  const stepRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Setup IntersectionObserver focused on the vertical 50% of viewport
  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepId = Number(entry.target.getAttribute("data-step-id"));
          if (stepId) {
            setActiveStepId(stepId);
          }
        }
      });
    };

    // The -45% 0px -45% 0px margin creates a trigger line around the vertical center of the screen
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    });

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [steps]);

  // Handle clicking directly on a step card or navigation pill
  const handleSelectStep = (stepId: number) => {
    setActiveStepId(stepId);
    const element = stepRefs.current.get(stepId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const activeIndex = steps.findIndex((s) => s.id === activeStepId);

  return (
    <div className="relative w-full bg-editorial-bg text-editorial-text">
      {/* Editorial Header / Intro Section */}
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16 text-center border-b border-neutral-200">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-red-50 border border-red-200/60 text-red-700 text-xs font-mono font-semibold uppercase tracking-widest">
          <span>Especial Multimedia</span>
          <span>•</span>
          <span>Investigación Visual</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.1] mb-6">
          La Fuga de Flávio Bolsonaro: De Brasilia a Miami
        </h1>

        <p className="font-serif text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Reconstrucción de la salida del senador brasileño
        </p>

        {/* Byline and metadata */}

        {/* Scroll cue */}
        <div className="mt-12 flex flex-col items-center justify-center text-neutral-400 gap-2 animate-bounce">
          <span className="text-[11px] font-mono tracking-widest uppercase">
            Desplaza hacia abajo para seguir la cronología del recorrido
          </span>
          <ArrowDown className="w-4 h-4 text-red-700" />
        </div>
      </header>

      {/* Progress Floating Bar */}
      <nav
        aria-label="Progreso de la historia"
        className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between shadow-sm"
      >
        <div className="flex items-center gap-3">
          <span className="font-serif font-bold text-xs md:text-sm tracking-tight text-neutral-900 truncate max-w-[200px] md:max-w-md">
            La Fuga de Flávio Bolsonaro
          </span>
          <span className="hidden sm:inline text-xs text-neutral-400">|</span>
          <span className="hidden sm:inline font-mono text-xs text-red-700 font-semibold">
            Paso {activeIndex + 1} de {steps.length}
          </span>
        </div>

        {/* Step quick jumps */}
        <div className="flex items-center gap-1.5">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => handleSelectStep(step.id)}
              title={`${step.locationName} - ${step.title}`}
              className={`h-2 transition-all rounded-full ${step.id === activeStepId
                ? "w-8 bg-red-700"
                : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
                }`}
              aria-label={`Ir a etapa ${idx + 1}: ${step.locationName}`}
            />
          ))}
        </div>
      </nav>

      {/* Main Scrollytelling Section */}
      <section className="relative w-full">
        <div className="flex flex-col lg:flex-row">
          {/* 
            Desktop: Left 42% narrative column, Right 58% sticky map container
            Mobile: Top sticky 45vh map container, narrative cards below
          */}

          {/* Map Column */}
          <div className="w-full lg:w-[58%] order-1 lg:order-2 sticky top-[45px] lg:top-0 h-[45vh] lg:h-screen z-10 border-b lg:border-b-0 lg:border-l border-neutral-200">
            <ScrollyMap steps={steps} activeStepId={activeStepId} />
          </div>

          {/* Narrative Steps Column */}
          <div className="w-full lg:w-[42%] order-2 lg:order-1 relative z-20 px-4 sm:px-8 lg:px-10 py-12 lg:py-24 space-y-[60vh] lg:space-y-[75vh]">
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => {
                  if (el) stepRefs.current.set(step.id, el);
                }}
                data-step-id={step.id}
                className="step-trigger flex flex-col justify-center min-h-[40vh]"
              >
                <StoryCard
                  step={step}
                  isActive={step.id === activeStepId}
                  stepNumber={index + 1}
                  totalSteps={steps.length}
                  onSelect={handleSelectStep}
                />
              </div>
            ))}

            {/* Ending spacing to allow smooth scroll past the last step */}
            <div className="h-[25vh]" />
          </div>
        </div>
      </section>

      {/* Editorial Methodology & Footer */}
      <footer className="border-t border-neutral-300 bg-neutral-100 py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-6 text-sm text-neutral-600">
          <div className="border-b border-neutral-200 pb-4">
            <h4 className="font-serif font-bold text-base text-neutral-900 mb-2">
              Nota Metodológica y Fuentes
            </h4>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 pt-2 gap-4">
            <div className="flex items-center gap-4">
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
