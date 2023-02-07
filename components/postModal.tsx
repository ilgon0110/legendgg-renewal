import NoData from '@components/NoData';
import { IRootState, postModalActions } from '@store/index';
import { media } from '@styles/theme';
import { setRank } from '@utilities/index';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { createContext } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { IplayerData } from '@pages/stats/[id]';

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 550px;
  border: 2px solid red;
  background: black;
`;

const Item = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  background: white;
  border-radius: 12px;
`;

const Title = styled.h1`
  padding: 16px 0px;
  font-size: 20px;
  font-weight: 600;
  margin-left: 5%;
  color: black;
`;

export const SeasonNavbar = styled.div`
  background-color: transparent;
  width: 100%;
  height: 40px;
  z-index: 1;
  margin-left: 5%;
  ${() => media.mobile} {
    height: 30px;
  }
`;
export const NameSelect = styled.select`
  color: black;
  border: none;
  background: transparent;
  font-size: 24px;
  &:focus {
    border: none;
  }
  &:active {
    border: none;
  }
  option {
    display: block;
    background-color: rgba(0, 0, 0, 0);
    color: black;
  }
  ${() => media.tablet} {
    font-size: 20px;
  }
  ${() => media.mobile} {
    font-size: 16px;
    margin-left: 16px;
  }
`;

export const SeasonSelect = styled.span<{ opacity: number }>`
  font-size: 20px;
  color: black;
  padding: 32px;
  font-weight: normal;
  opacity: ${(props) => props.opacity};
  &:hover {
    cursor: pointer;
  }

  ${() => media.tablet} {
    font-size: 16px;
    padding: 20px;
  }
  ${() => media.mobile} {
    font-size: 12px;
    padding: 14px;
  }
`;
const StatBox = styled.div`
  position: relative;
  margin: 0 auto;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 152px;
  background: #0a2742;
  border-radius: 12px;
  color: white;
  align-items: center;
  ${() => media.mobile} {
    height: 100px;
    grid-template-rows: 100px;
  }
  div {
    position: relative;
    text-align: center;
    h1:first-child {
      font-size: 24px;
      color: ${(props) => props.theme.color.mint};
      font-weight: 600;
      padding-bottom: 4px;
      ${() => media.tablet} {
        font-size: 22px;
      }
      ${() => media.mobile} {
        font-size: 16px;
      }
    }
    h1:nth-child(2) {
      font-size: 16px;
      font-weight: 300;
      opacity: 0.8;
      padding-bottom: 20px;
      ${() => media.tablet} {
        font-size: 16px;
      }
      ${() => media.mobile} {
        font-size: 10px;
      }
    }
    h1:last-child {
      font-size: 16px;
      ${() => media.tablet} {
        font-size: 16px;
      }
      ${() => media.mobile} {
        font-size: 10px;
      }
    }
    &:first-child {
      grid-column: span 1;
    }
    &:last-child {
      grid-column: span 1;
    }
  }
`;
const CareerText = styled.h1`
  position: relative;
  color: white;
  margin-top: 68px;
  font-size: 20px;
  ${() => media.mobile} {
    font-size: 12px;
  }
`;
const CareerBox = styled.div`
  display: grid;
  width: 90%;
  margin: 0 auto;
  margin-top: 24px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 172px;
  column-gap: 30px;
  color: white;
  text-align: center;
  ${() => media.mobile} {
    column-gap: 12px;
    height: 120px;
    grid-template-rows: 120px;
  }
  div {
    position: relative;
    border-radius: 12px;
    font-size: 16px;
    ${() => media.tablet} {
      font-size: 14px;
    }

    h1:first-child {
      margin-top: 60px;
      font-size: 24px;
      color: ${(props) => props.theme.color.mint};
      font-weight: 600;
      padding-bottom: 4px;
      ${() => media.tablet} {
        font-size: 22px;
      }
      ${() => media.mobile} {
        margin-top: 24px;
        font-size: 18px;
      }
    }
    h1:last-child {
      position: absolute;
      top: 80%;
      left: 50%;
      transform: translate(-50%, -50%);
      ${() => media.tablet} {
        font-size: 22px;
      }
      ${() => media.mobile} {
        font-size: 10px;
      }
    }
    &:first-child {
      grid-column: span 1;
    }
    &:last-child {
      grid-column: span 1;
    }
    background: #0a2742;
  }
`;
const Submit = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 24px;
  margin-bottom: 24px;
  button {
    width: 50%;
    height: 32px;
    border: 1px solid blue;
    border-radius: 12px;
  }
`;

const Radio = styled.input`
  appearance: none;
