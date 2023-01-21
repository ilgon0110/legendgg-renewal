import styled from 'styled-components';
import { media } from '../../styles/theme';

export const Container = styled.div`
  display: grid;
  column-gap: 30px;
  padding-top: 52px;
  grid-template-columns: repeat(12, 1fr);
  ${() => media.tablet} {
    padding: 52px 24px;
  }
  ${() => media.mobile} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Item = styled.div`
  &:nth-child(1) {
    border: 1px solid red;
    background-color: #122a47;
    grid-column: 1/4;
    z-index: 1;
    ${() => media.mobile} {
      position: sticky;
      top: 56px;
      grid-column: span 4;
      padding: 0px 16px;
      height: 150px;
    }
  }
  &:last-child {
    border: 1px solid blue;
    grid-column: 4/13;
    ${() => media.mobile} {
      grid-column: span 4;
      padding: 0px 16px;
    }
  }
`;
export const Profile = styled.div`
  position: sticky;
  top: 56px;
  background: transparent;
  border-radius: 2px;
  box-shadow: 0px 0px 6px #00000029;
  ${() => media.mobile} {
    height: 70%;
  }
`;
export const Img = styled.img`
  position: relative;
  display: block;
  width: 170px;
  height: 227px;
  top: 8px;
  margin: 0 auto;
  ${() => media.tablet} {
    width: 115px;
    height: 155px;
  }
  ${() => media.mobile} {
    width: 68px;
    height: 91px;
    margin: 0px;
    left: 10%;
  }
`;
export const Logo = styled.img`
  position: relative;
  display: block;
  width: 32px;
  height: 32px;
  margin: 0 auto;
  top: 12px;
  ${() => media.tablet} {
    width: 20px;
    height: 20px;
  }
  ${() => media.mobile} {
    margin-top: -72px;
  }
`;
export const LogoName = styled.h1`
  position: relative;
  text-align: center;
  color: white;
  font-size: 12px;
  font-weight: 300;
  opacity: 0.7;
  top: 12px;
  ${() => media.tablet} {
    font-size: 8px;
  }
`;
export const WinBar = styled.div`
  position: relative;
  margin: 0 auto;
  width: 80%;
  height: 24px;
  background: white;
  top: 32px;
  ${() => media.tablet} {
    height: 16px;
  }
  ${() => media.mobile} {
    top: 20px;
    width: 20%;
    height: 10px;
  }
`;
export const WinRateBar = styled.div<{ winrate: number | undefined }>`
  position: relative;
  width: ${(props) => props.winrate}%;
  height: 24px;
  background: #7081f3;
  ${() => media.tablet} {
    height: 16px;
  }
  ${() => media.mobile} {
    height: 10px;
  }
`;
export const WinRate = styled.h1`
  position: relative;
  text-align: center;
  top: 36px;
  font-size: 16px;
  font-weight: normal;
  color: white;
  ${() => media.mobile} {
    top: 24px;
    font-size: 8px;
  }
`;
export const WinRateRank = styled.span`
  padding-left: 4px;
  font-size: 12px;
  font-weight: 300;
  opacity: 0.7;
  ${() => media.mobile} {
    font-size: 8px;
  }
`;
export const Year = styled.h1`
  position: relative;
  text-align: center;
  top: 52px;
  font-size: 18px;
  font-weight: normal;
  color: white;
  ${() => media.mobile} {
    position: absolute;
    margin-top: -48px;
    top: 52px;
    right: 10%;
    font-size: 12px;
  }
`;
export const Season = styled.span`
  padding-left: 8px;
  font-size: 16px;
  ${() => media.mobile} {
    top: 0px;
    font-size: 10px;
  }
