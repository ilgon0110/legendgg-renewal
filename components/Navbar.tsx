import { IRootState, navBarActions } from '@store/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, useSession, signOut } from 'next-auth/react';
import { S } from '../styles/components/Navbar';

interface SearchForm {
  search: string;
}

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
  const LogoSvg = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" id="logo-40" viewBox="0 0 58 32" fill="none">
        <path
          d="M0 16C0 7.16344 7.16344 0 16 0H37C45.8366 0 53 7.16344 53 16V32H16C7.16344 32 0 24.8366 0 16Z"
          fill="#ffffff"
          stopColor="#ffffff"
        />
        <rect x="6" y="6" width="41" height="20" rx="10" fill="#bbbbbb" stopColor="#bbbbbb" />
        <circle cx="16" cy="16" r="5" fill="#000000" />
        <circle cx="14" cy="14" r="1" fill="#ffffff" />
        <circle cx="38" cy="16" r="5" fill="#000000" />
        <circle cx="36" cy="14" r="1" fill="#ffffff" />
      </svg>
    );
  };
  const MenuLogoSvg = () => {
    return (
      <>
        <path
          d="M0 16C0 7.16344 7.16344 0 16 0H37C45.8366 0 53 7.16344 53 16V32H16C7.16344 32 0 24.8366 0 16Z"
          fill="#ffffff"
          stopColor="#ffffff"
        />
        <rect x="6" y="6" width="41" height="20" rx="10" fill="#bbbbbb" stopColor="#bbbbbb" />
        <circle cx="16" cy="16" r="5" fill="#000000" />
        <circle cx="14" cy="14" r="1" fill="#ffffff" />
        <circle cx="38" cy="16" r="5" fill="#000000" />
        <circle cx="36" cy="14" r="1" fill="#ffffff" />
      </>
    );
  };
  const SearchLogoSvg = () => {
    return (
      <svg onClick={handleSubmit(onValid)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        ></path>
      </svg>
    );
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
            <SearchLogoSvg />
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
