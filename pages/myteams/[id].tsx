import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { S } from '@styles/myteams/id';
import { fetcher } from '@utilities/index';

function MyTeamDetail() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useSWR<IBestPlayerData>(`/api/post/bestplayer?id=${id}`, fetcher);
  const [isEdit, setIsEdit] = useState(false);
  const [playerDescription, setPlayerDescription] = useState('');
  const [playerData, setPlayerData] = useState<any[]>();
  const PLAYER_ORDER = { top: 0, jungle: 1, mid: 2, bot: 3, support: 4 };
  useEffect(() => {
    const list = data?.players?.playerList
      .map((v) => {
        return { ...v, order: PLAYER_ORDER[v.line as keyof typeof PLAYER_ORDER] };
      })
      .sort((a, b) => a.order - b.order);
    setPlayerData(list ? [...list] : []);
    setPlayerDescription(data?.players?.description ?? '');
    if (session?.id === data?.players?.userId && status === 'authenticated') {
      setIsEdit(true);
    }
  }, [data, status]);

  return (
    <S.Container>
      {isLoading ? (
        'loading...'
      ) : (
        <>
          <S.Item>
            {playerData?.map((player: any) => {
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

interface IBestPlayerData {
  ok: boolean;
  players: {
    description: string;
    playerList: {
      line: string;
      name: string;
      year: string;
      season: string;
    }[];
    userId: string;
  } | null;
}
