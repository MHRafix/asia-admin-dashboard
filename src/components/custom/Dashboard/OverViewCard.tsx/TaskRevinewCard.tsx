import { Paper, Space, Text, Title } from "@mantine/core";
import React from "react";
import { CountUp } from "use-count-up";

const TaskRevinewCard: React.FC<{
  revinew: number[];
}> = ({ revinew }) => {
  return (
    <Paper shadow="md" p={10} bg={"#212231"} radius={5}>
      <Title order={5}>Emon Sarder</Title>
      <Space h={5} />

      <div className="grid grid-cols-2 gap-2">
        <Text fw={500} color="orange">
          Total amount
        </Text>
        <Text fw={500} color="orange" ta={"center"}>
          <CountUp
            isCounting
            end={revinew[0] || 0}
            duration={3}
            thousandsSeparator=","
          />{" "}
          BDT
        </Text>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Text fw={500} color="teal">
          Paid amount
        </Text>
        <Text fw={500} color="teal" ta={"center"}>
          <CountUp
            isCounting
            end={revinew[1] || 0}
            duration={3}
            thousandsSeparator=","
          />{" "}
          BDT
        </Text>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Text fw={500} color="red">
          Due amount
        </Text>
        <Text fw={500} color="red" ta={"center"}>
          <CountUp
            isCounting
            end={revinew[2] || 0}
            duration={3}
            thousandsSeparator=","
          />{" "}
          BDT
        </Text>
      </div>
    </Paper>
  );
};

export default TaskRevinewCard;
