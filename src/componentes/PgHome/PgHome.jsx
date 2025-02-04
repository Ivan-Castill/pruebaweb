import React from 'react'
import ClimaReport from '../ClimaReport/ClimaReport'
import NavBar from '../NavBar/NavBar'
import Calendar from '../calendario/calendario'
import UbicacionUser from '../UbicacionUser/ubicacion'
import CalidadDelAire from '../calidaddelAire/calidaddelAire'
import HoraActual from "../HoraActual/horaActual"
import CompocisionDeAire from '../compocisionDelAire/compocisionDelAire'
import "./PgHome-styles.css"
import RecomendacionesClima from '../recomendacionClima/recomendacionClima'
import RecomendacionesAire from '../recomendacionesAire/recomendacionesAire'
import Footer from '../footer/footer'

const PgHome = () => {
    return (
    <div>
        <section className="ParteSuperior">
            <section className="header" id="header">
            <NavBar/>
            </section>
            <section className="bienvenida">
                <div className="tituloBienvenida">
                    <div className="TextoBienvenida">
                    <h1>LifeBreathe</h1>
                    <p>Una plataforma que te ayuda a monitorear la calidad del aire en tiempo real utilizando tu ubicación. Proporciona recomendaciones dependiendo de tu ubicacion para cuidar tu salud y puedas tomar decisiones sobre tu entorno.</p>
                    </div>
                    <img src="https://media2.giphy.com/media/l43kyjWpfkkrQpyfje/giphy.gif?cid=6c09b9520k3yo8zo6adjgdfoztah4dd1pkfhjzhhpl978ru4&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="gif-animado" />
                </div>
            </section>
            <section className="clima" id="clima">
                <h1><br />Pronostico del día</h1>
                <div className="pronosticos">
                    <div className="pronosticoClima">
                        <ClimaReport/>
                    </div>
                    <div className="pronosticoHora">
                        <HoraActual/>
                    </div> 
                    <div className='PronosticoUbicacion'>
                        <UbicacionUser/>
                    </div>
                    <div className="pronosticoAire">
                        <CalidadDelAire/>
                    </div>
                </div>
            </section>
        </section>
        <section className='recomendaciones' id="recomendaciones">
            <h1><br />Recomendaciones para su Salud</h1>
            <div className='cardrecomendacion'>
            <div className='RecomenClima'>
                <RecomendacionesClima/>
            </div>
            <div className='RecomenAire'>
                <RecomendacionesAire/>
            </div>
            </div>
        </section>
        <section className='compocision' id="compocision">  
            <div className='tituloinformacion'>
                <h1><br />Composición del Aire</h1>
                <p>Aquí podrás conocer los componentes del aire y su impacto en la salud. Además, al seleccionar un punto en el mapa, obtendrás información en tiempo real sobre la calidad del aire en esa ubicación.</p>
            <div className='informacion'><CompocisionDeAire/></div>
            </div>
        </section>
        <section>
            <Footer/>
        </section>
    </div>
    )
}

export default PgHome
