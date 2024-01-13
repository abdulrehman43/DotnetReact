import { observer } from 'mobx-react-lite';
import React from 'react';
import { Profile } from '../../app/models/profile';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface Props {
    profile: Profile;
}

export default observer(function ProfileCard({profile}: Props) {
    return (
        <Card className="ui fluid card" as={Link} to={`/profiles/${profile.username}`}>
            <Image size='small' src={profile.image || 'assets/user.png'} />
            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Header>Bio goes here</Card.Header>
            </Card.Content>
            <Card.Content>
                <Icon name='user' />20 followers
            </Card.Content>
        </Card>
    )
})