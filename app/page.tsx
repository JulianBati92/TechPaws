import ContactForm from "./components/ContactForm";
import MotionEffects from "./components/MotionEffects";
import HeroCarousel from "./components/HeroCarousel";

const services = [
  { n: "01", title: "Reparación de PC y notebooks", text: "Diagnóstico y solución de fallas de hardware y software, con explicación clara del trabajo." },
  { n: "02", title: "Optimización y mantenimiento", text: "Limpieza, puesta a punto y mejoras para que tu equipo vuelva a responder como esperás." },
  { n: "03", title: "Instalación de Windows y programas", text: "Sistema operativo, drivers y aplicaciones esenciales listos para usar." },
  { n: "04", title: "Eliminación de virus", text: "Detección de amenazas, limpieza profunda y recomendaciones para proteger tu información." },
  { n: "05", title: "Actualización de componentes", text: "Memoria, discos SSD y otros upgrades elegidos según tu equipo y presupuesto." },
  { n: "06", title: "Recuperación y respaldo de datos", text: "Rescate de archivos, copias de seguridad y migración de información entre equipos." },
];

const benefits = [
  ["Diagnóstico", "sin cargo"],
  ["Garantía", "por escrito"],
  ["Presupuesto", "sin compromiso"],
  ["Atención", "a domicilio"],
];

function PawMark() {
  return <span className="paw" aria-hidden="true"><i /><i /><i /><i /><b /></span>;
}

function BrandIcon() { return <span className="brand-mascot" aria-hidden="true"><img src="/logo-techpaws.png" alt="" /></span>; }

export default function Home() {
  return (
    <main><MotionEffects />
      <header className="nav-shell">
        <a className="brand" href="#inicio" aria-label="TechPaws, inicio"><BrandIcon /><span>TECH<em>PAWS</em></span></a>
        <nav aria-label="Navegación principal">
          <a href="#servicios">Servicios</a><a href="#beneficios">Beneficios</a><a href="#nosotros">Nosotros</a><a href="#contacto">Contacto</a>
        </nav>
        <a className="nav-cta" href="https://wa.me/541138191431?text=Hola%20TechPaws%2C%20necesito%20ayuda%20con%20mi%20equipo" target="_blank" rel="noreferrer">Pedir diagnóstico <span>↗</span></a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> SOPORTE TÉCNICO · BUENOS AIRES</p>
          <h1>Tu equipo.<br />Como <span>nuevo.</span></h1>
          <p className="lead">Reparamos, optimizamos y cuidamos tu PC o notebook. Atención personal, soluciones claras y garantía real.</p>
          <div className="hero-actions">
            <a className="button primary" href="https://wa.me/541138191431?text=Hola%20TechPaws%2C%20quiero%20solicitar%20un%20diagn%C3%B3stico" target="_blank" rel="noreferrer">Hablar por WhatsApp <span>↗</span></a>
            <a className="text-link" href="#servicios">Ver servicios <span>↓</span></a>
          </div>
        </div>
        <div className="hero-art"><HeroCarousel /></div>
        <div className="hero-foot"><span>DOMICILIO</span><span>REMOTO</span><span>GARANTÍA ESCRITA</span></div>
      </section>

      <section className="section services" id="servicios">
        <div className="section-head"><div><p className="kicker">/ 01 SERVICIOS</p><h2>Todo lo que tu<br />equipo necesita.</h2></div><p>Soluciones para trabajar, estudiar y disfrutar sin interrupciones. Evaluamos cada caso antes de recomendarte qué hacer.</p></div>
        <div className="service-grid">
          {services.map((service) => <article className="service-card" key={service.n}><span>{service.n}</span><div className="service-icon" aria-hidden="true">+</div><h3>{service.title}</h3><p>{service.text}</p><a href="#contacto" aria-label={`Consultar por ${service.title}`}>Consultar <b>↗</b></a></article>)}
        </div>
      </section>

      <section className="benefits" id="beneficios">
        <p className="kicker">/ 02 ¿POR QUÉ TECHPAWS?</p>
        <div className="benefit-intro"><h2>Servicio técnico<br /><span>sin vueltas.</span></h2><p>Tu tiempo y tu información importan. Por eso trabajamos con transparencia en cada etapa, desde el primer diagnóstico hasta la entrega.</p></div>
        <div className="benefit-grid">{benefits.map(([a,b], i) => <div key={a}><span>0{i+1}</span><PawMark /><h3>{a}<br /><em>{b}</em></h3></div>)}</div>
      </section>

      <section className="about section" id="nosotros">
        <div className="about-card"><div className="about-mark"><img src="/carousel-identidad.png" alt="Los cinco precursores de TechPaws" /></div><div><p className="kicker">/ 03 SOBRE TECHPAWS</p><h2>Tecnología que vuelve a acompañarte.</h2><p>TechPaws es mi proyecto de servicio técnico para PCs y notebooks. Nació para ofrecer soluciones claras, responsables y cercanas: no solamente reparar un equipo, sino también explicar qué problema tenía, qué trabajo se realizó y cómo cuidarlo mejor.</p><p>Su identidad está inspirada en quienes acompañaron el comienzo de este proyecto: nuestros cinco precursores. Ellos representan la paciencia, la lealtad, la curiosidad, la energía y la dedicación que quiero transmitir en cada trabajo.</p><div className="precursor-values"><span>Paciencia</span><span>Lealtad</span><span>Curiosidad</span><span>Energía</span><span>Dedicación</span></div><div className="modes"><span><b>⌂</b> Atención a domicilio</span><span><b>⌁</b> Servicio remoto</span></div></div></div>
      </section>

      <section className="contact section" id="contacto">
        <div className="contact-info"><p className="kicker">/ 04 CONTACTO</p><h2>Contanos qué<br />le pasa a tu equipo.</h2><p>Respondemos tu consulta y coordinamos el diagnóstico. Sin cargo y sin compromiso.</p>
          <div className="contact-list">
            <a href="https://wa.me/541138191431" target="_blank" rel="noreferrer"><span>WHATSAPP</span><strong>+54 11 3819-1431</strong></a>
            <a href="mailto:pawstech5@gmail.com"><span>EMAIL</span><strong>pawstech5@gmail.com</strong></a>
            <div><span>MODALIDAD</span><strong>A domicilio · Remoto</strong></div>
          </div>
          <div className="payments"><span>MEDIOS DE PAGO</span><p>Efectivo&nbsp;&nbsp;·&nbsp;&nbsp; Transferencia&nbsp;&nbsp;·&nbsp;&nbsp; Mercado Pago</p></div>
        </div>
        <ContactForm />
      </section>

      <footer><a className="brand" href="#inicio"><BrandIcon /><span>TECH<em>PAWS</em></span></a><p>Servicio técnico de PC y notebooks.</p><div><a href="https://wa.me/541138191431">WhatsApp</a><a href="mailto:pawstech5@gmail.com">Email</a><a href="#inicio">Volver arriba ↑</a></div><small>© 2026 TECHPAWS · TODOS LOS DERECHOS RESERVADOS</small></footer>
      <a className="floating-wa" href="https://wa.me/541138191431?text=Hola%20TechPaws%2C%20necesito%20ayuda" target="_blank" rel="noreferrer" aria-label="Contactar a TechPaws por WhatsApp">✦</a>
    </main>
  );
}
