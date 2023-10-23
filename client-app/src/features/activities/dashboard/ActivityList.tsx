import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export default observer(function ActivityList() {
  const {activityStore} = useStore();
  const {deleteActivity, loading, activitiesByDate} =activityStore;
  const [target, setTarget] = useState("");

  function handleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }
  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map((act) => (
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
                  as={Link} to={`/activities/${act.id}`}
                />
                <Button
                  name={act.id}
                  loading={loading && target === act.id}
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
})
