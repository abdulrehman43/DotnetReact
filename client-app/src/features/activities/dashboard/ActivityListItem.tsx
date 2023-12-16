import React, { SyntheticEvent, useState } from 'react';
import { Button, Icon, Item,Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Activity } from '../../../app/models/Activity';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';


interface Props {
    act: Activity
}

export default function ActivityListItem ({act}: Props) {

    const {activityStore} = useStore();
    const {deleteActivity} =activityStore;
    const [target, setTarget] = useState("");
  
    function handleActivityDelete(
      e: SyntheticEvent<HTMLButtonElement>,
      id: string
    ) {
      setTarget(e.currentTarget.name);
      deleteActivity(id);
    }

    return (
      <Segment.Group>
        <Segment>
            <Item.Group>
                <Item>
                    <Item.Image size='tiny' circular src='/assets/user.png' />
                    <Item.Content>
                        <Item.Header as={Link} to={`/activities/${act.id}`}>{act.title}</Item.Header>
                        <Item.Description>Hosted etc</Item.Description>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
        <Segment>
         <span>
          <Icon name='clock' />{format(act.date!, 'dd MMM yyyy h:mm aa')}
          <Icon name='clock' />{act.venue}
         </span>
        </Segment>
        <Segment secondary>
          Attendees go here
        </Segment>
        <Segment clearing>
            <span>{act.description}</span>
            <Button
                as={Link}
                to={`/activities/${act.id}`}
                color='teal'
                floated='right'
                content='View'
            />
        </Segment>
      </Segment.Group>
    )
}