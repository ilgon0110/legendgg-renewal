import { GetServerSideProps, NextPage } from 'next';
import { ChangeEvent, MouseEvent, useState } from 'react';
import path from 'path';
import { promises as fs } from 'fs';
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
  SeasonNavbar,
  YearSelect,
  SeasonSelect,
  StatBox,
  PlayerSaying,
  CareerText,
  CareerBox,
} from '@styles/stats';
import NoData from '@components/NoData';
import { setRank } from '@utilities/index';

export interface IplayerData {
  id?: number;
  team?: string;
  kda?: number;
  kdaRank?: number;
  kp?: number;
  kpRank?: number;
  gd10?: number;
  gd10Rank?: number;
  dth?: number;
  dthRank?: number;
  gold?: number;
  goldRank?: number;
  winRate?: number;
  winRateRank?: number;
  cs10?: number;
  cs10Rank?: number;
  dpm?: number;
  dpmRank?: number;
  dmg?: number;
  dmgRank?: number;
  groupRank?: number;
  playoffRank?: number;
  pogpoint?: number;
  pogpointRank?: number;
}

interface SeasonData {
  spring: IplayerData;
  summer: IplayerData;
  world: IplayerData;
}

interface Data {
  [key: string]: any;
  quote: string;
  '2013': SeasonData;
  '2014': SeasonData;
  '2015': SeasonData;
  '2016': SeasonData;
  '2017': SeasonData;
  '2018': SeasonData;
  '2019': SeasonData;
  '2020': SeasonData;
  '2021': SeasonData;
}
const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const StatOfPlayer: NextPage<{ data: string; playerName: string }> = ({
  data,
  playerName,
}) => {
  const playerData: Data = JSON.parse(data);
  const [selectedYear, setSelectedYear] = useState('2013');
  const [selectedSeason, setSelectedSeason] = useState('spring');
  const [seasonOpacity, setSeasonOpacity] = useState({
    spring: 1,
    summer: 0.5,
    world: 0.5,
  });
  const SELECT_STAT: IplayerData = playerData[selectedYear][selectedSeason];
  const chartDataHandler = (num: number | undefined) => {
    if (num === undefined) return 0;
    return num;
  };

  const chartData = [
    {
      x: 'KDA',
      y: chartDataHandler(SELECT_STAT.kda) * 10,
    },
    {
      x: 'KP',
      y:
        Number(selectedYear) < 2015
          ? chartDataHandler(SELECT_STAT.kp)
          : chartDataHandler(SELECT_STAT.gd10),
    },
    {
      x: 'DTH',
      y:
        Number(selectedYear) < 2015
          ? chartDataHandler(SELECT_STAT.dth)
          : chartDataHandler(SELECT_STAT.cs10) * 10,
    },
    {
      x: 'GOLD',
      y:
        Number(selectedYear) < 2015
          ? chartDataHandler(SELECT_STAT.gold)
          : chartDataHandler(SELECT_STAT.dpm) / 10,
    },
    {
      x: 'WIN',
      y:
        Number(selectedYear) < 2015
          ? chartDataHandler(SELECT_STAT.winRate)
          : chartDataHandler(SELECT_STAT.dmg),
    },
  ];

  const yearLists = Object.keys(playerData).filter((e) => e !== 'quote');
  const handleYear = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  const handleSeason = (event: MouseEvent<HTMLSpanElement>) => {
    const eventTarget = event.target as HTMLElement;
    const targetSeason = eventTarget.innerHTML.toLowerCase();
    setSelectedSeason(targetSeason);
    changeSeasonOpacity(targetSeason);
  };

  const changeSeasonOpacity = (season: string) => {
    let opacity = { spring: 0.5, summer: 0.5, world: 0.5 };
    opacity[season as keyof typeof opacity] = 1;
    setSeasonOpacity(opacity);
  };

  return (
    <Container>
      <Item>
        <Profile>
          <Img src={`/imgs/profiles/${playerName}.png`} alt={'profile'}></Img>
          <Logo
            src={`/imgs/team_logos/${SELECT_STAT.team}.png`}
            alt={'Logo'}
          ></Logo>
          <LogoName>{SELECT_STAT.team}</LogoName>
          <WinBar>
            <WinRateBar winrate={SELECT_STAT.winRate}></WinRateBar>
          </WinBar>
          <WinRate>
            {SELECT_STAT.winRate}
            <WinRateRank>{setRank(SELECT_STAT.winRateRank)}</WinRateRank>
          </WinRate>
          <Year>
            {selectedYear}
            <Season>{selectedSeason}</Season>
          </Year>
          <ChartBox>
            <Suspense fallback="Loading Chart...">
              <ApexChart
                type="radar"
                width="100%"
                height="100%"
                series={[
                  {
                    name: `${selectedYear} ${selectedSeason}`,
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
                    categories:
                      Number(selectedYear) < 2015
                        ? ['KDA', 'KP%', 'DTH%', 'GOLD', 'WIN%']
                        : ['KDA', 'GD@10', 'CS@10', 'DPM', 'DMG%'],
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
        <SeasonNavbar>
          <YearSelect id="year" onChange={handleYear}>
            {yearLists.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </YearSelect>
          <SeasonSelect opacity={seasonOpacity.spring} onClick={handleSeason}>
            Spring
          </SeasonSelect>
          <SeasonSelect opacity={seasonOpacity.summer} onClick={handleSeason}>
            Summer
          </SeasonSelect>
          <SeasonSelect opacity={seasonOpacity.world} onClick={handleSeason}>
            World
          </SeasonSelect>
        </SeasonNavbar>
        {SELECT_STAT.winRate ? (
          <>
            {Number(selectedYear) < 2015 ? (
              <StatBox>
                <div>
                  <h1>{SELECT_STAT.kda}</h1>
                  <h1>{setRank(SELECT_STAT.kdaRank)}</h1>
                  <h1>KDA</h1>
                </div>
                <div>
                  <h1>{SELECT_STAT.kp}</h1>
                  {<h1>{setRank(SELECT_STAT.kpRank)}</h1>}
                  <h1>{'KP%'}</h1>
                </div>
                <div>
                  <h1>{SELECT_STAT.dth}</h1>
                  {<h1>{setRank(SELECT_STAT.dthRank)}</h1>}
                  <h1>{'DTH%'}</h1>
                </div>
                <div>
                  <h1>{SELECT_STAT.gold}</h1>
                  {<h1>{setRank(SELECT_STAT.goldRank)}</h1>}
                  <h1>{'GOLD%'}</h1>
                </div>
                <div>
                  <h1>{SELECT_STAT.winRate}</h1>
                  {<h1>{setRank(SELECT_STAT.winRateRank)}</h1>}
                  <h1>{'WINRATE%'}</h1>
                </div>
              </StatBox>
            ) : (
              <StatBox>
                <div>
                  <h1>{SELECT_STAT.kda}</h1>
                  <h1>{setRank(SELECT_STAT.kdaRank)}</h1>
                  <h1>KDA</h1>
                </div>
                <div>
                  <h1>{SELECT_STAT.gd10}</h1>
                  {<h1>{setRank(SELECT_STAT.gd10Rank)}</h1>}
                  <h1>{'GD@10'}</h1>
                </div>
                <div>
                  <h1>{SELECT_STAT.cs10}</h1>
                  {<h1>{setRank(SELECT_STAT.cs10Rank)}</h1>}
                  <h1>{'CS@10'}</h1>
                </div>
                <div>
                  <h1>{SELECT_STAT.dpm}</h1>
                  {<h1>{setRank(SELECT_STAT.dpmRank)}</h1>}
                  <h1>{'DPM'}</h1>
                </div>
                <div>
                  <h1>{SELECT_STAT.dmg}</h1>
                  {<h1>{setRank(SELECT_STAT.dmgRank)}</h1>}
                  <h1>{'DMG%'}</h1>
                </div>
              </StatBox>
            )}
            <PlayerSaying>{playerData.quote}</PlayerSaying>
            <CareerText>커리어</CareerText>
            <CareerBox>
              <div>
                <h1>{setRank(SELECT_STAT.groupRank)}</h1>
                <h1>정규시즌</h1>
              </div>
              <div>
                <h1>{setRank(SELECT_STAT.playoffRank)}</h1>
                <h1>플레이오프</h1>
              </div>
              <div>
                <h1>
                  {SELECT_STAT.pogpoint == 99
                    ? 'World MVP'
                    : setRank(SELECT_STAT.pogpointRank)}
                </h1>
                <h1>POG포인트</h1>
              </div>
            </CareerBox>
            <div
              style={{
                width: '200px',
                height: '1000px',
                border: '1px solid blue',
              }}
            ></div>
          </>
        ) : (
          <NoData year={selectedYear} season={selectedSeason}></NoData>
        )}
      </Item>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const playerName = params?.id;
  const jsonDirectory = path.join(process.cwd(), '/public/jsons');
  const fileContents = await fs.readFile(
    jsonDirectory + `/${playerName}.json`,
    'utf8',
  );
  return {
    props: {
      data: JSON.parse(JSON.stringify(fileContents)),
      playerName: playerName,
    },
  };
};

export default StatOfPlayer;
