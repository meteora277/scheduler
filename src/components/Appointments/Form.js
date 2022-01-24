import React, { useState } from 'react';
import './styles.scss'
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';


function Form(props) {

  const [student, setStudent] = useState(props.student || '')
  const [interviewer, setInterviewer] = useState(props.interviewer || null )

  const handleChange = function(e) {

    setStudent(e.target.value)

  }

  

  const reset = function() {
    setStudent('')
    setInterviewer(null)
  }

  const cancel = function() {
    reset()
    props.onCancel()
  }

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={handleChange}

          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          interviewer={props.interviewer}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger >Cancel</Button>
          <Button onClick={() => props.onSave(student, interviewer)} confirm >Save</Button>
        </section>
      </section>
    </main>
  )
}
export default Form