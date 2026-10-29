import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Fuga de Flávio Bolsonaro: De Brasilia a Miami | Especial Interactivo",
  description:
    "Especial de periodismo de datos y scrollytelling cartográfico que reconstruye paso a paso la salida del senador Flávio Bolsonaro desde Brasilia hacia Miami, pasando por Foz de Iguazú, el cruce a Argentina, y el vuelo con escala en Guayaquil.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css"
        />
      </head>
      <body className="antialiased min-h-screen selection:bg-red-100 selection:text-red-900">
        {children}
      </body>
    </html>
  );
}
