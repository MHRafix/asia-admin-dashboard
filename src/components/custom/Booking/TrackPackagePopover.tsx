import { IBooking, STATUS_ARR } from "@/app/api/models/bookings.model";
import { ITravelPackage } from "@/app/api/models/travelPackage.model";
import { UPDATE_BOOKING_STATUS } from "@/app/config/gql-queries/bookings.query";
import { getPaymentBadgeColors } from "@/app/config/logic/getColors";
import TourCard from "@/components/common/Tour/TourCard";
import { useMutation } from "@apollo/client";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  CopyButton,
  Drawer,
  Group,
  Paper,
  Space,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import React from "react";

const TrackPackagePopover: React.FC<{
  bookingDetails: IBooking;
  onRefetch: () => void;
}> = ({ bookingDetails, onRefetch }) => {
  const [opened, handler] = useDisclosure();

  // update booking
  const [updateBooking] = useMutation(UPDATE_BOOKING_STATUS, {
    onCompleted: () => {
      onRefetch();
      showNotification({
        title: "Booking successfully updated!",
        color: "teal",
        message: "",
      });
      handler.close();
    },
  });

  // calculate price
  const calculateNetTotalPrice = (bookingDetails: IBooking): number => {
    const adultTraveler: number = bookingDetails?.travelerDetails?.adult ?? 0;
    const childTraveler: number = bookingDetails?.travelerDetails?.child ?? 0;
    const packagePrice: number = bookingDetails?.packageId?.salePrice ?? 0;
    const res =
      adultTraveler * packagePrice +
        childTraveler * ((packagePrice / 100) * 70) || 0;

    return res;
  };

  return (
    <div>
      <Button
        size="sm"
        ff={"Nunito sans, sans-serif"}
        color="violet"
        variant="light"
        compact
        onClick={handler.open}
      >
        Track Pack
      </Button>
      <Drawer
        opened={opened}
        onClose={handler.close}
        title="Booking details"
        position="right"
      >
        <Paper shadow="md" withBorder>
          <Text fw={500} px={10} py={5} bg={"gray"}>
            Traveler Details
          </Text>

          <Box p={10}>
            <div className="flex items-center justify-start gap-3">
              <div>
                <Text ff={"Nunito sans, sans-serif"} fw={600} color="gray">
                  Name:
                </Text>
                <Text ff={"Nunito sans, sans-serif"} fw={600} color="gray">
                  Email:
                </Text>
                <Text ff={"Nunito sans, sans-serif"} fw={600} color="gray">
                  Phone:
                </Text>
                {/* <Text>Address:</Text> */}
              </div>
              <div>
                <Text
                  ff={"Nunito sans, sans-serif"}
                  fw={600}
                  className="text-gray-500"
                >
                  {bookingDetails?.customerDetails?.name}
                </Text>
                <Text
                  ff={"Nunito sans, sans-serif"}
                  fw={600}
                  className="text-gray-500"
                >
                  {bookingDetails?.customerDetails?.email}
                </Text>
                <Text
                  ff={"Nunito sans, sans-serif"}
                  fw={600}
                  className="text-gray-500"
                >
                  {bookingDetails?.customerDetails?.phone}
                </Text>
              </div>
            </div>
          </Box>
        </Paper>

        <Space h={"xl"} />
        <Paper shadow="md" withBorder>
          <Text fw={500} px={10} py={5} bg={"gray"}>
            Payment Details
          </Text>

          <Box p={10}>
            <div className="flex items-center justify-start gap-3">
              <div className="grid gap-[5px] items-center place-content-center">
                <Text ff={"Nunito sans, sans-serif"} fw={600} color="gray">
                  Sub total:
                </Text>
                <Text ff={"Nunito sans, sans-serif"} fw={600} color="gray">
                  Net amount:
                </Text>
                <Text ff={"Nunito sans, sans-serif"} fw={600} color="gray">
                  Method:
                </Text>
                <Text ff={"Nunito sans, sans-serif"} fw={600} color="gray">
                  Transaction ID:
                </Text>
                <Text ff={"Nunito sans, sans-serif"} fw={600} color="gray">
                  Booking ID:
                </Text>
                <Text ff={"Nunito sans, sans-serif"} fw={600} color="gray">
                  Payment Status:
                </Text>
                <Text ff={"Nunito sans, sans-serif"} fw={600} color="gray">
                  Adult:
                </Text>
                <Text ff={"Nunito sans, sans-serif"} fw={600} color="gray">
                  Children:
                </Text>
                {/* <Text>Address:</Text> */}
              </div>
              <div className="grid gap-[3px] items-center place-content-center">
                <Text
                  ff={"Nunito sans, sans-serif"}
                  fw={600}
                  className="text-gray-500"
                >
                  $ {calculateNetTotalPrice(bookingDetails)}
                </Text>
                <Text
                  ff={"Nunito sans, sans-serif"}
                  fw={600}
                  className="text-gray-500"
                >
                  $ {calculateNetTotalPrice(bookingDetails)}
                </Text>
                <Text
                  ff={"Nunito sans, sans-serif"}
                  fw={600}
                  className="text-gray-500"
                >
                  {bookingDetails?.paymentDetails?.paymentMethod}
                </Text>
                <div className="flex gap-2 items-center">
                  <Text
                    ff={"Nunito sans, sans-serif"}
                    fw={600}
                    className="text-gray-500"
                  >
                    {bookingDetails?.transactionId}
                  </Text>
                  <CopyButton
                    value={bookingDetails?.transactionId!}
                    timeout={2000}
                  >
                    {({ copied, copy }) => (
                      <Tooltip
                        label={copied ? "Copied" : "Copy"}
                        withArrow
                        position="right"
                      >
                        <ActionIcon
                          color={copied ? "teal" : "gray"}
                          onClick={copy}
                        >
                          {copied ? (
                            <IconCheck size="1rem" />
                          ) : (
                            <IconCopy size="1rem" />
                          )}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                </div>
                <div className="flex gap-2 items-center">
                  <Text
                    ff={"Nunito sans, sans-serif"}
                    fw={600}
                    className="text-gray-500"
                  >
                    {bookingDetails?.bookingId}
                  </Text>
                  <CopyButton value={bookingDetails?.bookingId!} timeout={2000}>
                    {({ copied, copy }) => (
                      <Tooltip
                        label={copied ? "Copied" : "Copy"}
                        withArrow
                        position="right"
                      >
                        <ActionIcon
                          color={copied ? "teal" : "gray"}
                          onClick={copy}
                        >
                          {copied ? (
                            <IconCheck size="1rem" />
                          ) : (
                            <IconCopy size="1rem" />
                          )}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                </div>
                <Badge
                  color={getPaymentBadgeColors(
                    bookingDetails?.paymentDetails?.paymentStatus!
                  )}
                  size="lg"
                  w={80}
                  fw={500}
                  variant="dot"
                  radius="sm"
                >
                  {bookingDetails?.paymentDetails?.paymentStatus}
                </Badge>
                <Text
                  ff={"Nunito sans, sans-serif"}
                  fw={600}
                  className="text-gray-500"
                >
                  {bookingDetails?.travelerDetails?.adult}
                </Text>
                <Text
                  ff={"Nunito sans, sans-serif"}
                  fw={600}
                  className="text-gray-500"
                >
                  {bookingDetails?.travelerDetails?.child}
                </Text>{" "}
              </div>
            </div>
            <Space h={"sm"} />

            <Group position="left">
              <Button
                color={"violet"}
                size="sm"
                fw={500}
                variant="filled"
                radius="sm"
                disabled={bookingDetails?.status === STATUS_ARR[1]}
                onClick={() =>
                  openConfirmModal({
                    title: "Please confirm your action",
                    children: (
                      <Text size="sm">
                        Are you really want to proceed action ?
                      </Text>
                    ),
                    labels: { confirm: "Yes", cancel: "Cancel" },
                    confirmProps: { color: "red" },
                    onCancel: () => {},
                    onConfirm: () =>
                      updateBooking({
                        variables: {
                          id: bookingDetails._id,
                          status: STATUS_ARR[1],
                        },
                      }),
                  })
                }
              >
                Approve
              </Button>

              <Button
                color={"teal"}
                size="sm"
                fw={500}
                variant="filled"
                radius="sm"
                disabled={bookingDetails?.status === STATUS_ARR[2]}
                onClick={() =>
                  openConfirmModal({
                    title: "Please confirm your action",
                    children: (
                      <Text size="sm">
                        Are you really want to proceed action ?
                      </Text>
                    ),
                    labels: { confirm: "Yes", cancel: "Cancel" },
                    confirmProps: { color: "red" },
                    onCancel: () => {},
                    onConfirm: () =>
                      updateBooking({
                        variables: {
                          id: bookingDetails._id,
                          status: STATUS_ARR[2],
                        },
                      }),
                  })
                }
              >
                Finish
              </Button>

              <Button
                color={"red"}
                size="sm"
                fw={500}
                variant="filled"
                radius="sm"
                disabled={bookingDetails?.status === STATUS_ARR[3]}
                onClick={() =>
                  openConfirmModal({
                    title: "Please confirm your action",
                    children: (
                      <Text size="sm">
                        Are you really want to proceed action ?
                      </Text>
                    ),
                    labels: { confirm: "Yes", cancel: "Cancel" },
                    confirmProps: { color: "red" },
                    onCancel: () => {},
                    onConfirm: () =>
                      updateBooking({
                        variables: {
                          id: bookingDetails._id,
                          status: STATUS_ARR[3],
                        },
                      }),
                  })
                }
              >
                Cancel
              </Button>
            </Group>
          </Box>
        </Paper>

        <Space h={"xl"} />

        <TourCard
          TPackage={bookingDetails?.packageId as ITravelPackage}
          actionBtn={false}
        />
      </Drawer>
    </div>
  );
};

export default TrackPackagePopover;
