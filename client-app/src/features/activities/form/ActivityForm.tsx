import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";

interface Props {
  closeForm: () => void;
  activity: Activity | undefined;
  handleCreateEdit : (actvity: Activity) => void;
  submitting: boolean;
}

export default function ActivityForm({
  closeForm,
  activity: selectedActivity,
  handleCreateEdit,
  submitting
  
}: Props) {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: '',
    }
   const [activity, setActivity] = useState(initialState)

    function handleOnChnage(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

  function hanldeSubmit() {
    handleCreateEdit(activity);
    }

  return (
    <Segment clearing>
      <Form autoComplete='off' onSubmit={hanldeSubmit}>
        <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleOnChnage} />
        <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleOnChnage} />
        <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleOnChnage} />
        <Form.Input type='date' placeholder="Date" value={activity.date} name="date" onChange={handleOnChnage} />
        <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleOnChnage} />
        <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleOnChnage} />
        <Button loading={submitting} content="Submit" type="submit" positive floated="right" />
        <Button
          onClick={closeForm}
          content="Cancel"
          type="button"
          floated="right"
        />
      </Form>
    </Segment>
  );
}
