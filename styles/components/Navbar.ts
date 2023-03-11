import styled, { css } from 'styled-components';
import { media } from '@styles/theme';
import { IStyle } from '@styles/stats';
import { motion } from 'framer-motion';

export const S: IStyle = {};

S.Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 56px;
  font-size: 14px;
  color: white;
  z-index: 99;
  padding: 0% 19%;
  box-sizing: border-box;
  background-color: #122a47;
  ${() => media.tablet} {
    display: flex;
  }
`;
S.Outer = styled.div`
  width: fit-content;
  ${() => media.tablet} {
    width: 100%;
    height: 56px;
  }
`;
S.Menu = styled.div<{ isClicked: boolean }>`
  ${() => media.tablet} {
    display: ${(props) => (props.isClicked ? 'block' : 'none')};
    width: 48px;
    height: 52px;
    background: url('${process.env.PUBLIC_URL}/imgs/menu.png');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    position: relative;
  }
  ${() => media.mobile} {
    width: 36px;
  }
`;

S.Logo = styled.div<{ isClicked: boolean }>`
  position: relative;
  width: fit-content;
  height: 54px;
  margin-left: -30%;
  ${() => media.tablet} {
    display: ${(props) => (props.isClicked ? null : 'none')};
    width: fit-content;
    margin: 0 auto;
  }
  svg {
    width: 52px;
    height: 54px;
  }
`;

S.MenuBar = styled.div<{ isClicked: boolean }>`
  display: flex;
  ${() => media.tablet} {
    position: fixed;
    display: block;
    left: 0%;
    top: 0%;
    width: 70%;
    height: 100%;
    box-shadow: ${(props) => props.theme.boxShadow.normal};
    background-color: #5f5873;
    ${(props) => {
      if (props.isClicked) {
        return `          
          left: -70%;
          -webkit-transition: left 0.3s ease;
          -o-transition: left 0.3s ease;
          -moz-transition: left 0.3s ease;
          transition: left 0.3s ease;
				`;
      } else {
        return `
          left: 0%;
          -webkit-transition: left 0.3s ease;
          -o-transition: left 0.3s ease;
          -moz-transition: left 0.3s ease;
          transition: left 0.3s ease;
				`;
      }
    }}
  }
`;

S.MenuLogo = styled.svg`
  display: none;
  ${() => media.tablet} {
    display: block;
    width: 120px;
    margin: 0 auto;
    margin-top: 120px;
  }
  ${() => media.mobile} {
    width: 80px;
    margin: 0 auto;
    margin-top: 150px;
  }
`;

S.Exit = styled.div<{ isClicked: boolean }>`
  ${() => media.tablet} {
    position: relative;
    width: 42px;
    height: 52px;
    z-index: 2;
    background: url('${process.env.PUBLIC_URL}/imgs/exit.png');
    background-repeat: no-repeat;
    background-size: 100%;
    left: 55vw;
    margin-top: 16px;
  }
`;

S.Items = styled.ul`
  display: flex;
  position: relative;
  align-items: center;
  margin-right: 42px;
  ${() => media.tablet} {
    display: block;
    width: 100%;
    margin-top: 120px;
    font-size: 24px;
  }
  ${() => media.mobile} {
    font-size: 16px;
    margin-top: 88px;
  }
`;

S.Item = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 38px;
  ${() => media.tablet} {
    display: block;
    margin-left: 80px;
    margin-top: 32px;
  }
  ${() => media.mobile} {
    margin-top: 24px;
    margin-left: 24px;
  }
`;

S.Alink = styled.a`
  text-decoration: none;
  cursor: pointer;
`;

S.Search = styled.form`
  display: flex;
  align-items: center;
  width: fit-content;
  ${() => media.tablet} {
    display: flex;
    align-items: center;
    position: relative;
    height: fit-content;
    width: 75%;
    margin-top: -250px;
    margin-left: 80px;
    padding-right: -50%;
  }
  ${() => media.mobile} {
    margin-top: -180px;
    margin-left: 24px;
    width: 85%;
  }
  svg {
    &:hover {
      cursor: pointer;
    }
    position: relative;
    right: 10%;
    width: 14px;
    height: 14px;
    z-index: 1;
  }
`;

S.Input = styled.input`
  position: relative;
  right: 0%;
  background: #001222 0% 0% no-repeat padding-box;
  color: white;
  box-shadow: 3px 3px 6px #00000029;
  border: none;
  border-radius: 20px;
  width: 191px;
  height: 32px;
  padding-left: 16px;
  padding-right: 38px;
  ${() => media.tablet} {
    width: 100%;
  }
  ${() => media.mobile} {
    width: 100%;
    height: 28px;
    font-size: 12px;
  }
`;

S.DataList = styled.datalist`
  color: white;
`;

S.UnderLine = styled(motion.span)`
  position: absolute;
  width: 50px;
  height: 1px;
  bottom: -6px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #00ff99;
  ${() => media.tablet} {
    display: none;
  }
`;
