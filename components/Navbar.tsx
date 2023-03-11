import { IRootState, navBarActions } from '@store/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, useSession } from 'next-auth/react';
import { S } from '../styles/components/Navbar';
import SearchLogoSvg from 'assets/SearchLogoSvg';
import LogoSvg from 'assets/LogoSvg';
import MenuLogoSvg from 'assets/MenuLogoSvg';

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    playersSlice: { names: playersName },
    navBarSlice: { isSelect },
  } = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm<SearchForm>();
  const routerMatch = (url: string) => {
    return router.pathname.includes(`/${url}`) ? true : false;
  };
  const statsMatch = routerMatch('stats');
  const playersMatch = routerMatch('players');
  const myteamsMatch = routerMatch('myteams');
  const onMenuClick = () => {
    dispatch(navBarActions.isClick());
  };
  const onValid = (event: SearchForm) => {
    const { search: keyword } = event;
    if (!playersName.includes(keyword)) {
      alert(`플레이어 이름을 제대로 입력해주세요.\n입력값:${keyword}`);
      setValue('search', '');
      return;
    }
    router.push({ pathname: '/stats/[id]', query: { id: keyword } });
    setValue('search', '');
    dispatch(navBarActions.isClick());
  };

  return (
    <>
      <S.Nav>
        <S.Menu onClick={onMenuClick} isClicked={isSelect}></S.Menu>
        <S.Outer>
          <Link href={'/'}>
            <S.Logo isClicked={isSelect}>
              <LogoSvg />
            </S.Logo>
          </Link>
        </S.Outer>
        <S.MenuBar isClicked={isSelect}>
          <S.Exit onClick={onMenuClick} isClicked={isSelect}></S.Exit>
          <S.MenuLogo xmlns="http://www.w3.org/2000/svg" id="logo-40" viewBox="0 0 58 32" fill="none">
            <MenuLogoSvg />
          </S.MenuLogo>
          <S.Items>
            <S.Item>
              <Link href={'/stats/faker'} legacyBehavior>
                <S.Alink onClick={() => dispatch(navBarActions.isClick())}>
                  상세지표{statsMatch && <S.UnderLine layoutId="underline" />}
                </S.Alink>
              </Link>
            </S.Item>
            <S.Item>
              <Link href={'/players'} legacyBehavior>
                <S.Alink onClick={() => dispatch(navBarActions.isClick())}>
                  스탯비교
                  {playersMatch && <S.UnderLine layoutId="underline" />}
                </S.Alink>
              </Link>
            </S.Item>
            <S.Item>
              <Link href={'/myteams'} legacyBehavior>
                <S.Alink onClick={() => dispatch(navBarActions.isClick())}>
                  나만의팀
                  {myteamsMatch && <S.UnderLine layoutId="underline" />}
                </S.Alink>
              </Link>
            </S.Item>
          </S.Items>
          <S.Search onSubmit={handleSubmit(onValid)}>
            <S.Input list="players" placeholder="select players" {...register('search')} />
            <S.DataList id="players">
              {playersName?.map((name) => (
                <option value={name} key={name}></option>
              ))}
            </S.DataList>
            <SearchLogoSvg handleSubmit={handleSubmit} onValid={onValid} />
          </S.Search>
          <S.Item>
            {session ? (
              <Link href={'/mypage'} legacyBehavior>
                <S.Alink
                  onClick={() => {
                    dispatch(navBarActions.isClick());
                  }}
                >
                  마이페이지
                </S.Alink>
              </Link>
            ) : (
              <Link href={'#'} legacyBehavior>
                <S.Alink
                  onClick={() => {
                    dispatch(navBarActions.isClick());
                    signIn();
                  }}
                >
                  로그인
                </S.Alink>
              </Link>
            )}
          </S.Item>
        </S.MenuBar>
      </S.Nav>
    </>
  );
};

export default Navbar;

interface SearchForm {
  search: string;
}
