import { DefaultSession } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';
import useSWR, { useSWRConfig } from 'swr';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  padding-top: 56px;
  padding-left: 60px;
  padding-right: 60px;
  column-gap: 30px;
  margin: 0 auto;
  border: 1px solid red;
  box-sizing: border-box;
`;

const Item = styled.div`
  width: 100%;
  margin-top: 48px;
  grid-column: span 4;
  height: 288px;
  border: 1px solid green;
  background: white;
`;

const Post = styled.div`
  position: absolute;
  right: 10%;
  width: 101px;
  height: 34px;
  background: url('${process.env.PUBLIC_URL}/imgs/post-button.png');
  background-size: cover;
`;
const ImageBox = styled.div`
  width: 100%;
  height: 70%;
  background-color: red;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
`;
const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;
const EmojiBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span:first-child {
    font-size: 24px;
    cursor: pointer;
  }
`;
const LogOut = styled.div`
  position: absolute;
  margin: 0 auto;
  left: 50%;
  right: 50%;
  width: 126px;
  height: 40px;
  border-radius: 24px;
  background: white;
  box-shadow: ${(props) => props.theme.boxShadow};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 32px;
  cursor: pointer;
`;

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
    <Container>
      {isLoading ? (
        'loading...'
      ) : (
        <>
          <LogOut onClick={() => signOut()}>로그아웃</LogOut>
          {data?.bestPlayer.map((v) => (
            <Item key={v.id}>
              <Link href={`/myteams/${v.id}`}>
                <ImageBox></ImageBox>
              </Link>
              <TextBox>
                <Link href={`/myteams/${v.id}`} legacyBehavior>
                  <Title>{`${session?.user?.name}님의 팀`}</Title>
                </Link>
                <EmojiBox>
                  <span>🤍</span>
                  <span>13</span>
                </EmojiBox>
              </TextBox>
            </Item>
          ))}
        </>
      )}
    </Container>
  );
};

export default MyPage;
