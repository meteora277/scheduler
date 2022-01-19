import React from 'react';

function Appointment({time}) {
  return(
    <article className='appointment'>{time ? 
      `Appointment at ${time}`
      : 
      'No appointments' 
    }
    </article>
  )
}
export default Appointment