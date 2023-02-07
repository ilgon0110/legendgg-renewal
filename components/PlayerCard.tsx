import Image from 'next/image';
import styled from 'styled-components';
import { IplayerData } from '../pages/stats/[id]';
import { setRank } from '../utilities';
import { media } from '../styles/theme';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  border: 1px solid green;
`;
const Profile = styled.div`
  position: relative;
  margin: 0 auto;
  width: 170px;
  height: 227px;
  ${() => media.mobile} {
    width: 51px;
    height: 69px;
  }
`;
const Logo = styled.div`
  position: relative;
  margin: 0 auto;
  width: 32px;
  height: 32px;
  ${() => media.mobile} {
    width: 16px;
    height: 16px;
  }
`;
const LogoName = styled.h1`
  position: relative;
  text-align: center;
  color: white;
  font-size: 12px;
  font-weight: 300;
  opacity: 0.7;
  margin-bottom: 8px;
  ${() => media.mobile} {
    font-size: 8px;
  }
`;
const DarkBlue = styled.div`
  position: relative;
  background: #0a2742;
  border-radius: 12px;
  width: 100%;
  height: 222px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-around;
  color: white;
  margin-bottom: 4px;
  ${() => media.mobile} {
    height: 152px;
  }
`;
const DarkBlueItem = styled.div`
  position: relative;
  width: 33%;
  text-align: center;
  grid-column: span 1;
`;
const Score = styled.h1`
  margin-bottom: 2px;
  color: #008ffb;
  font-weight: 600;
`;
const Nth = styled.h1`
  font-size: 12px;
  opacity: 0.7;
  margin-bottom: 10px;
  font-weight: lighter;
`;
const Title = styled.h1`
  font-size: 12px;
`;
const Years = styled.span`
  position: relative;
  color: white;
  padding-right: 12px;
`;
const Seasons = styled.span`
  position: relative;
  color: white;
`;

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
    <Wrapper>
      <>
        <Profile>
          <Image
            src={`/imgs/profiles/${name}.png`}
            alt={'profile'}
            fill
            sizes="100%"
            quality={100}
            priority
          />
        </Profile>
        <Logo>
          <Image
            src={`/imgs/team_logos/${data?.team}.png`}
            alt={'profile'}
            fill
            sizes="100%"
            quality={100}
            priority
          />
        </Logo>
        <LogoName>{data?.team}</LogoName>
        {Number(year) >= 2015 ? (
          <DarkBlue>
            <DarkBlueItem>
              <Score>{data?.winRate}</Score>
              <Nth>{setRank(data?.winRateRank)}</Nth>
              <Title>{'WIN'}</Title>
            </DarkBlueItem>
            <DarkBlueItem>
              <Score>{data?.kda}</Score>
              <Nth>{setRank(data?.kdaRank)}</Nth>
              <Title>{'KDA'}</Title>
            </DarkBlueItem>
            <DarkBlueItem>
              <Score>{data?.gd10}</Score>
              <Nth>{setRank(data?.gd10Rank)}</Nth>
              <Title>{'GD@10'}</Title>
            </DarkBlueItem>
            <DarkBlueItem>
              <Score>{data?.cs10}</Score>
              <Nth>{setRank(data?.cs10Rank)}</Nth>
              <Title>{'CS@10'}</Title>
            </DarkBlueItem>
            <DarkBlueItem>
              <Score>{`${data?.dpm}`}</Score>
              <Nth>{setRank(data?.dpmRank)}</Nth>
              <Title>{'DPM'}</Title>
            </DarkBlueItem>
            <DarkBlueItem>
              <Score>{`${data?.dmg}%`}</Score>
              <Nth>{setRank(data?.dmgRank)}</Nth>
              <Title>{'DMG'}</Title>
            </DarkBlueItem>
          </DarkBlue>
        ) : (
          <DarkBlue>
            <DarkBlueItem>
              <Score>{data?.winRate}</Score>
              <Nth>{setRank(data?.winRateRank)}</Nth>
              <Title>{'WIN'}</Title>
            </DarkBlueItem>
            <DarkBlueItem>
              <Score>{data?.kda}</Score>
              <Nth>{setRank(data?.kdaRank)}</Nth>
              <Title>{'KDA'}</Title>
            </DarkBlueItem>
            <DarkBlueItem>
              <Score>{data?.kp}</Score>
              <Nth>{setRank(data?.kpRank)}</Nth>
              <Title>{'KP'}</Title>
            </DarkBlueItem>
            <DarkBlueItem>
              <Score>{data?.dth}</Score>
              <Nth>{setRank(data?.dthRank)}</Nth>
              <Title>{'DTH'}</Title>
            </DarkBlueItem>
            <DarkBlueItem>
              <Score>{`${data?.gold}%`}</Score>
              <Nth>{setRank(data?.goldRank)}</Nth>
              <Title>{'GOLD'}</Title>
            </DarkBlueItem>
            <DarkBlueItem>
              <Score>{`${data?.winRate}%`}</Score>
              <Nth>{setRank(data?.winRateRank)}</Nth>
              <Title>{'WINRATE'}</Title>
            </DarkBlueItem>
          </DarkBlue>
        )}
        <Years>{year}</Years>
        <Seasons>{season}</Seasons>
      </>
    </Wrapper>
  );
};

export default PlayerCard;
