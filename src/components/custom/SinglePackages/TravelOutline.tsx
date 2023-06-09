import { Card } from "@mantine/core";
import React from "react";

const TravelOutline: React.FC<{ description: string }> = ({ description }) => {
  return (
    <Card px={{ xs: "sm", sm: "lg" }} radius="md" shadow="lg">
      <div dangerouslySetInnerHTML={{ __html: description }}></div>
    </Card>
  );
};

export default TravelOutline;
