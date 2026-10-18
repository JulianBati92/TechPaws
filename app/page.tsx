import ContactForm from "./components/ContactForm";
import CinematicScene from "./components/CinematicScene";
import MobileMenu from "./components/MobileMenu";

const services = [
  { number: "01", eyebrow: "Reparación integral", title: "PCs y notebooks", text: "Diagnóstico y solución de fallas de hardware y software, explicadas con claridad.", image: "/servicio-pc-notebook.png" },
  { number: "02", eyebrow: "Rendimiento", title: "Optimización y mantenimiento", text: "Limpieza, puesta a punto y mejoras para recuperar velocidad, estabilidad y vida útil.", image: "/servicio-optimizacion.png" },
  { number: "03", eyebrow: "Sistema", title: "Windows y programas", text: "Instalación de sistema operativo, controladores y aplicaciones esenciales listas para usar.", image: "/servicio-windows.png" },
  { number: "04", eyebrow: "Protección", title: "Virus y amenazas", text: "Limpieza profunda, protección de información y recomendaciones para evitar nuevos problemas.", image: "/servicio-seguridad.png" },
  { number: "05", eyebrow: "Evolución", title: "Actualización de componentes", text: "Memoria, discos SSD y mejoras elegidas según el equipo, el uso y el presupuesto.", image: "/servicio-componentes.png" },
  { number: "06", eyebrow: "Resguardo", title: "Recuperación de datos", text: "Rescate de archivos, copias de seguridad y migración segura entre dispositivos.", image: "/servicio-recuperacion.png" },
];

const benefits = [
  ["01", "Diagnóstico sin cargo", "Primero entendemos el problema. Después te explicamos qué conviene hacer."],
  ["02", "Presupuesto claro", "Decidís con toda la información y sin compromiso de reparación."],
  ["03", "Garantía por escrito", "El trabajo realizado queda documentado para tu tranquilidad."],
  ["04", "Atención flexible", "Servicio a domicilio y asistencia remota según cada necesidad."],
];

function Paw() { return <span className="cin-paw" aria-hidden="true"><i /><i /><i /><i /><b /></span>; }

