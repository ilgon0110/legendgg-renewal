import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import NoCompared from '@components/NoCompared';
import PlayerChart from '@components/PlayerChart';
import PlayerCard1Container from '@controllers/PlayerCard1Container';
import PlayerCard2Container from '@controllers/PlayerCard2Container';
import { IRootState, playersActions } from '@store/index';
import { S } from '@styles/players';
import ResetSvg from 'assets/ResetSvg';
import SearchSvg from 'assets/SearchSvg';

function Players() {
  const {
    playersSlice: { years, names: playersName, seasons },
    players: { isPlayerOneSelect, isPlayerTwoSelect, playerOneYear, playerTwoYear },
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
    <S.Container>
      <S.Item>
        <S.InputPlayer>
          {isPlayerOneSelect ? (
            <PlayerCard1Container />
          ) : (
            <S.Search onSubmit={handleSubmit(PlayerOneOnValid)}>
              <S.Input {...register('players')} list="players" placeholder="선수입력" />
              <S.DataList id="players">
                {playersName.map((name) => (
                  <option value={name} key={name}></option>
                ))}
              </S.DataList>
              <S.Error>{errors.players?.message}</S.Error>
              <S.Input {...register('years')} list="years" placeholder="연도입력"></S.Input>
              <S.DataList id="years">
                {years.map((year) => (
                  <option value={year} key={year}></option>
                ))}
              </S.DataList>
              <S.Error>{errors?.years?.message}</S.Error>
              <S.Input {...register('seasons')} list="seasons" placeholder="시즌입력"></S.Input>
              <S.DataList id="seasons">
                {seasons.map((season) => (
                  <option value={season} key={season}></option>
                ))}
              </S.DataList>
              <S.Error>{errors?.seasons?.message}</S.Error>
              <S.Button onClick={handleSubmit(PlayerOneOnValid)}>
                <SearchSvg />
              </S.Button>
              <S.Button type="reset">
                <ResetSvg />
              </S.Button>
            </S.Search>
          )}
        </S.InputPlayer>
      </S.Item>
      <S.Item>
        <S.ChartText>{' ※13-14 시즌 선수들은 15시즌 이후 선수들과 비교가 불가능합니다.'}</S.ChartText>
        <S.ChartText2>{'ex)13페이커와 21쇼메이커 비교 불가(지표 기준이 다름)'}</S.ChartText2>
        <S.Chart>{isValidYear(playerOneYear, playerTwoYear) ? <PlayerChart /> : <NoCompared />}</S.Chart>
      </S.Item>
      <S.Item>
        <S.InputPlayer>
          {isPlayerTwoSelect ? (
            <PlayerCard2Container />
          ) : (
            <S.Search onSubmit={handleSubmit(PlayerTwoOnValid)}>
              <S.Input {...register('playerTwo')} list="players2" placeholder="선수입력" />
              <S.DataList id="players2">
                {playersName.map((name) => (
                  <option value={name} key={name}></option>
                ))}
              </S.DataList>
              <S.Error>{errors?.playerTwo?.message}</S.Error>
              <S.Input {...register('yearTwo')} list="years2" placeholder="연도입력"></S.Input>
              <S.DataList id="years2">
                {years.map((year) => (
                  <option value={year} key={year}></option>
                ))}
              </S.DataList>
              <S.Error>{errors?.yearTwo?.message}</S.Error>
              <S.Input {...register('seasonTwo')} list="seasons2" placeholder="시즌입력"></S.Input>
              <S.DataList id="seasons2">
                {seasons.map((season) => (
                  <option value={season} key={season}></option>
                ))}
              </S.DataList>
              <S.Error>{errors?.seasonTwo?.message}</S.Error>
              <S.Button onClick={handleSubmit(PlayerTwoOnValid)}>
                <SearchSvg />
              </S.Button>
              <S.Button type="reset">
                <ResetSvg />
              </S.Button>
            </S.Search>
          )}
        </S.InputPlayer>
      </S.Item>
    </S.Container>
  );
}
export default Players;

interface PlayerData {
  players: string;
  years: string;
  seasons: string;
  playerTwo: string;
  yearTwo: string;
  seasonTwo: string;
}
