import React from 'react'
import ClimaActual from '../climaActual/climaActual'

function ClimaReport(){
    return (
        <div style={{ textAlign: "center", fontFamily: "Arial", }}>
            <ClimaActual ciudad="Quito" />
        </div>
    )
}

export default ClimaReport
