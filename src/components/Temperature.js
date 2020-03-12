import React from 'react';
import '../index.css';

 const Temperature = (props) => {
     const {temp} = props;
    return (
        <div className="temperature">
            <h1>{Math.round(temp.main.temp)}&deg;c</h1>
            <h4 className="type">{temp.weather[0].main}</h4>
        </div>
    )
}

export default Temperature;