`;
export const ChartBox = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 228px;
  top: 60px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  ${() => media.tablet} {
    height: 193px;
  }
  ${() => media.mobile} {
    position: absolute;
    width: 130px;
    height: 130px;
    top: 0px;
    right: 3%;
  }
`;
export const SeasonNavbar = styled.div`
  background-color: #122a47;
  position: fixed;
  width: 100%;
  height: 40px;
  z-index: 1;
  margin-top: 3px;

  ${() => media.mobile} {
    height: 30px;
  }
`;
export const YearSelect = styled.select`
  color: white;
  border: none;
  background: transparent;
  font-size: 24px;
  &:focus {
    border: none;
  }
  &:active {
    border: none;
  }
  option {
    display: block;
    background-color: rgba(0, 0, 0, 0);
    color: black;
  }
  ${() => media.tablet} {
    font-size: 20px;
  }
  ${() => media.mobile} {
    font-size: 16px;
    margin-left: 16px;
  }
`;
export const SeasonSelect = styled.span<{ opacity: number }>`
  font-size: 20px;
  color: white;
  padding: 32px;
  font-weight: normal;
  opacity: ${(props) => props.opacity};
  &:hover {
    cursor: pointer;
  }

  ${() => media.tablet} {
    font-size: 16px;
    padding: 20px;
  }
  ${() => media.mobile} {
    font-size: 12px;
    padding: 14px;
  }
`;
export const StatBox = styled.div`
  position: relative;
  margin-top: 32px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 182px;
  background: #0a2742;
  border-radius: 12px;
  top: 16px;
  color: white;
  align-items: center;
  ${() => media.mobile} {
    height: 100px;
    grid-template-rows: 100px;
  }
  div {
    position: relative;
    text-align: center;
    h1:first-child {
      font-size: 32px;
      color: ${(props) => props.theme.color.mint};
      font-weight: 600;
      padding-bottom: 4px;
      ${() => media.tablet} {
        font-size: 22px;
      }
      ${() => media.mobile} {
        font-size: 16px;
      }
    }
    h1:nth-child(2) {
      font-size: 20px;
      font-weight: 300;
      opacity: 0.8;
      padding-bottom: 20px;
      ${() => media.tablet} {
        font-size: 16px;
      }
      ${() => media.mobile} {
        font-size: 10px;
      }
    }
    h1:last-child {
      font-size: 20px;
      ${() => media.tablet} {
        font-size: 16px;
      }
      ${() => media.mobile} {
        font-size: 10px;
      }
    }
    &:first-child {
      grid-column: span 1;
    }
    &:last-child {
      grid-column: span 1;
    }
  }
`;
export const CareerText = styled.h1`
  position: relative;
  color: white;
  margin-top: 68px;
  font-size: 20px;
  ${() => media.mobile} {
    font-size: 12px;
  }
`;
export const CareerBox = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 252px;
  column-gap: 30px;
  color: white;
  text-align: center;
  ${() => media.mobile} {
    column-gap: 12px;
    height: 120px;
    grid-template-rows: 120px;
  }
  div {
    position: relative;
    border-radius: 12px;
    font-size: 20px;
    ${() => media.tablet} {
      font-size: 14px;
    }

    h1:first-child {
      margin-top: 60px;
      font-size: 32px;
      color: ${(props) => props.theme.color.mint};
      font-weight: 600;
      padding-bottom: 4px;
      ${() => media.tablet} {
        font-size: 22px;
      }
      ${() => media.mobile} {
        margin-top: 24px;
        font-size: 18px;
      }
    }
    h1:last-child {
      position: absolute;
      top: 80%;
      left: 50%;
      transform: translate(-50%, -50%);
      ${() => media.tablet} {
        font-size: 22px;
      }
      ${() => media.mobile} {
        font-size: 10px;
      }
    }
    &:first-child {
      grid-column: span 1;
    }
    &:last-child {
      grid-column: span 1;
    }
    background: #0a2742;
  }
`;
export const PlayerSaying = styled.h1`
  position: relative;
  color: white;
  text-align: center;
  top: 50px;
  font-size: 16px;
  opacity: 0.8;
  font-style: italic;
`;
