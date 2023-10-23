import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/loadingComponent";
import {v4 as uuid} from 'uuid';

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loading,
    loadingInitial,
    loadActivity,
  } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState({
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!));
    }
  }, [id, loadActivity]);

  function handleOnChnage(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  function hanldeSubmit() {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    }
    else{
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading..." />

  return (
    <Segment clearing>
      <Form autoComplete="off" onSubmit={hanldeSubmit}>
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleOnChnage}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleOnChnage}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleOnChnage}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleOnChnage}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleOnChnage}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleOnChnage}
        />
        <Button
          loading={loading}
          content="Submit"
          type="submit"
          positive
          floated="right"
        />
        <Button
          as={Link}
          to='/activities'
          content="Cancel"
          type="button"
          floated="right"
        />
      </Form>
    </Segment>
  );
});
