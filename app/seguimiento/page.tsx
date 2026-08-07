import TrackingForm from "./TrackingForm";

export const metadata = {
  title: "Seguimiento de orden | TechPaws",
  description: "Consultá el estado de tu equipo en TechPaws.",
  robots: { index: false, follow: false },
};

export default function Seguimiento() {
  return <main className="tracking-page">
    <header className="tracking-nav"><a href="/" className="tracking-brand">TECH<span>PAWS</span></a><a href="/">Volver al inicio</a></header>
    <section className="tracking-hero">
      <div className="tracking-copy">
        <p className="admin-kicker">SEGUIMIENTO DE ORDEN</p>
        <h1>¿Cómo está<br />tu equipo?</h1>
        <p className="tracking-lead">Acá podés consultar el avance de tu reparación y leer la última novedad enviada por TechPaws.</p>
        <div className="tracking-instructions" aria-label="Cómo consultar una orden">
          <article><span>01</span><div><strong>Buscá el mensaje de TechPaws</strong><p>Ahí vas a encontrar tu número de orden y el código de acceso de seis dígitos.</p></div></article>
          <article><span>02</span><div><strong>Ingresá los dos datos</strong><p>Escribilos en el formulario exactamente como aparecen en el mensaje y presioná “Ver estado”.</p></div></article>
          <article><span>03</span><div><strong>¿Olvidaste el número?</strong><p>Elegí la pestaña “Olvidé mi número” y usá tu nombre completo más los últimos cuatro dígitos de tu WhatsApp.</p></div></article>
        </div>
      </div>
      <TrackingForm />
    </section>
    <footer className="tracking-footer tracking-help-footer"><div><strong>¿No encontrás el número o el código?</strong><span>Escribinos y te reenviamos los datos de acceso después de verificar tu identidad.</span></div><a href="https://wa.me/541138191431?text=Hola%20TechPaws%2C%20no%20encuentro%20los%20datos%20para%20consultar%20el%20seguimiento%20de%20mi%20equipo.%20%C2%BFMe%20los%20pueden%20reenviar%3F" target="_blank" rel="noreferrer">Pedir datos por WhatsApp ↗</a></footer>
  </main>;
}
