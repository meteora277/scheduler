import { useVisualMode } from "hooks/useVisualMode";
import React from "react";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"

function Appointment(props) {
  const { mode, setMode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === "SHOW" && props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interviewer}
        />
      ) : null}
      {mode === "EMPTY" && <Empty onAdd={() => console.log("click")}/>}
    </article>
  );
}
export default Appointment;
