import styled from 'styled-components';
import { media } from '@styles/theme';
import { IStyle } from '@styles/stats';

export const S: IStyle = {};

S.Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
`;
S.Profile = styled.div`
  position: relative;
  margin: 0 auto;
  width: 170px;
  height: 227px;
  ${() => media.mobile} {
    width: 51px;
    height: 69px;
  }
`;
S.Logo = styled.div`
  position: relative;
  margin: 0 auto;
  width: 32px;
  height: 32px;
  ${() => media.mobile} {
    width: 16px;
    height: 16px;
  }
`;
S.LogoName = styled.h1`
  position: relative;
  text-align: center;
  color: white;
  font-size: 12px;
  font-weight: 300;
  opacity: 0.7;
  margin-bottom: 8px;
  ${() => media.mobile} {
    font-size: 8px;
  }
`;
S.DarkBlue = styled.div`
  position: relative;
  background: #0a2742;
  border-radius: 12px;
  width: 100%;
  height: 222px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-around;
  color: white;
  margin-bottom: 4px;
  ${() => media.mobile} {
    height: 152px;
  }
`;
S.DarkBlueItem = styled.div`
  position: relative;
  width: 33%;
  text-align: center;
  grid-column: span 1;
`;
S.Score = styled.h1`
  margin-bottom: 2px;
  color: #008ffb;
  font-weight: 600;
`;
S.Nth = styled.h1`
  font-size: 12px;
  opacity: 0.7;
  margin-bottom: 10px;
  font-weight: lighter;
`;
S.Title = styled.h1`
  font-size: 12px;
`;
S.Years = styled.span`
  position: relative;
  color: white;
  padding-right: 12px;
`;
S.Seasons = styled.span`
  position: relative;
  color: white;
`;
