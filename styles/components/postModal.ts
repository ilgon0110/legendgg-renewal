import styled, { css } from 'styled-components';
import { media } from '@styles/theme';
import { IStyle } from '@styles/stats';

export const S: IStyle = {};

S.Container = styled.div`
  position: fixed;
  width: 100%;
  height: 550px;
  border: 2px solid red;
  background: black;
`;

S.Item = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  background: white;
  border-radius: 12px;
`;

S.Title = styled.h1`
  padding: 16px 0px;
  font-size: 20px;
  font-weight: 600;
  margin-left: 5%;
  color: black;
`;

S.SeasonNavbar = styled.div`
  background-color: transparent;
  width: 100%;
  height: 40px;
  z-index: 1;
  margin-left: 5%;
  ${() => media.mobile} {
    height: 30px;
  }
`;
S.NameSelect = styled.select`
  color: black;
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

S.SeasonSelect = styled.span<{ opacity: number }>`
  font-size: 20px;
  color: black;
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
S.StatBox = styled.div`
  position: relative;
  margin: 0 auto;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 152px;
  background: #0a2742;
  border-radius: 12px;
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
      font-size: 24px;
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
      font-size: 16px;
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
      font-size: 16px;
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
S.CareerText = styled.h1`
  position: relative;
  color: white;
  margin-top: 68px;
  font-size: 20px;
  ${() => media.mobile} {
    font-size: 12px;
  }
`;
S.CareerBox = styled.div`
  display: grid;
  width: 90%;
  margin: 0 auto;
  margin-top: 24px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 172px;
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
    font-size: 16px;
    ${() => media.tablet} {
      font-size: 14px;
    }

    h1:first-child {
      margin-top: 60px;
      font-size: 24px;
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
S.Submit = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 24px;
  margin-bottom: 24px;
  button {
    width: 50%;
    height: 32px;
    border: 1px solid blue;
    border-radius: 12px;
  }
`;

S.Radio = styled.input`
  appearance: none;
`;
