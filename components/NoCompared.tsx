import styled from 'styled-components';
import { media } from '@styles/theme';

function NoCompared() {
  return (
    <Wrapper>
      <Loading>13-14시즌 선수들은 15시즌 이후 선수들과 비교가 불가능합니다.</Loading>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: url('${process.env.PUBLIC_URL}/imgs/cat.png');
  background-repeat: no-repeat;
  background-position: 50% 70%;
  background-size: 15%;
  border: 1px solid red;
  ${() => media.tablet} {
    background-position: center;
  }
  ${() => media.mobile} {
    height: 400px;
    background-position: center;
  }
`;
const Loading = styled.h1`
  margin-top: 15%;
  margin-bottom: 16px;
  color: white;
  font-size: 24px;
  font-weight: normal;
  text-align: center;
  ${() => media.tablet} {
    font-size: 16px;
  }
`;

export default NoCompared;
