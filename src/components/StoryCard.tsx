"use client";

import React from "react";
import { StoryStep } from "@/types";
import { Clock, MapPin, ChevronRight } from "lucide-react";

interface StoryCardProps {
  step: StoryStep;
  isActive: boolean;
  stepNumber: number;
  totalSteps: number;
  onSelect?: (stepId: number) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  step,
  isActive,
  stepNumber,
  totalSteps,
  onSelect,
}) => {
  return (
    <article
      data-step-id={step.id}
      onClick={() => onSelect && onSelect(step.id)}
      className={`relative w-full cursor-pointer transition-all duration-700 ease-out select-none
        rounded-lg border p-6 md:p-8 backdrop-blur-md
        ${
          isActive
            ? "opacity-100 bg-white/95 border-l-4 border-l-red-700 border-neutral-300 shadow-2xl translate-x-0"
            : "opacity-40 hover:opacity-75 bg-white/70 border-neutral-200 shadow-sm md:translate-x-1"
        }
      `}
      aria-current={isActive ? "step" : undefined}
    >
      {/* Editorial Top Kicker */}
      <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-red-700 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
            Etapa {String(stepNumber).padStart(2, "0")} / {String(totalSteps).padStart(2, "0")}
          </span>
          <span className="text-neutral-300">•</span>
          <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-neutral-700">
            {step.kicker}
          </span>
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-1 text-xs font-mono text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
          <Clock className="w-3 h-3 text-neutral-500" />
          <span>{step.time}</span>
        </div>
      </div>

      {/* Location Bar */}
      <div className="flex items-center gap-1.5 text-xs font-sans font-semibold text-neutral-700 mb-2">
        <MapPin className="w-3.5 h-3.5 text-red-700 shrink-0" />
        <span>{step.locationName}</span>
      </div>

      {/* Main Headline */}
      <h3 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-neutral-900 leading-snug mb-3">
        {step.title}
      </h3>

      {/* Body Copy */}
      <p className="font-sans text-sm md:text-base text-neutral-700 leading-relaxed font-normal">
        {step.text}
      </p>

      {/* Quote Block if present */}
      {step.quote && (
        <blockquote className="mt-4 border-l-2 border-red-700 pl-3 py-1 bg-red-50/40 rounded-r text-xs md:text-sm italic text-neutral-700">
          <p>“{step.quote.text}”</p>
          <cite className="block not-italic text-[11px] font-sans font-semibold text-neutral-500 mt-1 uppercase tracking-wider">
            — {step.quote.author}
          </cite>
        </blockquote>
      )}

      {/* Visual cue to navigate */}
      <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
        <span className="font-mono text-[11px]">
          Coord: {step.mapState.center[1].toFixed(2)}°, {step.mapState.center[0].toFixed(2)}°
        </span>
        <span className="inline-flex items-center gap-1 font-sans text-[11px] font-medium text-neutral-600 group-hover:text-neutral-900">
          {isActive ? "Paso activo" : "Ver en el mapa"}
          <ChevronRight className="w-3 h-3 text-neutral-400" />
        </span>
      </div>
    </article>
  );
};
