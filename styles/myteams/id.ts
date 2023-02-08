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

S.Profile = styled.div<{ bg: string }>`
  width: 100%;
  height: 70%;
  background: url('${process.env.PUBLIC_URL}/imgs/profiles/${(props) => props.bg}.png');
  background-size: cover;
`;
S.Logo = styled.div`
  width: 24px;
  height: 24px;
  background: url('${process.env.PUBLIC_URL}/imgs/team_logos/T1.png');
  background-size: cover;
`;
S.YearAndSeason = styled.span`
  margin-top: 12px;
  font-size: 12px;
  color: white;
`;
S.Post = styled.div<{ isEdit: boolean }>`
  position: relative;
  display: ${(props) => (props.isEdit ? 'block' : 'none')};
  margin: 0 auto;
  width: 101px;
  height: 34px;
  background: url('${process.env.PUBLIC_URL}/imgs/edit-button.png');
  background-size: cover;
`;
