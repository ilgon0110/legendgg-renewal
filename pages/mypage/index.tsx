import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { S } from '@styles/mypage';
import useSWR, { useSWRConfig } from 'swr';

const MyPage = () => {
  const { data: session, status } = useSession();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const router = useRouter();
  useEffect(() => {
    if (!session && status !== 'loading') router.push('/');
  }, [session]);
  const id = session?.id;
  const { data, isLoading } = useSWR(`/api/mypage?id=${id}`, fetcher);
  return (
    <S.Container>
      {isLoading ? (
        'loading...'
      ) : (
        <>
          <S.LogOut onClick={() => signOut()}>로그아웃</S.LogOut>
          {data?.bestPlayer.map((v) => (
            <S.Item key={v.id}>
              <Link href={`/myteams/${v.id}`}>
                <S.ImageBox></S.ImageBox>
              </Link>
              <S.TextBox>
                <Link href={`/myteams/${v.id}`} legacyBehavior>
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
