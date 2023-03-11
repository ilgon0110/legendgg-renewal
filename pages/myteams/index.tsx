import Link from 'next/link';
import { S } from '@styles/myteams';
import useSWR from 'swr';

export default function MyTeams() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR('/api/myteams', fetcher);

  return (
    <S.Container>
      {isLoading ? (
        'loading...'
      ) : (
        <>
          <Link href={'/myteams/post'} passHref legacyBehavior>
            <S.Post />
          </Link>
          {data?.allPlayers.map((players: any) => (
            <S.Item key={players.id}>
              <Link href={`/myteams/${players.id}`}>
                <S.ImageBox></S.ImageBox>
              </Link>
              <S.TextBox>
                <Link href={`/myteams/${players.id}`} legacyBehavior>
                  <S.Title>{players.description}</S.Title>
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
}
