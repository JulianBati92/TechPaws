import type { Metadata } from "next";
import "./globals.css";
import "./animations.css";
import "./responsive-fixes.css";
import "./carousel.css";

export const metadata: Metadata = {
  title: "TechPaws | Reparación de PC y notebooks",
  description: "Servicio técnico de PC y notebooks. Diagnóstico sin cargo, atención a domicilio y remota, garantía por escrito.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
