import React from 'react'

function DateTime() {
    const date = new Date();
    const hours = date.getHours();
    const time = date.getHours() + ":" + date.getMinutes()
    let timeOfDay;

     if (hours < 12) {
         timeOfDay = "morning";
     } else if (hours >= 12 && hours < 17) {
         timeOfDay = "afternoon";
     } else {
         timeOfDay = "night";
     }
     
     return(
         <div>
             <h1 className="text-light display-3">{time}</h1>
             <h2 className="text-light display-3">Good {timeOfDay}!</h2>
         </div>
     )
}

export default DateTime