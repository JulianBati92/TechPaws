import ContactForm from "./components/ContactForm";
import CinematicScene from "./components/CinematicScene";

const services = [
  ["01", "Reparación integral", "PCs y notebooks", "Diagnóstico y solución de fallas de hardware y software, explicadas con claridad."],
  ["02", "Rendimiento", "Optimización y mantenimiento", "Limpieza, puesta a punto y mejoras para recuperar velocidad, estabilidad y vida útil."],
  ["03", "Sistema", "Windows y programas", "Instalación de sistema operativo, controladores y aplicaciones esenciales listas para usar."],
  ["04", "Protección", "Virus y amenazas", "Limpieza profunda, protección de información y recomendaciones para evitar nuevos problemas."],
  ["05", "Evolución", "Actualización de componentes", "Memoria, discos SSD y mejoras elegidas según el equipo, el uso y el presupuesto."],
  ["06", "Resguardo", "Recuperación de datos", "Rescate de archivos, copias de seguridad y migración segura entre dispositivos."],
];

const benefits = [
  ["01", "Diagnóstico sin cargo", "Primero entendemos el problema. Después te explicamos qué conviene hacer."],
  ["02", "Presupuesto claro", "Decidís con toda la información y sin compromiso de reparación."],
  ["03", "Garantía por escrito", "El trabajo realizado queda documentado para tu tranquilidad."],
  ["04", "Atención flexible", "Servicio a domicilio y asistencia remota según cada necesidad."],
];

function Paw() { return <span className="cin-paw" aria-hidden="true"><i /><i /><i /><i /><b /></span>; }

