import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { IRootState } from '@store/index';

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

function PlayerChart() {
  const {
    chart: { playerOne, playerTwo },
    players: { playerOneYear, playerOneSeason, playerTwoYear, playerTwoSeason },
  } = useSelector((state: IRootState) => state);

  const toFixedOne = (arr: any) => {
    return arr.map((v: any) => {
      return { ...v, y: v.y ? v.y.toFixed(1) : 0 };
    });
  };
  const playerOneChartData2013 = toFixedOne([
    {
      x: 'KDA',
      y: playerOne?.kda,
    },
    {
      x: 'KP',
      y: playerOne?.kp,
    },
    {
      x: 'DTH',
      y: playerOne?.dth,
    },
    {
      x: 'GOLD',
      y: playerOne?.gold,
    },
    {
      x: 'WIN',
      y: playerOne?.winRate,
    },
  ]);
  const playerOneChartData2015 = toFixedOne([
    {
      x: 'KDA',
      y: playerOne?.kda,
    },
    {
      x: 'GD@10',
      y: playerOne?.gd10,
    },
    {
      x: 'CS@10',
      y: playerOne?.cs10,
    },
    {
      x: 'DPM',
      y: playerOne?.dpm / 10,
    },
    {
      x: 'DMG',
      y: playerOne?.dmg,
    },
  ]);
  const playerTwoChartData2013 = toFixedOne([
    {
      x: 'KDA',
      y: playerTwo?.kda,
    },
    {
      x: 'KP',
      y: playerTwo?.kp,
    },
    {
      x: 'DTH',
      y: playerTwo?.dth,
    },
    {
      x: 'GOLD',
      y: playerTwo?.gold,
    },
    {
      x: 'WIN',
      y: playerTwo?.winRate,
    },
  ]);
  const playerTwoChartData2015 = toFixedOne([
    {
      x: 'KDA',
      y: playerTwo?.kda,
    },
    {
      x: 'GD@10',
      y: playerTwo?.gd10,
    },
    {
      x: 'CS@10',
      y: playerTwo?.cs10,
    },
    {
      x: 'DPM',
      y: playerTwo?.dpm / 10,
    },
    {
      x: 'DMG',
      y: playerTwo?.dmg,
    },
  ]);

  return (
    <ApexChart
      type="radar"
      width={'120%'}
      height={'100%'}
      series={[
        {
          name: `${playerOneYear} ${playerOneSeason}`,
          data:
            Number(playerOneYear) < 2015
              ? playerOneChartData2013
              : playerOneChartData2015,
        },
        {
          name: `${playerTwoYear} ${playerTwoSeason}`,
          data:
            Number(playerTwoYear) < 2015
              ? playerTwoChartData2013
              : playerTwoChartData2015,
        },
      ]}
      options={{
        chart: {
          toolbar: {
            show: false,
          },
          foreColor: '#FFFFFF',
          width: '100%',
          height: '100%',
          type: 'radar',
        },
        xaxis: {
          categories:
            Number(playerOneYear) < 2015
              ? ['KDA', 'KP%', 'DTH%', 'GOLD', 'WIN%']
              : ['KDA', 'GD@10', 'CS@10', 'DPM', 'DMG%'],
        },
        yaxis: {
          show: false,
          tickAmount: 4,
          min: -100,
          max: 100,
        },
        dataLabels: {
          enabled: true,
          formatter: (element: number, { dataPointIndex }) =>
            Number(playerOneYear) >= 2015 && dataPointIndex === 3
              ? element * 10
              : element,
        },
        tooltip: {
          enabled: false,
        },
      }}
    ></ApexChart>
  );
}

export default PlayerChart;
