import React from 'react'
import ClimaActual from "../climaActual/ClimaActual"

function ClimaReport(){
    return (
        <div style={{ textAlign: "center", fontFamily: "Arial", }}>
            <ClimaActual ciudad="Quito" />
        </div>
    )
}

export default ClimaReport
