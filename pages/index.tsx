import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Keyboard, EffectCoverflow, Pagination } from 'swiper';
import Head from 'next/head';
import Image from 'next/image';
import { Container, Text, Wrapper, Box } from '@styles/index';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { IRootState } from '@store/index';

export default function Home() {
  const { names: playersName } = useSelector(
    (state: IRootState) => state.playersSlice,
  );
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
            {playersName.map((name) => (
              <SwiperSlide key={name}>
                <Link rel={'preload'} href={`/stats/${name}`}>
                  <Box>
                    <Image
                      src={`/imgs/profiles/${name}.png`}
                      alt={name}
                      fill
                      sizes="100%"
                      quality={100}
                      priority
                    />
                  </Box>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </Wrapper>
      </Container>
    </>
  );
}
