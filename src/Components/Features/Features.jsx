import React, { useEffect } from 'react';
import './Features.css';
import AOS from 'aos'; 
import 'aos/dist/aos.css';

const Features = () => {
  useEffect(() => {
    AOS.refresh()
  }, []);

  return (
    <section className="features">
      <div className="feature-card" data-aos="fade-up">
        <i className="fas fa-tshirt feature-icon"></i>
        <h3>Cintas para embalaje</h3>
        <p>Encuentra las sintas y tapes para empacar cualquier cosa.</p>
      </div>
      <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
        <i className="fas fa-shoe-prints feature-icon"></i>
        <h3>Cajas para packing</h3>
        <p>Cajas para packing del tamaño que necesitas.</p>
      </div>
      <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
        <i className="fas fa-gift feature-icon"></i>
        <h3>Bolsas para embalaje</h3>
        <p>Encuentra las bolsas de embalaje de mayor calidad.</p>
      </div>
      <div className="feature-card" data-aos="fade-up" data-aos-delay="600">
        <i className="fas fa-truck feature-icon"></i>
        <h3>Envíos Gratis</h3>
        <p>Realizamos envíos rápidos a cualquier parte para que recibas tus productos a tiempo.</p>
      </div>
    </section>
  );
};

export default Features;
