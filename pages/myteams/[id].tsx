import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { S } from '@styles/myteams/id';

function MyTeamDetail() {
  const { data: session, status } = useSession();
  console.log(session);
  const router = useRouter();
  const { id } = router.query;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR(`/api/post/bestplayer?id=${id}`, fetcher);
  const [isEdit, setIsEdit] = useState(false);
  console.log(data);
  const [playerDescription, setPlayerDescription] = useState('');
  const [playerData, setPlayerData] = useState<any>();
  useEffect(() => {
    const list = data?.players?.playerList;
    setPlayerData(list ? [...list] : []);
    setPlayerDescription(data?.players?.description);
    if (session?.id === data?.players?.userId && status === 'authenticated') {
      setIsEdit(true);
    }
  }, [data, status]);
  console.log(isEdit);
  return (
    <S.Container>
      {isLoading ? (
        'loading...'
      ) : (
        <>
          <S.Item>
            {playerData?.map((player) => {
              return (
                <S.ImageBox key={player.line}>
                  <S.Line line={player.line}></S.Line>
                  <S.Profile bg={player.name}></S.Profile>
                  <S.YearAndSeason>{`${player.year} ${player.season}`}</S.YearAndSeason>
                </S.ImageBox>
              );
            })}
          </S.Item>
          <S.Item>{playerDescription}</S.Item>
          <S.Item></S.Item>
          <Link
            href={{
              pathname: `/myteams/edit`,
              query: { playerData: JSON.stringify(playerData), playerDescription, id: id },
            }}
            as={`/myteams/edit`}
            passHref
            legacyBehavior
          >
            <S.Post isEdit={isEdit}></S.Post>
          </Link>
        </>
      )}
    </S.Container>
  );
}

export default MyTeamDetail;
