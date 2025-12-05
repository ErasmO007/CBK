import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Sección izquierda */}
        <div className="footer-section">
        <h1   className="logo">C<span>Bk</span></h1>
          <p className="footer-text">
            En CBK nos especializamos en ofrecer los mejores prodcutos de embalaje del mercado.
         </p>
        </div>

        {/* Sección del medio */}
        <div className="footer-section">
          <h3 className="footer-heading">COMPAÑÍA</h3>
          <ul className="footer-links">
            <li>Hogar</li>
            <li>Sobre nosotros</li>
            <li>Entrega</li>
            <li>Política de privacidad</li>
          </ul>
        </div>

        {/* Sección derecha */}
        <div className="footer-section">
          <h3 className="footer-heading">CONTÁCTENOS</h3>
          <ul className="footer-links">
            <li>+52-4495434658 Aguascalientes, Mexico, C.A</li>
            <li>cbk@gmail.com</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>

      {/* Línea divisoria y pie inferior */}
      <div className="footer-bottom">
        <hr />
        <p>Copyright 2025© cbk.dev - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;