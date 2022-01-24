import { useVisualMode } from "hooks/useVisualMode";
import React from "react";

import Form from "./Form";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import "./styles.scss";
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"

function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(err => console.log(err))
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
      {mode === "SAVING" && <Status message="Saving"/>}
    </article>
  );
}
export default Appointment;
