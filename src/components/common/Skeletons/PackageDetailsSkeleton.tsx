import { Skeleton } from "@mantine/core";
import React from "react";

const PackageDetailsSkeleton: React.FC = () => {
  return (
    <div>
      <Skeleton h={300} radius={15} my={15} />
      <Skeleton h={70} radius={15} my={15} />
      <Skeleton h={40} radius={5} mb={15} mt={30} />
      <Skeleton h={150} radius={15} my={20} />
      <Skeleton h={150} radius={15} my={20} />
      <Skeleton h={40} radius={5} mb={15} mt={30} />
      <Skeleton h={150} radius={15} my={20} />
      <Skeleton h={150} radius={15} my={20} />
    </div>
  );
};

export default PackageDetailsSkeleton;
