import React from 'react';
import Navbar from './Navbar';
import Seo from './Seo';
import styled from 'styled-components';

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <link href="https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css"></link>
      <Seo />
      <Navbar />
      <div>{children}</div>
      <Footer>Copyright 2022. jesus0321@naver.com all rights reserved.</Footer>
    </>
  );
}

const Footer = styled.footer`
  position: fixed;
  display: block;
  width: 100%;
  font-size: 12px;
  text-align: center;
  font-weight: lighter;
  color: white;
  bottom: 18px;
`;
