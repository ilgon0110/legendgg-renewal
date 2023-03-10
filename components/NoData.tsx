import styled from 'styled-components';
import { media } from '@styles/theme';

function NoData({ year, season }: PropsType) {
  return (
    <Wrapper>
      <Loading>
        {year}년 {season}의 지표가 없습니다!
      </Loading>
      <Text>지표 도입시기 - LPL, LCS : 18시즌</Text>
    </Wrapper>
  );
}

export default NoData;

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
const Text = styled.h2`
  color: white;
  font-size: 20px;
  font-weight: normal;
  text-align: center;
  ${() => media.tablet} {
    font-size: 14px;
  }
`;

interface PropsType {
  year: string;
  season: string;
}
