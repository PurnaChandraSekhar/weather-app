import React from 'react';
import '../index.css';

 const Roju = () => {
     const dateBuilder = (d) => {
         let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
         let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
         let day = days[d.getDay()];
         let date = d.getDate();
         let month = months[d.getMonth()];
         let year = d.getFullYear();

         return `${day}, ${date} ${month} ${year}`;
     }
    return (
        <div className="date">
            {dateBuilder(new Date())}
        </div>
    )
}

export default Roju;
