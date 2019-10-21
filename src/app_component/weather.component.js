import React from 'react'

function Weather(props) {
    return(
        <div className="container text-light">
            <div className="cards pt-5">
                <h1>{props.city}</h1>
                <h5 className="py-4">
                <i class={props.weatherIcon}></i>
                </h5>
                {props.tempCelsius ? <h1 className="py-2">{props.tempCelsius}&deg;</h1> : null}
                {minmaxTemp(props.tempMin, props.tempMax)}
                <h4 className="py-3">{props.description}</h4>
            </div>
        </div>
    )
}

function minmaxTemp(min, max) {
    if(min && max) {
        return(
            <h3>
                <span className="px-4">{min}&deg;</span>
                <span className="px-4">{max}&deg;</span>
            </h3>
        )
    }
}
export default Weather