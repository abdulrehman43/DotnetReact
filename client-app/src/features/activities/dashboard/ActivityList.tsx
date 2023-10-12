import React, { SyntheticEvent, useState } from "react";
import { Activity } from "../../../app/models/Activity";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
  submitting: boolean;
}

export default function ActivityList({
  activities,
  selectActivity,
  handleDeleteActivity,
  submitting,
}: Props) {
  const [target, setTarget] = useState("");

  function handleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    handleDeleteActivity(id);
  }
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((act) => (
          <Item key={act.id}>
            <Item.Content>
              <Item.Header as="a">{act.title}</Item.Header>
              <Item.Meta>{act.date}</Item.Meta>
              <Item.Description>
                <div>{act.description}</div>
                <div>
                  {act.city} , {act.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  content="View"
                  color="blue"
                  floated="right"
                  onClick={() => selectActivity(act.id)}
                />
                <Button
                  name={act.id}
                  loading={submitting && target === act.id}
                  onClick={(e) => handleActivityDelete(e, act.id)}
                  content="Delete"
                  color="red"
                  floated="right"
                />
                <Label basic content={act.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
