import { useVisualMode } from "hooks/useVisualMode";
import React from "react";

import Form from "./Form";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import "./styles.scss";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE"

function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((err) => {
        console.log(err);
        transition(ERROR_SAVE, true);
      });
  }

  function cancelInterview(id) {
    transition(DELETING, true);
    props
      .cancelInterview(id)
      .then(() => transition("EMPTY"))
      .catch((err) => {
        console.log(err);
        transition(ERROR_DELETE, true)

      });
  }

  function confirm() {
    transition(CONFIRM);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === "SHOW" && props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interviewer}
          onDelete={() => confirm()}
          onEdit={() => transition(EDIT)}
        />
      ) : null}
      {mode === "EMPTY" && <Empty onAdd={() => transition(CREATE)} />}
      {mode === "CREATE" && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === "EDIT" && (
        <Form
          student={props.student}
          interviewers={props.interviewers}
          interviewer={props.interviewer.id}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === "DELETING" && <Status message="Deleting" />}
      {mode === "SAVING" && <Status message="Saving" />}
      {mode === "CONFIRM" && (
        <Confirm
          message="Are you sure you want to delete?"
          onConfirm={() => {
            cancelInterview(props.id);
          }}
          onCancel={back}
        />
      )}
      {mode === "ERROR_SAVE" && (
        <Error message="We could not save appointment" onClose={back} />
      )}
      {mode === "ERROR_DELETE" && (
        <Error message="We could not delete your appointment" onClose={back}/>
      )}
    </article>
  );
}
export default Appointment;
