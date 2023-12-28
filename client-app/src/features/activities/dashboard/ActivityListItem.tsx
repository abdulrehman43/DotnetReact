import React, { SyntheticEvent, useState } from 'react';
import { Button, Icon, Item,Label,Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Activity } from '../../../app/models/Activity';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ActivityListItemAttendee from './ActivityListItemAttendee';


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
          {
            act.isCancelled && 
            <Label attached='top' color='red' content='Cancelled' style={{textalign: 'center'}} />
          }
            <Item.Group>
                <Item>
                    <Item.Image style={{marginBottom:3}} size='tiny' circular src='/assets/user.png' />
                    <Item.Content>
                        <Item.Header as={Link} to={`/activities/${act.id}`}>{act.title}</Item.Header>
                        <Item.Description>Hosted by {act.host?.displayName}</Item.Description>
                        {act.isHost && (
                          <Item.Description>
                            <Label basic color='orange'>
                              Your are hosting this activity
                            </Label>
                          </Item.Description>
                        )}
                        {act.isGoing && !act.isHost && (
                          <Item.Description>
                          <Label basic color='green'>
                            Your are going to this activity
                          </Label>
                        </Item.Description>
                        )}
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
        <Segment>
         <span>
          <Icon name='clock' />{format(act.date!, 'dd MMM yyyy h:mm aa')}
          <Icon name='marker' />{act.venue}
         </span>
        </Segment>
        <Segment secondary>
          <ActivityListItemAttendee attendees={act.attendees!} />
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