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

function Home() {
  const Years = [
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
  ];
  const Seasons = ['Spring', 'Summer', 'World'];
  const playersName = [
    'ambition',
    'bang',
    'bdd',
    'bengi',
    'beryL',
    'canyon',
    'chovy',
    'crown',
    'cuvee',
    'deft',
    'faker',
    'flame',
    'fly',
    'gorilla',
    'imp',
    'kakao',
    'khan',
    'kuro',
    'madlife',
    'marin',
    'mata',
    'nuguri',
    'pawn',
    'peanut',
    'pray',
    'rascal',
    'ruler',
    'score',
    'showmaker',
    'shy',
    'smeb',
    'ssumday',
    'tarzan',
    'teddy',
    'viper',
    'wolf',
  ];
  return (
    <Container>
      <Item>
        <InputPlayer>
          <Search>
            <Input list="players" placeholder="선수입력" />
            <Error>{}</Error>
            <DataList id="players">
              {playersName.map((name) => (
                <option value={name} key={name}></option>
              ))}
            </DataList>
            <Input list="years" placeholder="연도입력"></Input>
            <DataList id="years">
              {Years.map((years) => (
                <option value={years} key={years}></option>
              ))}
            </DataList>
            <Error>{}</Error>
            <Input list="seasons" placeholder="시즌입력"></Input>
            <DataList id="seasons">
              {Seasons.map((years) => (
                <option value={years} key={years}></option>
              ))}
            </DataList>
            <Error>{}</Error>
            <Button>
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
        </InputPlayer>
      </Item>
      <Item>
        <ChartText>
          ※13-14 시즌 선수들은 15시즌 이후 선수들과 비교가 불가능합니다.
        </ChartText>
        <ChartText2>
          ex)13페이커와 21쇼메이커 비교 불가(지표 기준이 다름)
        </ChartText2>
        <Chart></Chart>
      </Item>
      <Item>
        <InputPlayer>
          {
            <Search>
              <Input list="players2" placeholder="선수입력" />
              <DataList id="players2">
                {playersName.map((name) => (
                  <option value={name} key={Math.random()}></option>
                ))}
              </DataList>
              <Error>{}</Error>
              <Input list="years2" placeholder="연도입력"></Input>
              <DataList id="years2">
                {Years.map((years) => (
                  <option value={years} key={Math.random()}></option>
                ))}
              </DataList>
              <Error>{}</Error>
              <Input list="seasons2" placeholder="시즌입력"></Input>
              <DataList id="seasons2">
                {Seasons.map((years) => (
                  <option value={years} key={Math.random()}></option>
                ))}
              </DataList>
              <Error>{}</Error>
              <Button>
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
          }
        </InputPlayer>
      </Item>
    </Container>
  );
}
export default Home;
