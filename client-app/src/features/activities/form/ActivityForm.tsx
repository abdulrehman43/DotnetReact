import React, { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectionInput from "../../../app/common/form/MySelectionInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity, ActivityFormValues } from "../../../app/models/Activity";

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

  const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    date: Yup.string().required('Date is required').nullable(),
    description: Yup.string().required(),
    category: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(new ActivityFormValues(activity)));
    }
  }, [id, loadActivity]);


  function hanldeFormSubmit(activity: ActivityFormValues) {
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`));
    }
    else{
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading..." />;

  return (
    <Segment clearing>
      <Header content='Activity Details' sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => hanldeFormSubmit(values)}
      >
        {({ handleSubmit, isValid, dirty, isSubmitting }) => (
          <Form className="ui form" autoComplete="off" onSubmit={handleSubmit}>
            <MyTextInput name='title' placeholder="title" />
            <MyTextArea rows={3} placeholder="Description" name="description" />
            <MySelectionInput options={categoryOptions} placeholder="Category" name="category" />
            <MyDateInput  placeholderText="Date" name="date" 
              showTimeSelect
              timeCaption="time"
              dateFormat='MMMM d, yyyy h:mm aa'
            />
            <Header content='Location Details' sub color="teal" />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button
            disabled={isSubmitting || !isValid || !dirty}
              loading={isSubmitting}
              content="Submit"
              type="submit"
              positive
              floated="right"
            />
            <Button
              as={Link}
              to="/activities"
              content="Cancel"
              type="button"
              floated="right"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
