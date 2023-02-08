import Image from 'next/image';
import { S } from '@styles/components/PlayerCard';
import { IplayerData } from '../pages/stats/[id]';
import { setRank } from '../utilities';

const PlayerCard = ({
  name,
  year,
  season,
  data,
}: {
  name: string;
  year: string;
  season: string;
  data: IplayerData | undefined;
}) => {
  return (
    <S.Wrapper>
      <>
        <S.Profile>
          <Image src={`/imgs/profiles/${name}.png`} alt={'profile'} fill sizes="100%" quality={100} priority />
        </S.Profile>
        <S.Logo>
          <Image src={`/imgs/team_logos/${data?.team}.png`} alt={'profile'} fill sizes="100%" quality={100} priority />
        </S.Logo>
        <S.LogoName>{data?.team}</S.LogoName>
        {Number(year) >= 2015 ? (
          <S.DarkBlue>
            <S.DarkBlueItem>
              <S.Score>{data?.winRate}</S.Score>
              <S.Nth>{setRank(data?.winRateRank)}</S.Nth>
              <S.Title>{'WIN'}</S.Title>
            </S.DarkBlueItem>
            <S.DarkBlueItem>
              <S.Score>{data?.kda}</S.Score>
              <S.Nth>{setRank(data?.kdaRank)}</S.Nth>
              <S.Title>{'KDA'}</S.Title>
            </S.DarkBlueItem>
            <S.DarkBlueItem>
              <S.Score>{data?.gd10}</S.Score>
              <S.Nth>{setRank(data?.gd10Rank)}</S.Nth>
              <S.Title>{'GD@10'}</S.Title>
            </S.DarkBlueItem>
            <S.DarkBlueItem>
              <S.Score>{data?.cs10}</S.Score>
              <S.Nth>{setRank(data?.cs10Rank)}</S.Nth>
              <S.Title>{'CS@10'}</S.Title>
            </S.DarkBlueItem>
            <S.DarkBlueItem>
              <S.Score>{`${data?.dpm}`}</S.Score>
              <S.Nth>{setRank(data?.dpmRank)}</S.Nth>
              <S.Title>{'DPM'}</S.Title>
            </S.DarkBlueItem>
            <S.DarkBlueItem>
              <S.Score>{`${data?.dmg}%`}</S.Score>
              <S.Nth>{setRank(data?.dmgRank)}</S.Nth>
              <S.Title>{'DMG'}</S.Title>
            </S.DarkBlueItem>
          </S.DarkBlue>
        ) : (
          <S.DarkBlue>
            <S.DarkBlueItem>
              <S.Score>{data?.winRate}</S.Score>
              <S.Nth>{setRank(data?.winRateRank)}</S.Nth>
              <S.Title>{'WIN'}</S.Title>
            </S.DarkBlueItem>
            <S.DarkBlueItem>
              <S.Score>{data?.kda}</S.Score>
              <S.Nth>{setRank(data?.kdaRank)}</S.Nth>
              <S.Title>{'KDA'}</S.Title>
            </S.DarkBlueItem>
            <S.DarkBlueItem>
              <S.Score>{data?.kp}</S.Score>
              <S.Nth>{setRank(data?.kpRank)}</S.Nth>
              <S.Title>{'KP'}</S.Title>
            </S.DarkBlueItem>
            <S.DarkBlueItem>
              <S.Score>{data?.dth}</S.Score>
              <S.Nth>{setRank(data?.dthRank)}</S.Nth>
              <S.Title>{'DTH'}</S.Title>
            </S.DarkBlueItem>
            <S.DarkBlueItem>
              <S.Score>{`${data?.gold}%`}</S.Score>
              <S.Nth>{setRank(data?.goldRank)}</S.Nth>
              <S.Title>{'GOLD'}</S.Title>
            </S.DarkBlueItem>
            <S.DarkBlueItem>
              <S.Score>{`${data?.winRate}%`}</S.Score>
              <S.Nth>{setRank(data?.winRateRank)}</S.Nth>
              <S.Title>{'WINRATE'}</S.Title>
            </S.DarkBlueItem>
          </S.DarkBlue>
        )}
        <S.Years>{year}</S.Years>
        <S.Seasons>{season}</S.Seasons>
      </>
    </S.Wrapper>
  );
};

export default PlayerCard;
