import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import {
  Container,
  Item,
  Profile,
  Img,
  Logo,
  LogoName,
  WinBar,
  WinRateBar,
  WinRate,
  WinRateRank,
  Year,
  Season,
  ChartBox,
  YearSelect,
  SeasonSelect,
  StatBox,
  PlayerSaying,
  CareerText,
  CareerBox,
} from '../../styles/stats';

export default function StatOfPlayer() {
  const chartData = [
    {
      x: 'KDA',
      y: 4.3 * 10,
    },
    {
      x: 'KP',
      y: 73.4,
    },
    {
      x: 'DTH',
      y: 21,
    },
    {
      x: 'GOLD',
      y: 29.1,
    },
    {
      x: 'WIN',
      y: 70,
    },
  ];
  const ApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  return (
    <Container>
      <Item>
        <Profile>
          <Img src={`/imgs/profiles/faker.png`} alt={'profile'}></Img>
          <Logo src={`/imgs/team_logos/T1.png`} alt={'Logo'}></Logo>
          <LogoName>{'T1'}</LogoName>
          <WinBar>
            <WinRateBar winrate={70}></WinRateBar>
          </WinBar>
          <WinRate>
            {'70%'}
            <WinRateRank>{'2nd'}</WinRateRank>
          </WinRate>
          <Year>
            {2013}
            <Season>{'Spring'}</Season>
          </Year>
          <ChartBox>
            <Suspense fallback="Loading Chart...">
              <ApexChart
                type="radar"
                width="100%"
                height="100%"
                series={[
                  {
                    name: `${2013} ${'Spring'}`,
                    data: chartData,
                  },
                ]}
                options={{
                  chart: {
                    toolbar: {
                      show: false,
                    },
                  },
                  xaxis: {
                    categories: ['KDA', 'KP%', 'DTH%', 'GOLD', 'WIN%'],
                  },
                  yaxis: {
                    show: false,
                    tickAmount: 3,
                    min: -100,
                    max: 100,
                    labels: {
                      formatter: (a: any) => a.toFixed(1),
                    },
                  },
                  dataLabels: {
                    enabled: true,
                    formatter: (element: number, { dataPointIndex }) =>
                      `${
                        dataPointIndex === 0
                          ? element / 10
                          : dataPointIndex === 2
                          ? element / 10
                          : dataPointIndex === 3
                          ? element * 10
                          : element
                      }`,
                  },
                  tooltip: {
                    enabled: false,
                  },
                  responsive: [
                    {
                      breakpoint: 578,
                      options: { dataLabels: { enabled: false } },
                    },
                  ],
                }}
              ></ApexChart>
            </Suspense>
          </ChartBox>
        </Profile>
      </Item>
      <Item>
        <YearSelect id="year">
          {['2013', '2014', '2015'].map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </YearSelect>
        <SeasonSelect opacity={0.8}>Spring</SeasonSelect>
        <SeasonSelect opacity={0.8}>Summer</SeasonSelect>
        <SeasonSelect opacity={0.8}>Worlds</SeasonSelect>
        {
          <>
            <StatBox>
              <div>
                <h1>{4.3}</h1>
                <h1>{'3rd'}</h1>
                <h1>KDA</h1>
              </div>
              <div>
                <h1>{73.4}</h1>
                {<h1>{'2nd'}</h1>}
                <h1>{'KP%'}</h1>
              </div>
              <div>
                <h1>{21}</h1>
                {<h1>{'8th'}</h1>}
                <h1>{'DTH%'}</h1>
              </div>
              <div>
                <h1>{'29.1%'}</h1>

                {<h1>{'1st'}</h1>}
                <h1>{'GOLD%'}</h1>
              </div>
              <div>
                <h1>{'70%'}</h1>
                {<h1>{'2nd'}</h1>}
                <h1>{'WINRATE%'}</h1>
              </div>
            </StatBox>
            <PlayerSaying>역대 최고의 리그 오브 레전드 프로게이머</PlayerSaying>
            <CareerText>커리어</CareerText>
            <CareerBox>
              <div>
                <h1>{'1st'}</h1>
                <h1>정규시즌</h1>
              </div>
              <div>
                <h1>{'3rd'}</h1>
                <h1>플레이오프</h1>
              </div>
              <div>
                <h1>{'650'}</h1>
                <h1>{'4th'}</h1>
                <h1>POG포인트</h1>
              </div>
            </CareerBox>
          </>
        }
      </Item>
    </Container>
  );
}
