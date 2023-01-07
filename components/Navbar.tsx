import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types';
import {
  Nav,
  Menu,
  Outer,
  Logo,
  MenuBar,
  Exit,
  MenuLogo,
  Items,
  Item,
  Alink,
  UnderLine,
  Search,
  Input,
  DataList,
} from '../styles/components/Navbar';

export default function Navbar() {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<SearchForm>();
  const routerMatch = (url: string) => {
    return router.pathname.includes(`/${url}`) ? true : false;
  };
  const statsMatch = routerMatch('stats');
  const playersMatch = routerMatch('players');
  const myteamsMatch = routerMatch('myteams');
  const [menuState, setMenuState] = useState(false);
  const onMenuClick = () => {
    setMenuState((prev) => !prev);
  };
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
  interface SearchForm {
    search: string;
  }
  const onValid = (event: SearchForm) => {
    const { search: keyword } = event;
    console.log(keyword);
    if (!playersName.includes(keyword)) {
      alert(`플레이어 이름을 제대로 입력해주세요.\n입력값:${keyword}`);
      setValue('search', '');
      return;
    }
    router.push({ pathname: '/stats/[id]', query: { id: keyword } });
    setValue('search', '');
  };

  return (
    <>
      <Nav>
        <Menu onClick={onMenuClick} isClicked={menuState}></Menu>
        <Outer>
          <Link href={'/'}>
            <Logo isClicked={menuState}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="logo-40"
                viewBox="0 0 58 32"
                fill="none"
              >
                <path
                  d="M0 16C0 7.16344 7.16344 0 16 0H37C45.8366 0 53 7.16344 53 16V32H16C7.16344 32 0 24.8366 0 16Z"
                  fill="#ffffff"
                  stopColor="#ffffff"
                />
                <rect
                  x="6"
                  y="6"
                  width="41"
                  height="20"
                  rx="10"
                  fill="#bbbbbb"
                  stopColor="#bbbbbb"
                />
                <circle cx="16" cy="16" r="5" fill="#000000" />
                <circle cx="14" cy="14" r="1" fill="#ffffff" />
                <circle cx="38" cy="16" r="5" fill="#000000" />
                <circle cx="36" cy="14" r="1" fill="#ffffff" />
              </svg>
            </Logo>
          </Link>
        </Outer>
        <MenuBar isClicked={menuState}>
          <Exit onClick={onMenuClick} isClicked={menuState}></Exit>
          <MenuLogo
            xmlns="http://www.w3.org/2000/svg"
            id="logo-40"
            viewBox="0 0 58 32"
            fill="none"
          >
            <path
              d="M0 16C0 7.16344 7.16344 0 16 0H37C45.8366 0 53 7.16344 53 16V32H16C7.16344 32 0 24.8366 0 16Z"
              fill="#ffffff"
              stopColor="#ffffff"
            />
            <rect
              x="6"
              y="6"
              width="41"
              height="20"
              rx="10"
              fill="#bbbbbb"
              stopColor="#bbbbbb"
            />
            <circle cx="16" cy="16" r="5" fill="#000000" />
            <circle cx="14" cy="14" r="1" fill="#ffffff" />
            <circle cx="38" cy="16" r="5" fill="#000000" />
            <circle cx="36" cy="14" r="1" fill="#ffffff" />
          </MenuLogo>
          <Items>
            <Item>
              <Link href={'/stats/faker'} legacyBehavior>
                <Alink>
                  상세지표{statsMatch && <UnderLine layoutId="underline" />}
                </Alink>
              </Link>
            </Item>
            <Item>
              <Link href={'/players'} legacyBehavior>
                <Alink>
                  스탯비교
                  {playersMatch && <UnderLine layoutId="underline" />}
                </Alink>
              </Link>
            </Item>
            <Item>
              <Link href={'/myteams'} legacyBehavior>
                <Alink>
                  나만의팀
                  {myteamsMatch && <UnderLine layoutId="underline" />}
                </Alink>
              </Link>
            </Item>
          </Items>
          <Search onSubmit={handleSubmit(onValid)}>
            <Input
              list="players"
              placeholder="select players"
              {...register('search')}
            />
            <DataList id="players">
              {playersName?.map((name) => (
                <option value={name} key={name}></option>
              ))}
            </DataList>
            <svg
              onClick={handleSubmit(onValid)}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Search>
        </MenuBar>
      </Nav>
    </>
  );
}
