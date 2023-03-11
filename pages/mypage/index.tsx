import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { S } from '@styles/mypage';
import useSWR from 'swr';
import { BestPlayer } from '@prisma/client';
import { fetcher } from '@utilities/index';

const MyPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session && status !== 'loading') router.push('/');
  }, [session]);
  const { data, isLoading } = useSWR<IMyData>(`/api/mypage?id=${session?.id}`, fetcher);

  return (
    <S.Container>
      {isLoading ? (
        'loading...'
      ) : (
        <>
          <S.LogOut onClick={() => signOut()}>로그아웃</S.LogOut>
          {data?.bestPlayer.map((player) => (
            <S.Item key={player.id}>
              <Link href={`/myteams/${player.id}`}>
                <S.ImageBox></S.ImageBox>
              </Link>
              <S.TextBox>
                <Link href={`/myteams/${player.id}`} legacyBehavior>
                  <S.Title>{`${session?.user?.name}님의 팀`}</S.Title>
                </Link>
                <S.EmojiBox>
                  <span>🤍</span>
                  <span>13</span>
                </S.EmojiBox>
              </S.TextBox>
            </S.Item>
          ))}
        </>
      )}
    </S.Container>
  );
};

export default MyPage;

interface IMyData {
  ok: boolean;
  bestPlayer: BestPlayer[];
}