`;

function PostModal({ line }: { line: string }) {
  const dispatch = useDispatch();
  const [playerInfo, setPlayerInfo] = useState({ name: 'ambition', year: '2013', season: 'spring' });
  const { data, isLoading } = useSWR(`/api/player?name=${playerInfo.name}`);
  console.log(data);
  const playerData = data ? data[playerInfo.year][playerInfo.season] : {};
  const { mutate } = useSWRConfig();
  useEffect(() => {
    mutate(`/api/player?name=${playerInfo.name}`);
  }, [playerInfo.name]);
  const {
    playersSlice: { years, names, seasons },
  } = useSelector((state: IRootState) => state);
  const handleName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPlayerInfo((prev) => {
      return { ...prev, name: event.target.value };
    });
  };
  const handleYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPlayerInfo((prev) => {
      return { ...prev, year: event.target.value };
    });
  };
  const handleSeason = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetSeason = event.target.value.toLowerCase();
    changeSeasonOpacity(targetSeason);
    setPlayerInfo((prev) => {
      return { ...prev, season: event.target.value };
    });
  };
  const [seasonOpacity, setSeasonOpacity] = useState({
    spring: 1,
    summer: 0.5,
    world: 0.5,
  });
  const changeSeasonOpacity = (season: string) => {
    let opacity = { spring: 0.5, summer: 0.5, world: 0.5 };
    opacity[season as keyof typeof opacity] = 1;
    setSeasonOpacity(opacity);
  };

  const onSubmit = () => {
    dispatch(postModalActions.setIsOpen(false));
    dispatch(postModalActions.playerSelect({ line: line, playerInfo, isSelected: true }));
  };
  return (
    <Container>
      <Item>
        <Title>{`최고의 ${line}을 선택해주세요.`}</Title>
        <SeasonNavbar>
          <NameSelect id="name" onChange={handleName}>
            {names.map((name) => (
              <option value={name} key={name}>
                {name}
              </option>
            ))}
          </NameSelect>
          <NameSelect id="year" onChange={handleYear}>
            {years.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </NameSelect>
          <label>
            <Radio type={'radio'} name={'season'} value={'spring'} defaultChecked onChange={handleSeason} />
            <SeasonSelect opacity={seasonOpacity.spring}>Spring</SeasonSelect>
          </label>
          <label>
            <Radio type={'radio'} name={'season'} value={'summer'} onChange={handleSeason} />
            <SeasonSelect opacity={seasonOpacity.summer}>Summer</SeasonSelect>
          </label>
          <label>
            <Radio type={'radio'} name={'season'} value={'world'} onChange={handleSeason} />
            <SeasonSelect opacity={seasonOpacity.world}>World</SeasonSelect>
          </label>
        </SeasonNavbar>
        {isLoading ? (
          'Loading...'
        ) : (
          <>
            {playerData?.winRate ? (
              <>
                {Number(playerInfo.year) < 2015 ? (
                  <StatBox>
                    <div>
                      <h1>{playerData.kda}</h1>
                      <h1>{setRank(playerData.kdaRank)}</h1>
                      <h1>KDA</h1>
                    </div>
                    <div>
                      <h1>{playerData.kp}</h1>
                      {<h1>{setRank(playerData.kpRank)}</h1>}
                      <h1>{'KP%'}</h1>
                    </div>
                    <div>
                      <h1>{playerData.dth}</h1>
                      {<h1>{setRank(playerData.dthRank)}</h1>}
                      <h1>{'DTH%'}</h1>
                    </div>
                    <div>
                      <h1>{playerData.gold}</h1>
                      {<h1>{setRank(playerData.goldRank)}</h1>}
                      <h1>{'GOLD%'}</h1>
                    </div>
                    <div>
                      <h1>{playerData.winRate}</h1>
                      {<h1>{setRank(playerData.winRateRank)}</h1>}
                      <h1>{'WINRATE%'}</h1>
                    </div>
                  </StatBox>
                ) : (
                  <StatBox>
                    <div>
                      <h1>{playerData.kda}</h1>
                      <h1>{setRank(playerData.kdaRank)}</h1>
                      <h1>KDA</h1>
                    </div>
                    <div>
                      <h1>{playerData.gd10}</h1>
                      {<h1>{setRank(playerData.gd10Rank)}</h1>}
                      <h1>{'GD@10'}</h1>
                    </div>
                    <div>
                      <h1>{playerData.cs10}</h1>
                      {<h1>{setRank(playerData.cs10Rank)}</h1>}
                      <h1>{'CS@10'}</h1>
                    </div>
                    <div>
                      <h1>{playerData.dpm}</h1>
                      {<h1>{setRank(playerData.dpmRank)}</h1>}
                      <h1>{'DPM'}</h1>
                    </div>
                    <div>
                      <h1>{playerData.dmg}</h1>
                      {<h1>{setRank(playerData.dmgRank)}</h1>}
                      <h1>{'DMG%'}</h1>
                    </div>
                  </StatBox>
                )}
                <CareerBox>
                  <div>
                    <h1>{setRank(playerData.groupRank)}</h1>
                    <h1>정규시즌</h1>
                  </div>
                  <div>
                    <h1>{setRank(playerData.playoffRank)}</h1>
                    <h1>플레이오프</h1>
                  </div>
                  <div>
                    <h1>{playerData.pogpoint == 99 ? 'World MVP' : setRank(playerData.pogpointRank)}</h1>
                    <h1>POG포인트</h1>
                  </div>
                </CareerBox>
              </>
            ) : (
              <NoData year={playerInfo.year} season={playerInfo.season}></NoData>
            )}
          </>
        )}
        <Submit>
          <button type="submit" onClick={onSubmit}>
            선택완료
          </button>
        </Submit>
      </Item>
    </Container>
  );
}

export default PostModal;