export default function Home() {
  return <main className="void-home">
    <CinematicScene />
    <header className="void-nav">
      <a className="void-brand" href="#inicio" aria-label="TechPaws, volver al inicio"><img src="/logo-techpaws.png" alt="" /><span>TechPaws<small>Microinformática</small></span></a>
      <nav aria-label="Navegación principal"><a href="#servicios">Servicios</a><a href="#metodo">Método</a><a href="#precursores">Nosotros</a><a href="/seguimiento">Mi orden</a></nav>
      <a className="void-button void-nav-cta" href="#contacto">Pedir diagnóstico</a><MobileMenu />
    </header>

    <section className="void-hero" id="inicio" data-chapter="00">
      <div className="void-wrap void-hero-grid">
        <div className="void-hero-copy" data-reveal><p className="void-kicker">Soporte técnico · Buenos Aires</p><h1>Tu equipo. <em>Como nuevo.</em></h1><p className="void-lead">Reparamos, optimizamos y cuidamos tu PC o notebook con un diagnóstico claro, atención personal y garantía real.</p><div className="void-actions"><a className="void-button" href="https://wa.me/541138191431?text=Hola%20TechPaws%2C%20quiero%20solicitar%20un%20diagn%C3%B3stico" target="_blank" rel="noreferrer">Iniciar diagnóstico <span>↗</span></a><a className="void-link" href="#servicios">Explorar servicios <span>↓</span></a></div></div>
        <figure className="void-hero-art" data-reveal><img src="/techpaws-hero.png" alt="Computadora de alto rendimiento junto a la mascota de TechPaws" /><figcaption><span>Diagnóstico preciso</span><b>Atención cercana</b></figcaption></figure>
      </div>
      <div className="void-wrap void-steps" aria-label="Proceso TechPaws"><a href="#servicios"><b>01</b><span>Detectar<small>Encontramos la falla</small></span></a><a href="#metodo"><b>02</b><span>Resolver<small>Trabajamos sin vueltas</small></span></a><a href="#precursores"><b>03</b><span>Acompañar<small>Cuidamos tu equipo</small></span></a><a href="#contacto"><b>04</b><span>Conectar<small>Empezá tu consulta</small></span></a></div>
    </section>

    <section className="void-section void-services" id="servicios" data-chapter="01"><div className="void-wrap">
      <div className="void-heading" data-reveal><div><p className="void-kicker">01 · Detectar</p><h2>Todo empieza<br />por entender.</h2></div><p>No reemplazamos piezas por intuición. Evaluamos el equipo, identificamos la causa y te contamos qué encontramos antes de avanzar.</p></div>
      <div className="void-service-list">{services.map((service) => <article key={service.number} data-reveal><div className="void-service-image"><img src={service.image} alt="" loading="lazy" /><span>{service.number}</span></div><div className="void-service-copy"><p className="void-kicker">{service.eyebrow}</p><h3>{service.title}</h3><p>{service.text}</p><a className="void-link" href="#contacto">Consultar <span>↗</span></a></div></article>)}</div>
    </div></section>

    <section className="void-section void-method" id="metodo" data-chapter="02"><div className="void-wrap void-split">
      <figure className="void-cutout" data-reveal><img src="/reparacion-transparent.png" alt="Los precursores de TechPaws trabajando en una computadora" /><figcaption>Equipo TechPaws · Sistema activo</figcaption></figure>
      <div className="void-method-copy" data-reveal><p className="void-kicker">02 · Resolver</p><h2>Servicio técnico<br /><em>sin vueltas.</em></h2><p className="void-lead">Tu tiempo y tu información importan. Cada etapa es visible: desde el ingreso hasta la entrega.</p><div className="void-benefits">{benefits.map(([number, title, text]) => <article key={number}><b>{number}</b><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div>
    </div></section>

    <section className="void-section void-about" id="precursores" data-chapter="03"><div className="void-wrap void-split">
      <div className="void-about-copy" data-reveal><p className="void-kicker">03 · Acompañar</p><h2>Cinco precursores.<br />Una forma de trabajar.</h2><p className="void-lead">TechPaws nació para ofrecer un servicio responsable, cercano y comprensible. Su identidad está inspirada en quienes acompañaron el comienzo de este proyecto.</p><div className="void-values"><span>Paciencia</span><span>Lealtad</span><span>Curiosidad</span><span>Energía</span><span>Dedicación</span></div><blockquote>No solamente reparamos un equipo: explicamos qué tenía, qué hicimos y cómo cuidarlo mejor.</blockquote></div>
      <figure className="void-cutout" data-reveal><img src="/precursores-transparentes.png" alt="Los cinco precursores de TechPaws" /><figcaption>Identidad TechPaws · Desde el primer día</figcaption></figure>
    </div></section>

    <section className="void-section void-contact" id="contacto" data-chapter="04"><div className="void-wrap void-contact-grid">
      <div className="void-contact-copy" data-reveal><p className="void-kicker">04 · Conectar</p><h2>Contanos qué le pasa a tu equipo.</h2><p className="void-lead">Coordinamos un diagnóstico sin cargo y sin compromiso. También podés escribirnos directamente por WhatsApp.</p><div className="void-contact-data"><a href="https://wa.me/541138191431" target="_blank" rel="noreferrer"><span>WhatsApp</span><b>+54 11 3819-1431</b></a><a href="mailto:pawstech5@gmail.com"><span>Email</span><b>pawstech5@gmail.com</b></a><div><span>Modalidad</span><b>A domicilio · Remoto</b></div><div><span>Medios de pago</span><b>Efectivo · Transferencia · Mercado Pago</b></div></div></div>
      <div className="void-form" data-reveal><ContactForm /></div>
    </div></section>

    <footer className="void-footer"><div className="void-wrap"><a className="void-brand" href="#inicio"><img src="/logo-techpaws.png" alt="" /><span>TechPaws<small>Microinformática</small></span></a><p>Tecnología que vuelve a acompañarte.</p><nav><a href="/seguimiento">Seguir mi orden</a><a href="https://wa.me/541138191431">WhatsApp</a><a href="mailto:pawstech5@gmail.com">Email</a></nav><small>© 2026 TechPaws · Buenos Aires</small></div></footer>
    <a className="void-floating" href="https://wa.me/541138191431?text=Hola%20TechPaws%2C%20necesito%20ayuda" target="_blank" rel="noreferrer" aria-label="Contactar a TechPaws por WhatsApp"><Paw /></a>
  </main>;
}
