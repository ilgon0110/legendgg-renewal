import Link from 'next/link';
import styled from 'styled-components';

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

export default function MyTeams() {
  return (
    <Container>
      <Link href={'/myteams/post'} passHref legacyBehavior>
        <Post />
      </Link>
      {[1, 2, 3].map((v) => (
        <Item key={v}>
          <Link href={'/myteams/12'}>
            <ImageBox></ImageBox>
          </Link>
          <TextBox>
            <Link href={'/myteams/12'} legacyBehavior>
              <Title>삼청동데프트님의 팀</Title>
            </Link>
            <EmojiBox>
              <span>🤍</span>
              <span>13</span>
            </EmojiBox>
          </TextBox>
        </Item>
      ))}
    </Container>
  );
}
