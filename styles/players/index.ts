import styled from 'styled-components';
import { media } from '@styles/theme';
import { IStyle } from '@styles/stats';

export const S: IStyle = {};

S.Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: grid;
  gap: 30px;
  margin: 0 auto;
  grid-template-columns: repeat(12, 1fr);
  ${() => media.tablet} {
    grid-template-columns: repeat(8, 1fr);
    gap: 0;
  }
  ${() => media.mobile} {
    overflow: visible;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 280px 400px;
    height: 100%;
    padding-top: 64px;
  }
`;
S.Item = styled.div`
  position: relative;
  &:nth-child(1) {
    grid-column: 1/4;
    ${() => media.tablet} {
      grid-column: span 2;
    }
    ${() => media.mobile} {
      grid-column: 1/3;
    }
  }
  &:nth-child(2) {
    grid-column: 4/10;
    padding-top: 56px;
    ${() => media.tablet} {
      grid-column: span 4;
    }
    ${() => media.mobile} {
      position: relative;
      height: 400px;
      order: 3;
    }
  }
  &:nth-child(3) {
    grid-column: 10/13;
    ${() => media.tablet} {
      grid-column: span 2;
    }
    ${() => media.mobile} {
      grid-column: 3/5;
    }
  }
`;
S.InputPlayer = styled.div`
  position: relative;
  width: 100%;
  height: 536px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  align-items: center;
  ${() => media.mobile} {
    top: 0%;
    left: 0%;
    transform: translate(0%, 0%);
  }
`;
S.Search = styled.form``;

S.Input = styled.input`
  position: relative;
  width: 80%;
  height: 32px;
  background: transparent;
  border: none;
  border-bottom: 1px solid white;
  color: white;
  top: 150px;
  margin-bottom: 24px;
  &::placeholder {
    color: white;
  }
  ${() => media.mobile} {
    top: 0px;
    margin-bottom: 16px;
  }
`;
S.Error = styled.span`
  display: block;
  position: relative;
  color: #fadc44;
  top: 130px;
  font-size: 10px;
  font-weight: lighter;
  text-align: left;
  margin-left: 27px;
  line-height: 10px;
`;
S.DataList = styled.datalist`
  color: white;
`;
S.ChartText = styled.h1`
  position: relative;
  text-align: center;
  color: white;
  line-height: 30px;
  font-size: 20px;
  top: 10%;
  ${() => media.tablet} {
    font-size: 14px;
    line-height: 24px;
  }
`;
S.ChartText2 = styled.h1`
  position: relative;
  text-align: center;
  color: ${(props) => props.theme.color.mint};
  font-size: 16px;
  font-weight: bold;
  top: 13%;
  ${() => media.tablet} {
    font-size: 12px;
    font-weight: normal;
  }
`;
S.Chart = styled.div`
  position: relative;
  width: 100%;
  height: 50%;
  top: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${() => media.mobile} {
    height: 100%;
  }
`;
S.Button = styled.button`
  position: relative;
  display: inline-block;
  margin: 0 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  top: 150px;
  box-shadow: 0px 0px 6px #00000029;
  svg {
    width: 25px;
    height: 25px;
  }
  ${() => media.mobile} {
    top: 8px;
    width: 24px;
    height: 24px;
  }
`;
