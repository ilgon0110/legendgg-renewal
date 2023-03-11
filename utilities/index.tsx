import { IplayerData } from '@pages/stats/[id]';
import { useState } from 'react';

export const setRank = (rank: number | undefined) => {
  if (rank === 1) return '1st';
  if (rank === 2) return '2nd';
  if (rank === 3) return '3rd';
  return rank ? `${rank}th` : null;
};

export const toFixedChartData = (arr: any[]) => {
  return arr.map((v: any) => {
    return { ...v, y: v.y ? v.y.toFixed(1) : 0 };
  });
};

export const useOpacity: () => [
  {
    spring: number;
    summer: number;
    world: number;
  },
  (e: string) => void,
] = () => {
  const [seasonOpacity, setSeasonOpacity] = useState({
    spring: 1,
    summer: 0.5,
    world: 0.5,
  });
  const changeSeasonOpacity = (season: string) => {
    const opacity = { spring: 0.5, summer: 0.5, world: 0.5 };
    opacity[season as keyof typeof opacity] = 1;
    setSeasonOpacity(opacity);
  };

  return [seasonOpacity, changeSeasonOpacity];
};

export const parseCookies = (cookie = '') => {
  return cookie
    .split(';')
    .map((v) => v.split('='))
    .map(([key, ...value]) => [key, value.join('=')]);
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const fetcherAndParsing = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json)
    .then((json) => JSON.parse(json));

export const getChartData = (data: IplayerData, year: string): IChartData[] => {
  const chartDataHandler = (num: number | undefined) => {
    if (num === undefined) return 0;
    return num;
  };
  return [
    {
      x: 'KDA',
      y: chartDataHandler(data.kda) * 10,
    },
    {
      x: 'KP',
      y: Number(year) < 2015 ? chartDataHandler(data.kp) : chartDataHandler(data.gd10),
    },
    {
      x: 'DTH',
      y: Number(year) < 2015 ? chartDataHandler(data.dth) : chartDataHandler(data.cs10) * 10,
    },
    {
      x: 'GOLD',
      y: Number(year) < 2015 ? chartDataHandler(data.gold) : chartDataHandler(data.dpm) / 10,
    },
    {
      x: 'WIN',
      y: Number(year) < 2015 ? chartDataHandler(data.winRate) : chartDataHandler(data.dmg),
    },
  ];
};

interface IChartData {
  x: string;
  y: number | undefined;
}
