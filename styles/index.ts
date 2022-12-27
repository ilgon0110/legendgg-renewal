import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background: url('${process.env.PUBLIC_URL}/imgs/oldrox.png');
  background-repeat: no-repeat;
  background-position: 50% 55%;
  background-size: 60%;
`;

export const Wrapper = styled.div`
  position: relative;
  top: 35%;
`;

export const Text = styled.h1`
  width: 100%;
  text-align: center;
  position: absolute;
  color: white;
  font-size: 24px;
  font-weight: 300px;
  top: 15%;
  opacity: 0.8;
`;

export const Box = styled.div`
  width: 300px;
  height: 400px;
  position: relative;
  margin: 0 auto;
`;
