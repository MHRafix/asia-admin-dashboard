import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const ChartAnalytics: React.FC = () => {
	var optionsArea = {
		stroke: {
			curve: 'smooth',
			width: 2,
		},
		colors: ['#FEB019', '#00E396', '#7048E8'],
		series: [
			{
				name: 'New Booking',
				data: [0, 39, 52, 11, 29, 43],
			},
			{
				name: 'Competed Booking',
				data: [3, 33, 21, 42, 19, 32],
			},
			{
				name: 'Canceled Booking',
				data: [1, 15, 26, 20, 33, 27],
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
