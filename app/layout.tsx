import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "./animations.css";
import "./responsive-fixes.css";
import "./carousel.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
const analyticsId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "TechPaws | Reparación de PC y notebooks",
  description: "Servicio técnico de PC y notebooks en Buenos Aires. Diagnóstico sin cargo, atención a domicilio y remota, presupuesto sin compromiso y garantía por escrito.",
  alternates: { canonical: "/" },
  keywords: ["reparación de PC", "servicio técnico PC", "reparación de notebooks", "soporte técnico remoto", "TechPaws", "Buenos Aires"],
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  openGraph: {
    title: "TechPaws | Servicio técnico de PC y notebooks",
    description: "Reparación, mantenimiento y optimización con diagnóstico sin cargo y garantía por escrito.",
    url: "/",
    siteName: "TechPaws Microinformática",
    locale: "es_AR",
    type: "website",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

const businessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TechPaws Microinformática",
  url: siteUrl,
  email: "pawstech5@gmail.com",
  telephone: "+54 11 3819-1431",
  areaServed: "Buenos Aires",
  description: "Servicio técnico de PCs y notebooks, a domicilio y remoto.",
  paymentAccepted: "Efectivo, transferencia y Mercado Pago",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}
    <Script id="techpaws-business-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }} />
    {analyticsId && <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${analyticsId}');` }} />
    </>}
  </body></html>;
}
