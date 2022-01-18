import React from "react";
import "./DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {

  function formatSpots(num){
    if (num === 0) {
      return 'no spots remaining'
    } else if (num === 1) {
      return '1 spot remaining'
    } else {
      return `${num} spots remaining`
    }
  }

  return (
    <li
      className={classNames("day-list__item", {
        "day-list__item--selected": props.selected,
        "day-list__item--full": props.spots === 0
      })}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
