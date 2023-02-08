import NoData from '@components/NoData';
import { IRootState, postModalActions } from '@store/index';
import { setRank } from '@utilities/index';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { S } from '@styles/components/postModal';
import useSWR, { useSWRConfig } from 'swr';

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
    <S.Container>
      <S.Item>
        <S.Title>{`최고의 ${line}을 선택해주세요.`}</S.Title>
        <S.SeasonNavbar>
          <S.NameSelect id="name" onChange={handleName}>
            {names.map((name) => (
              <option value={name} key={name}>
                {name}
              </option>
            ))}
          </S.NameSelect>
          <S.NameSelect id="year" onChange={handleYear}>
            {years.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </S.NameSelect>
          <label>
            <S.Radio type={'radio'} name={'season'} value={'spring'} defaultChecked onChange={handleSeason} />
            <S.SeasonSelect opacity={seasonOpacity.spring}>Spring</S.SeasonSelect>
          </label>
          <label>
            <S.Radio type={'radio'} name={'season'} value={'summer'} onChange={handleSeason} />
            <S.SeasonSelect opacity={seasonOpacity.summer}>Summer</S.SeasonSelect>
          </label>
          <label>
            <S.Radio type={'radio'} name={'season'} value={'world'} onChange={handleSeason} />
            <S.SeasonSelect opacity={seasonOpacity.world}>World</S.SeasonSelect>
          </label>
        </S.SeasonNavbar>
        {isLoading ? (
          'Loading...'
        ) : (
          <>
            {playerData?.winRate ? (
              <>
                {Number(playerInfo.year) < 2015 ? (
                  <S.StatBox>
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
                  </S.StatBox>
                ) : (
                  <S.StatBox>
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
                  </S.StatBox>
                )}
                <S.CareerBox>
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
                </S.CareerBox>
              </>
            ) : (
              <NoData year={playerInfo.year} season={playerInfo.season}></NoData>
            )}
          </>
        )}
        <S.Submit>
          <button type="submit" onClick={onSubmit}>
            선택완료
          </button>
        </S.Submit>
      </S.Item>
    </S.Container>
  );
}

export default PostModal;
