import styled, { css } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Keyboard, EffectCoverflow, Pagination } from 'swiper';
import Head from 'next/head';
import Image from 'next/image';

const Container = styled.div`
  height: 100vh;
  background: url('${process.env.PUBLIC_URL}/imgs/oldrox.png');
  background-repeat: no-repeat;
  background-position: 50% 55%;
  background-size: 60%;
`;

const Wrapper = styled.div`
  position: relative;
  top: 35%;
`;

const Text = styled.h1`
  width: 100%;
  text-align: center;
  position: absolute;
  color: white;
  font-size: 24px;
  font-weight: 300px;
  top: 15%;
  opacity: 0.8;
`;

const Box = styled.div`
  width: 300px;
  height: 400px;
  position: relative;
  margin: 0 auto;
`;

export default function Home() {
  const playersName = [
    'ambition',
    'bang',
    'bdd',
    'bengi',
    'beryL',
    'canyon',
    'chovy',
    'crown',
    'cuvee',
    'deft',
    'faker',
    'flame',
    'fly',
    'gorilla',
    'imp',
    'kakao',
    'khan',
    'kuro',
    'madlife',
    'marin',
    'mata',
    'nuguri',
    'pawn',
    'peanut',
    'pray',
    'rascal',
    'ruler',
    'score',
    'showmaker',
    'shy',
    'smeb',
    'ssumday',
    'tarzan',
    'teddy',
    'viper',
    'wolf',
  ];
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Container>
        <Text>레전드 선수들의 시즌별 스탯 비교하기</Text>
        <Wrapper>
          <Swiper
            effect={'coverflow'}
            spaceBetween={0}
            keyboard={{
              enabled: true,
            }}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={false}
            modules={[Keyboard, EffectCoverflow, Pagination]}
            className="mySwiper"
            breakpoints={{
              768: {
                slidesPerView: 2,
                centeredSlides: true,
              },
              1440: {
                slidesPerView: 3.5,
                centeredSlides: true,
              },
            }}
          >
            {playersName.map((a) => (
              <SwiperSlide key={a}>
                <Box>
                  <Image
                    src={`/imgs/profiles/${a}.png`}
                    alt={a}
                    fill
                    sizes="100%"
                    quality={100}
                    priority
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Wrapper>
      </Container>
    </>
  );
}
