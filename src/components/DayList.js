import React from 'react';
import DayListItem from './DayListItem';

function DayList(props) {

  let daysArray = props.days.map(day => {
    return <DayListItem 
      key={day.id} 
      name={day.name} 
      spots={day.spots}
      setDay={(day) => props.setDay(day)}
      selected={day.name === props.day}
      />
  })

  return (
    <>
      {daysArray}
    </>
  )
}
export default DayList