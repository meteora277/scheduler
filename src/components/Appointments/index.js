import { useVisualMode } from "hooks/useVisualMode";
import React from "react";

import Form from "./Form";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    transition(SHOW)
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === "SHOW" && props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interviewer}
        />
      ) : null}
      
      {mode === "EMPTY" && <Empty onAdd={() => transition(CREATE)} />}
      {mode === "CREATE" && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          student={props.student}
          onCancel={() => back()}
        />
      )}
    </article>
  );
}
export default Appointment;
