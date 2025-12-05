import "./Hero.css";
import hero from "../../assets/hero.png";
import { Link } from "react-router-dom";
import 'aos/dist/aos.css';
import { useEffect } from "react";
import AOS from 'aos';

const Hero = () => {
    
    useEffect(() => {
        AOS.refresh();
    }, []);

    return (
        <section className="hero">
            <div className="content" data-aos="fade-up">
                <p className="discount" data-aos="fade-right">50% DE DESCUENTO EN TODO</p>
                <h1 data-aos="fade-left">Cinta para embalaje</h1>
                <p className="shipping" data-aos="fade-up">
                    Ofrecemos envío gratis en todos los pedidos superiores a <strong>$350</strong>.
                </p>
                <Link className="btn" to="/women" data-aos="zoom-in">Ver Productos</Link>
            </div>
            <div className="image-container" data-aos="fade-up">
                <img src={hero} alt="Hero" />
            </div>
        </section>
    );
};

export default Hero;
