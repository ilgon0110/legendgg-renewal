import { media } from '@styles/theme';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useSWR, { useSWRConfig } from 'swr';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  justify-content: center;
  grid-template-rows: fit-content();
`;

export const Item = styled.div`
  position: relative;
  margin-top: 56px;
  margin-left: 15%;
  margin-right: 15%;
  &:nth-child(1) {
    display: flex;

    border: 1px solid red;
  }
  &:nth-child(2) {
    border: 1px solid red;
    font-size: 16px;
  }
  &:nth-child(3) {
    border: 1px solid red;
  }
`;

const ImageBox = styled.div`
  width: 227px;
  height: 300px;
  margin: 12px;
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Line = styled.div<{ line: string }>`
  width: 32px;
  height: 32px;
  background: url('${process.env.PUBLIC_URL}/imgs/${(props) => props.line}.png');
  background-size: cover;
  margin-bottom: 4px;
`;

const Profile = styled.div<{ bg: string }>`
  width: 100%;
  height: 70%;
  background: url('${process.env.PUBLIC_URL}/imgs/profiles/${(props) => props.bg}.png');
  background-size: cover;
`;
const Logo = styled.div`
  width: 24px;
  height: 24px;
  background: url('${process.env.PUBLIC_URL}/imgs/team_logos/T1.png');
  background-size: cover;
`;
const YearAndSeason = styled.span`
  margin-top: 12px;
  font-size: 12px;
  color: white;
`;
function MyTeamDetail() {
  const router = useRouter();
  const { id } = router.query;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR(`/api/post/bestplayer?id=${id}`, fetcher);
  const [playerDescription, setPlayerDescription] = useState('');
  const [playerData, setPlayerData] = useState<any>();
  useEffect(() => {
    const list = data?.players?.playerList;
    setPlayerData(list ? [...list] : []);
    setPlayerDescription(data?.players?.description);
  }, [data]);

  return (
    <Container>
      {isLoading ? (
        'loading...'
      ) : (
        <>
          <Item>
            {playerData?.map((player) => {
              return (
                <ImageBox key={player.line}>
                  <Line line={player.line}></Line>
                  <Profile bg={player.name}></Profile>
                  <YearAndSeason>{`${player.year} ${player.season}`}</YearAndSeason>
                </ImageBox>
              );
            })}
          </Item>
          <Item>{playerDescription}</Item>
          <Item></Item>
        </>
      )}
    </Container>
  );
}

export default MyTeamDetail;
