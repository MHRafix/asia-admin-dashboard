// import {
//   IBookingsChartChartAnalytics,
//   IOverViewCardData,
// } from "@/app/api/models/dashboard.model";
// import dynamic from "next/dynamic";

// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// export const ChartBookingAnalytics: React.FC<{
//   date: string[];
//   chartData: IBookingsChartChartAnalytics;
// }> = ({ date, chartData }) => {
//   console.log({ chartData, date });
//   const optionsArea = {
//     stroke: {
//       curve: "smooth",
//       width: 2,
//     },
//     colors: ["#FEB019", "#7048E8"],
//     series: [
//       {
//         name: "Bookings",
//         data: chartData?.bookings,
//       },
//       {
//         name: "Appointments",
//         data: chartData?.appointments,
//       },
//     ],
//     title: {
//       text: "Package Bookings and Appointments",

//       align: "left",
//       offsetY: 25,
//       offsetX: 20,
//     },
//     subtitle: {
//       text: "",
//       offsetY: 55,
//       offsetX: 20,
//     },
//     markers: {
//       size: 6,
//       strokeWidth: 0,
//       hover: {
//         size: 9,
//       },
//     },
//     grid: {
//       borderColor: "#535A6C",
//       xaxis: {
//         lines: {
//           show: false,
//         },
//       },
//       yaxis: {
//         lines: {
//           show: false,
//         },
//       },
//     },
//     labels: date,

//     xaxis: {
//       tooltip: {
//         enabled: false,
//       },
//     },
//     legend: {
//       position: "top",
//       horizontalAlign: "right",
//       offsetY: -20,
//     },
//     chart: {
//       foreColor: "#ccc",
//       toolbar: {
//         show: false,
//       },
//       dropShadow: {
//         enabled: true,
//         top: 2,
//         left: 1,
//         blur: 4,
//         opacity: 1,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     tooltip: {
//       theme: "dark",
//     },
//   };

//   return (
//     <Chart
//       type="area"
//       // @ts-ignore
//       options={optionsArea!}
//       series={optionsArea?.series}
//       height={463}
//     />
//   );
// };

// import React from "react";

// export const ChartTransactionAnalytics: React.FC<{
//   transactions: IOverViewCardData;
// }> = ({ transactions }) => {
//   console.log({ transactions });
//   const optionsCircle4 = {
//     chart: {
//       foreColor: "#ccc",
//       toolbar: {
//         show: false,
//       },
//       dropShadow: {
//         enabled: true,
//         top: 2,
//         // left: 1,
//         blur: 4,
//         opacity: 1,
//       },
//       type: "radialBar",
//       height: 300,
//       // width: 320,
//     },
//     colors: ["#7048E8", "#00E396", "#FEB019"],

//     plotOptions: {
//       radialBar: {
//         size: undefined,
//         inverseOrder: true,
//         hollow: {
//           margin: 5,
//           size: "48%",
//           background: "transparent",
//         },
//         track: {
//           show: false,
//         },
//         startAngle: -180,
//         endAngle: 180,
//       },
//     },
//     stroke: {
//       lineCap: "round",
//     },
//     series: [
//       transactions?.newFlights,
//       transactions?.newBookings === 0 ? 10 : transactions?.newBookings,
//       transactions?.newAppointments,
//     ],
//     labels: ["Hotel", "Flight", "Package"],
//     legend: {
//       show: true,
//       floating: true,
//       position: "top",
//       // offsetX: 70,
//       offsetY: 200,
//     },
//   };

//   return (
//     <Chart
//       type="radialBar"
//       // @ts-ignore
//       options={optionsCircle4!}
//       series={optionsCircle4?.series}
//     />
//   );
// };

const ChartAnalytics = () => {
	return <div>ChartAnalytics</div>;
};

export default ChartAnalytics;
