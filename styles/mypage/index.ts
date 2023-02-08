import styled from 'styled-components';
import { media } from '@styles/theme';
import { IStyle } from '@styles/stats';

export const S: IStyle = {};

S.Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  padding-top: 56px;
  padding-left: 60px;
  padding-right: 60px;
  column-gap: 30px;
  margin: 0 auto;
  box-sizing: border-box;
`;

S.Item = styled.div`
  width: 100%;
  margin-top: 48px;
  grid-column: span 4;
  height: 288px;
  background: white;
`;

S.Post = styled.div`
  position: absolute;
  right: 10%;
  width: 101px;
  height: 34px;
  background: url('${process.env.PUBLIC_URL}/imgs/post-button.png');
  background-size: cover;
`;
S.ImageBox = styled.div`
  width: 100%;
  height: 70%;
  background-color: red;
`;

S.TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
`;
S.Title = styled.span`
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;
S.EmojiBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span:first-child {
    font-size: 24px;
    cursor: pointer;
  }
`;
S.LogOut = styled.div`
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
