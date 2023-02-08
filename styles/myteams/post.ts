import styled from 'styled-components';
import { media } from '@styles/theme';
import { IStyle } from '@styles/stats';

export const S: IStyle = {};

S.Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  justify-content: center;
  grid-template-rows: fit-content();
`;

S.Item = styled.div`
  position: relative;
  margin-top: 56px;
  margin-left: 15%;
  margin-right: 15%;
  &:nth-child(1) {
    display: flex;
  }
  &:nth-child(2) {
    font-size: 16px;
  }
  &:nth-child(3) {
  }
`;

S.ImageBox = styled.div`
  width: 227px;
  height: 300px;
  margin: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

S.Line = styled.div<{ line: string }>`
  width: 32px;
  height: 32px;
  background: url('${process.env.PUBLIC_URL}/imgs/${(props) => props.line}.png');
  background-size: cover;
  margin-bottom: 4px;
`;

S.Profile = styled.div`
  width: 100%;
  height: 70%;
  background: #547189;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: white;
`;
S.Description = styled.div`
  color: white;
  box-sizing: border-box;
  h1 {
    margin-bottom: 12px;
  }
  textarea {
    width: 100%;
    font-family: 'NanumSquare', sans-serif;
    font-size: 14px;
    resize: none;
  }
`;

S.Post = styled.button`
  width: 101px;
  height: 34px;
  background: url('${process.env.PUBLIC_URL}/imgs/post-button.png');
  background-size: cover;
`;

S.ProfileBox = styled.div<{ name: string }>`
  width: 80%;
  height: 60%;
  background: url('${process.env.PUBLIC_URL}/imgs/profiles/${(props) => props.name}.png');
  background-size: cover;
  background-position: center;
`;
S.ProfileText = styled.div`
  color: white;
  font-size: 16px;
  margin-top: 8px;
`;
S.Button = styled.div`
  width: 32px;
  height: 32px;
  margin-bottom: 8px;
  cursor: pointer;
`;
