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
  grid-column: span 4;
  height: 288px;
  border: 1px solid green;
`;

const ImageBox = styled.div``;
const Title = styled.span``;
const Emoji = styled.div``;

export default function MyTeams() {
  return (
    <Container>
      {[1, 2, 3].map((v) => (
        <Item key={v}>
          <ImageBox></ImageBox>
          <Title></Title>
          <Emoji></Emoji>
        </Item>
      ))}
    </Container>
  );
}
