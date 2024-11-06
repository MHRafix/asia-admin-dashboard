import {
  IBookingsChartChartAnalytics,
  IOverViewCardData,
} from "@/app/api/models/dashboard.model";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const ChartBookingAnalytics: React.FC<{
  date: string[];
  chartData: IBookingsChartChartAnalytics;
}> = ({ date, chartData }) => {
  console.log({ chartData, date });
  const optionsArea = {
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#FEB019", "#7048E8"],
    series: [
      // {
      // 	name: 'Pending',
      // 	data: chartData?.pending,
      // },
      // {
      // 	name: 'Approved',
      // 	data: chartData?.approved,
      // },

      // {
      // 	name: 'Completed',
      // 	data: chartData?.completed,
      // },
      // {
      // 	name: 'Canceled',
      // 	data: chartData?.canceled,
      // },
      {
        name: "Bookings",
        data: chartData?.bookings,
      },
      {
        name: "Appointments",
        data: chartData?.appointments,
      },
    ],
    title: {
      text: "Package Bookings and Appointments",

      align: "left",
      offsetY: 25,
      offsetX: 20,
    },
    subtitle: {
      text: "",
      offsetY: 55,
      offsetX: 20,
    },
    markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
        size: 9,
      },
    },
    grid: {
      borderColor: "#535A6C",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    labels: date,

    xaxis: {
      tooltip: {
        enabled: false,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      offsetY: -20,
    },
    chart: {
      foreColor: "#ccc",
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 2,
        left: 1,
        blur: 4,
        opacity: 1,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: "dark",
    },
  };

  //   var optionsArea = {
  //     series: [
  //       {
  //         name: "series1",
  //         data: [31, 40, 28, 51, 42, 109, 100],
  //       },
  //       {
  //         name: "series2",
  //         data: [11, 32, 45, 32, 34, 52, 41],
  //       },
  //     ],
  //     chart: {
  //       height: 350,
  //       type: "area",
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     stroke: {
  //       curve: "smooth",
  //     },
  //     xaxis: {
  //       type: "datetime",
  //       categories: [
  //         "2018-09-19T00:00:00.000Z",
  //         "2018-09-19T01:30:00.000Z",
  //         "2018-09-19T02:30:00.000Z",
  //         "2018-09-19T03:30:00.000Z",
  //         "2018-09-19T04:30:00.000Z",
  //         "2018-09-19T05:30:00.000Z",
  //         "2018-09-19T06:30:00.000Z",
  //       ],
  //     },
  //     tooltip: {
  //       x: {
  //         format: "dd/MM/yy HH:mm",
  //       },
  //     },
  //   };

  return (
    <Chart
      type="area"
      // @ts-ignore
      options={optionsArea!}
      series={optionsArea?.series}
      height={463}
    />
  );
};

import React from "react";

export const ChartTransactionAnalytics: React.FC<{
  transactions: IOverViewCardData;
}> = ({ transactions }) => {
  const optionsCircle4 = {
    chart: {
      foreColor: "#ccc",
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 2,
        // left: 1,
        blur: 4,
        opacity: 1,
      },
      type: "radialBar",
      height: 300,
      // width: 320,
    },
    colors: ["#7048E8", "#00E396", "#FEB019"],

    plotOptions: {
      radialBar: {
        size: undefined,
        inverseOrder: true,
        hollow: {
          margin: 5,
          size: "48%",
          background: "transparent",
        },
        track: {
          show: false,
        },
        startAngle: -180,
        endAngle: 180,
      },
    },
    stroke: {
      lineCap: "round",
    },
    series: [
      transactions?.newFlights,
      transactions?.newBookings === 0 ? 10 : transactions?.newBookings,
      transactions?.newAppointments,
    ],
    labels: ["Hotel", "Flight", "Package"],
    legend: {
      show: true,
      floating: true,
      position: "top",
      // offsetX: 70,
      offsetY: 200,
    },
  };

  return (
    <Chart
      type="radialBar"
      // @ts-ignore
      options={optionsCircle4!}
      series={optionsCircle4?.series}
    />
  );
};
