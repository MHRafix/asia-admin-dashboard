import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const ChartBookingAnalytics: React.FC = () => {
	const optionsArea = {
		stroke: {
			curve: 'smooth',
			width: 2,
		},
		colors: ['#7048E8', '#00E396', '#FEB019'],
		series: [
			{
				name: 'New Appointments ',
				data: [1, 60, 36, 30, 48, 50, 32],
			},
			{
				name: 'Flight Booking',
				data: [3, 33, 21, 42, 19, 32, 42],
			},

			{
				name: 'Package Booking',
				data: [0, 39, 52, 11, 29, 43, 45],
			},
		],
		title: {
			text: 'Bookings',
			align: 'left',
			offsetY: 25,
			offsetX: 20,
		},
		subtitle: {
			text: 'Analytics',
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
			borderColor: '#535A6C',
			xaxis: {
				lines: {
					show: true,
				},
			},
		},
		labels: [
			'01/15/2002',
			'01/16/2002',
			'01/17/2002',
			'01/18/2002',
			'01/19/2002',
			'01/20/2002',
			'01/21/2002',
		],
		xaxis: {
			tooltip: {
				enabled: false,
			},
		},
		legend: {
			position: 'top',
			horizontalAlign: 'right',
			offsetY: -20,
		},
		chart: {
			foreColor: '#ccc',
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
			theme: 'dark',
		},
	};

	return (
		<Chart
			type='area'
			// @ts-ignore
			options={optionsArea!}
			series={optionsArea?.series}
			height={463}
		/>
	);
};

import React from 'react';

export const ChartTransactionAnalytics = () => {
	const optionsCircle4 = {
		chart: {
			foreColor: '#ccc',
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
			type: 'radialBar',
			height: 300,
			width: 320,
		},
		colors: ['#7048E8', '#00E396', '#FEB019'],
		title: {
			text: 'Transaction analytics',
			align: 'left',
			offsetY: 25,
			offsetX: 20,
		},

		plotOptions: {
			radialBar: {
				size: undefined,
				inverseOrder: true,
				hollow: {
					margin: 5,
					size: '48%',
					background: 'transparent',
				},
				track: {
					show: false,
				},
				startAngle: -180,
				endAngle: 180,
			},
		},
		stroke: {
			lineCap: 'round',
		},
		series: [71, 63, 77],
		labels: ['Hotel', 'Flight', 'Package'],
		legend: {
			show: true,
			floating: true,
			position: 'right',
			offsetX: 70,
			offsetY: 240,
		},
	};

	return (
		<Chart
			type='radialBar'
			// @ts-ignore
			options={optionsCircle4!}
			series={optionsCircle4?.series}
		/>
	);
};
