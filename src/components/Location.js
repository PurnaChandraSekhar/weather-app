import React from 'react';
import '../index.css';

const Location = (props) => {
    const {name, country} = props;
    return (
        <>
         <h1 className="location">{name}, {country}.</h1>
        </>
    )
}

export default Location;
