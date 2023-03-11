import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { chartActions, playersActions, IRootState } from '@store/index';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { IplayerData } from '@pages/stats/[id]';
import PlayerCard from '@components/PlayerCard';

const PlayerCard1Container = () => {
  const dispatch = useDispatch();
  const { playerOneName, playerOneYear, playerOneSeason } = useSelector((state: IRootState) => state.players);
  const [playerData, setPlayerData] = useState<IplayerData>();
  const { data, isLoading, error } = useSWR(`/api/player?name=${playerOneName}`);
  useEffect(() => {
    setPlayerData(data ? data[playerOneYear][playerOneSeason] : undefined);
    dispatch(chartActions.playerOneChart(playerData));
  }, [data, playerData]);
  return (
    <>
      {!playerData ? (
        'loading..'
      ) : (
        <>
          <Button
            onClick={() => {
              dispatch(
                playersActions.playerOneSelect({
                  isSelect: false,
                  name: '',
                  year: '',
                  season: '',
                }),
              );
              dispatch(chartActions.playerOneReset());
            }}
          >
            <svg
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 1000 1000"
              enableBackground="new 0 0 1000 1000"
            >
              <g>
                <path d="M864.2,559.6c0,201.3-162.9,364.2-364.2,364.2S135.8,760.9,135.8,559.6c0-201.3,162.9-364.2,364.2-364.2c25.2,0,49,2.6,72.8,7.9l-94,94l46.4,46.4L692,176.9L525.2,10l-46.4,46.4l76.8,76.8c-18.5-1.3-37.1-4-55.6-4c-237.1,0-430.4,193.4-430.4,430.4C69.6,796.6,262.9,990,500,990c237.1,0,430.4-193.4,430.4-430.4H864.2z" />
              </g>
            </svg>
          </Button>
          <PlayerCard name={playerOneName} year={playerOneYear} season={playerOneSeason} data={playerData}></PlayerCard>
        </>
      )}
    </>
  );
};

export default PlayerCard1Container;

const Button = styled.button`
  display: block;
  margin: 0 auto;
  margin-bottom: 12px;
  border-radius: 50%;
  border: none;
  box-shadow: 0px 0px 6px #00000029;

  svg {
    width: 25px;
    height: 25px;
  }
`;
