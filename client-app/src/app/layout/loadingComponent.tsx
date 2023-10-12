import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
  content?: string;
  inverter?: boolean;
}

export default function LoadingComponent({
  content = "Loading",
  inverter = true,
}: Props) {
  return (
    <Dimmer active={true}>
      <Loader content={content} />
    </Dimmer>
  );
}