export default function Home() {
  return <main className="cin-home">
    <CinematicScene />
    <header className="cin-nav">
      <a className="cin-brand" href="#inicio"><img src="/logo-techpaws.png" alt="" /><span><b>TECHPAWS</b><small>MICROINFORMÁTICA</small></span></a>
      <nav aria-label="Navegación principal"><a href="#servicios">Servicios</a><a href="#metodo">Método</a><a href="#precursores">Nosotros</a><a href="/seguimiento">Mi orden</a></nav>
      <a className="cin-nav-cta" href="#contacto">Pedir diagnóstico <span>↗</span></a>
    </header>

    <section className="cin-hero" id="inicio" data-chapter="00">
      <div className="cin-hero-shade" />
      <div className="cin-hero-visual" aria-hidden="true"><img src="/techpaws-hero.png" alt="" /><div className="cin-scan" /></div>
      <div className="cin-hero-copy" data-reveal>
        <p className="cin-eyebrow"><i /> SOPORTE TÉCNICO · BUENOS AIRES</p>
        <h1><span>Tu equipo.</span><span>Como nuevo.</span></h1>
        <p>Reparamos, optimizamos y cuidamos tu PC o notebook con diagnóstico claro, atención personal y garantía real.</p>
        <div className="cin-actions"><a href="https://wa.me/541138191431?text=Hola%20TechPaws%2C%20quiero%20solicitar%20un%20diagn%C3%B3stico" target="_blank" rel="noreferrer">Iniciar diagnóstico <span>↗</span></a><a href="#servicios">Explorar servicios <span>↓</span></a></div>
      </div>
      <div className="cin-hero-bottom">
        <p>DESPLAZÁ PARA EXPLORAR <i /></p>
        <div className="cin-chapter-links"><a href="#servicios"><b>01</b><span>Detectar<small>Encontramos la falla</small></span></a><a href="#metodo"><b>02</b><span>Resolver<small>Trabajamos sin vueltas</small></span></a><a href="#precursores"><b>03</b><span>Acompañar<small>Cuidamos tu equipo</small></span></a><a href="#contacto"><b>04</b><span>Conectar<small>Empezá tu consulta</small></span></a></div>
      </div>
    </section>

    <section className="cin-chapter cin-services" id="servicios" data-chapter="01">
      <div className="cin-section-intro" data-reveal><div><p className="cin-eyebrow">01 · DETECTAR</p><h2>Todo empieza<br />por entender.</h2></div><p>No reemplazamos piezas por intuición. Evaluamos el equipo, identificamos la causa y te contamos qué encontramos antes de avanzar.</p></div>
      <div className="cin-services-grid">
        {services.map(([number, eyebrow, title, text]) => <article key={number} data-reveal><span className="cin-service-number">{number}</span><div className="cin-service-node"><Paw /></div><p>{eyebrow}</p><h3>{title}</h3><small>{text}</small><a href="#contacto">Consultar <span>↗</span></a></article>)}
      </div>
    </section>

    <section className="cin-chapter cin-method" id="metodo" data-chapter="02">
      <div className="cin-method-media" data-reveal><img src="/reparacion-transparent.png" alt="Los precursores de TechPaws trabajando en una computadora" /><div className="cin-media-meta"><span>TP / DIAGNÓSTICO</span><b>SISTEMA ACTIVO</b></div></div>
      <div className="cin-method-copy" data-reveal><p className="cin-eyebrow">02 · RESOLVER</p><h2>Servicio técnico<br /><em>sin vueltas.</em></h2><p>Tu tiempo y tu información importan. Cada etapa es visible: desde el ingreso hasta la entrega.</p><div className="cin-benefit-list">{benefits.map(([number, title, text]) => <article key={number}><b>{number}</b><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div>
    </section>

    <section className="cin-chapter cin-about" id="precursores" data-chapter="03">
      <div className="cin-about-copy" data-reveal><p className="cin-eyebrow">03 · ACOMPAÑAR</p><h2>Cinco precursores.<br />Una forma de trabajar.</h2><p>TechPaws nació para ofrecer un servicio responsable, cercano y comprensible. Su identidad está inspirada en quienes acompañaron el comienzo de este proyecto.</p><div className="cin-values"><span>Paciencia</span><span>Lealtad</span><span>Curiosidad</span><span>Energía</span><span>Dedicación</span></div><p className="cin-about-note">No solamente reparamos un equipo: explicamos qué tenía, qué hicimos y cómo cuidarlo mejor.</p></div>
      <div className="cin-about-media" data-reveal><div className="cin-orbit" /><img src="/precursores-transparentes.png" alt="Los cinco precursores de TechPaws" /><div className="cin-about-label"><Paw /><span>IDENTIDAD TECHPAWS<br /><small>DESDE EL PRIMER DÍA</small></span></div></div>
    </section>

    <section className="cin-chapter cin-contact" id="contacto" data-chapter="04">
      <div className="cin-contact-copy" data-reveal><p className="cin-eyebrow">04 · CONECTAR</p><h2>Contanos qué<br />le pasa a tu equipo.</h2><p>Coordinamos un diagnóstico sin cargo y sin compromiso. También podés escribirnos directamente por WhatsApp.</p><div className="cin-contact-data"><a href="https://wa.me/541138191431?text=Hola%20TechPaws%2C%20necesito%20ayuda%20con%20mi%20equipo" target="_blank" rel="noreferrer"><span>WHATSAPP</span><b>+54 11 3819-1431</b></a><a href="mailto:pawstech5@gmail.com"><span>EMAIL</span><b>pawstech5@gmail.com</b></a><div><span>MODALIDAD</span><b>A domicilio · Remoto</b></div><div><span>MEDIOS DE PAGO</span><b>Efectivo · Transferencia · Mercado Pago</b></div></div></div>
      <div data-reveal><ContactForm /></div>
    </section>

    <footer className="cin-footer"><a className="cin-brand" href="#inicio"><img src="/logo-techpaws.png" alt="" /><span><b>TECHPAWS</b><small>MICROINFORMÁTICA</small></span></a><p>TECNOLOGÍA QUE VUELVE A ACOMPAÑARTE.</p><div><a href="/seguimiento">Seguir mi orden</a><a href="https://wa.me/541138191431">WhatsApp</a><a href="mailto:pawstech5@gmail.com">Email</a></div><small>© 2026 TECHPAWS · BUENOS AIRES</small></footer>
    <a className="cin-floating" href="https://wa.me/541138191431?text=Hola%20TechPaws%2C%20necesito%20ayuda" target="_blank" rel="noreferrer" aria-label="Contactar a TechPaws por WhatsApp"><Paw /></a>
  </main>;
}
