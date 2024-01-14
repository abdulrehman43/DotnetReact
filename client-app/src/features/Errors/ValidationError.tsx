import React from 'react';
import { Message } from 'semantic-ui-react';

interface Props {
    errors: any;
}

export default function ValidationError({errors}: Props){
    return(
        <Message error>
            {Array.isArray(errors) && errors.length > 0 && (
                <Message.List>
                    {errors.map((err: any, i: any) => (
                        <Message.Item key={i}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}
