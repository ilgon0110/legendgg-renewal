import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import NoCompared from '../../components/NoCompared';
import PlayerChart from '../../components/PlayerChart';
import PlayerCard1Container from '../../controllers/PlayerCard1Container';
import PlayerCard2Container from '../../controllers/PlayerCard2Container';
import { IRootState, playersActions } from '../../store';
import {
  Container,
  Item,
  InputPlayer,
  Search,
  Input,
  Error,
  DataList,
  Button,
  ChartText,
  ChartText2,
  Chart,
} from '../../styles/players';

interface PlayerData {
  players: string;
  years: string;
  seasons: string;
  playerTwo: string;
  yearTwo: string;
  seasonTwo: string;
}

function Players() {
  const {
    playersSlice: { years, names: playersName, seasons },
    players: {
      isPlayerOneSelect,
      isPlayerTwoSelect,
      playerOneYear,
      playerTwoYear,
    },
  } = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<PlayerData>();
  const PlayerOneOnValid = (event: PlayerData) => {
    if (!playersName.includes(event.players)) {
      setError('players', { message: '없거나 잘못된 선수 이름입니다.' });
      return;
    }
    if (!years.includes(event.years)) {
      setError('years', { message: '없거나 잘못된 연도입니다.' });
      return;
    }
    if (!seasons.includes(event.seasons)) {
      setError('seasons', { message: '없거나 잘못된 시즌입니다.' });
      return;
    }
    dispatch(
      playersActions.playerOneSelect({
        isSelect: true,
        name: event.players,
        year: event.years,
        season: event.seasons,
      }),
    );
  };

  const PlayerTwoOnValid = (event: PlayerData) => {
    if (!playersName.includes(event.playerTwo)) {
      setError('playerTwo', { message: '없거나 잘못된 선수 이름입니다.' });
      return;
    }
    if (!years.includes(event.yearTwo)) {
      setError('yearTwo', { message: '없거나 잘못된 연도입니다.' });
      return;
    }
    if (!seasons.includes(event.seasonTwo)) {
      setError('seasonTwo', { message: '없거나 잘못된 시즌입니다.' });
      return;
    }
    dispatch(
      playersActions.playerTwoSelect({
        isSelect: true,
        name: event.playerTwo,
        year: event.yearTwo,
        season: event.seasonTwo,
      }),
    );
  };
  useEffect(() => {
    setValue('players', '');
    setValue('seasons', '');
    setValue('years', '');
  }, [isPlayerOneSelect]);
  useEffect(() => {
    setValue('playerTwo', '');
    setValue('seasonTwo', '');
    setValue('yearTwo', '');
  }, [isPlayerTwoSelect]);

  const isValidYear = (yearOne: string, yearTwo: string) => {
    if (yearOne === '' || yearTwo === '') return true;
    if (Number(yearOne) < 2015 && Number(yearTwo) >= 2015) return false;
    if (Number(yearOne) >= 2015 && Number(yearTwo) < 2015) return false;
    return true;
  };
  return (
    <Container>
      <Item>
        <InputPlayer>
          {isPlayerOneSelect ? (
            <PlayerCard1Container />
          ) : (
            <Search onSubmit={handleSubmit(PlayerOneOnValid)}>
              <Input
                {...register('players')}
                list="players"
                placeholder="선수입력"
              />
              <DataList id="players">
                {playersName.map((name) => (
                  <option value={name} key={name}></option>
                ))}
              </DataList>
              <Error>{errors.players?.message}</Error>
              <Input
                {...register('years')}
                list="years"
                placeholder="연도입력"
              ></Input>
              <DataList id="years">
                {years.map((year) => (
                  <option value={year} key={year}></option>
                ))}
              </DataList>
              <Error>{errors?.years?.message}</Error>
              <Input
                {...register('seasons')}
                list="seasons"
                placeholder="시즌입력"
              ></Input>
              <DataList id="seasons">
                {seasons.map((season) => (
                  <option value={season} key={season}></option>
                ))}
              </DataList>
              <Error>{errors?.seasons?.message}</Error>
              <Button onClick={handleSubmit(PlayerOneOnValid)}>
                <svg
                  fill="white"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
              <Button type="reset">
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
            </Search>
          )}
        </InputPlayer>
      </Item>
      <Item>
        <ChartText>
          {' ※13-14 시즌 선수들은 15시즌 이후 선수들과 비교가 불가능합니다.'}
        </ChartText>
        <ChartText2>
          {'ex)13페이커와 21쇼메이커 비교 불가(지표 기준이 다름)'}
        </ChartText2>
        <Chart>
          {isValidYear(playerOneYear, playerTwoYear) ? (
            <PlayerChart />
          ) : (
            <NoCompared />
          )}
        </Chart>
      </Item>
      <Item>
        <InputPlayer>
          {isPlayerTwoSelect ? (
            <PlayerCard2Container />
          ) : (
            <Search onSubmit={handleSubmit(PlayerTwoOnValid)}>
              <Input
                {...register('playerTwo')}
                list="players2"
                placeholder="선수입력"
              />
              <DataList id="players2">
                {playersName.map((name) => (
                  <option value={name} key={name}></option>
                ))}
              </DataList>
              <Error>{errors?.playerTwo?.message}</Error>
              <Input
                {...register('yearTwo')}
                list="years2"
                placeholder="연도입력"
              ></Input>
              <DataList id="years2">
                {years.map((year) => (
                  <option value={year} key={year}></option>
                ))}
              </DataList>
              <Error>{errors?.yearTwo?.message}</Error>
              <Input
                {...register('seasonTwo')}
                list="seasons2"
                placeholder="시즌입력"
              ></Input>
              <DataList id="seasons2">
                {seasons.map((season) => (
                  <option value={season} key={season}></option>
                ))}
              </DataList>
              <Error>{errors?.seasonTwo?.message}</Error>
              <Button onClick={handleSubmit(PlayerTwoOnValid)}>
                <svg
                  fill="white"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
              <Button type="reset">
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
            </Search>
          )}
        </InputPlayer>
      </Item>
    </Container>
  );
}
export default Players;
