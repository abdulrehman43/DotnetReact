import React from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/loadingComponent";



export default function ActivityDetails() {

const {activityStore} = useStore();
const {selectedActivity : activity} = activityStore;

if(!activity) return <LoadingComponent />;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          onClick={() => activityStore.openForm(activity.id)}
          content="Edit"
          color="blue"
          basic
        />
        <Button
          onClick={activityStore.cancelSeletedActivity}
          content="Cancel"
          color="grey"
          basic
        />
      </Card.Content>
    </Card>
  );
}
