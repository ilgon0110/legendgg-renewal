import { media } from '@styles/theme';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import PostModal from '@components/postModal';
import { useDispatch, useSelector } from 'react-redux';
import { IPostModalPlayerInitialState, IRootState, postModalActions } from '@store/index';
import useMutation from '@libs/client/useMutation';
import { Router, useRouter } from 'next/router';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  justify-content: center;
  grid-template-rows: fit-content();
`;

export const Item = styled.div`
  position: relative;
  margin-top: 56px;
  margin-left: 15%;
  margin-right: 15%;
  &:nth-child(1) {
    display: flex;
    border: 1px solid red;
  }
  &:nth-child(2) {
    border: 1px solid red;
    font-size: 16px;
  }
  &:nth-child(3) {
    border: 1px solid red;
  }
`;

const ImageBox = styled.div`
  width: 227px;
  height: 300px;
  margin: 12px;
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Line = styled.div<{ line: string }>`
  width: 32px;
  height: 32px;
  background: url('${process.env.PUBLIC_URL}/imgs/${(props) => props.line}.png');
  background-size: cover;
  margin-bottom: 4px;
`;

const Profile = styled.div`
  width: 100%;
  height: 70%;
  background: #547189;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: white;
`;
const Description = styled.div`
  color: white;
  box-sizing: border-box;
  h1 {
    margin-bottom: 12px;
  }
  textarea {
    width: 100%;
    font-family: 'NanumSquare', sans-serif;
    font-size: 14px;
    resize: none;
  }
`;

const Post = styled.button`
  width: 101px;
  height: 34px;
  background: url('${process.env.PUBLIC_URL}/imgs/post-button.png');
  background-size: cover;
`;

const ProfileBox = styled.div<{ name: string }>`
  width: 80%;
  height: 60%;
  background: url('${process.env.PUBLIC_URL}/imgs/profiles/${(props) => props.name}.png');
  background-size: cover;
  background-position: center;
`;
const ProfileText = styled.div`
  color: white;
  font-size: 16px;
  margin-top: 8px;
`;
const Button = styled.div`
  width: 32px;
  height: 32px;
  margin-bottom: 8px;
  cursor: pointer;
`;

function MyTeamPost() {
  const { postModal } = useSelector((state: IRootState) => state);
  const [post, { data, loading, error }] = useMutation('/api/post/bestplayer');
  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      router.push(`${data.id}`);
    }
  }, [data]);
  const [selectedLine, setSelectLine] = useState('');
  const [description, setDescription] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();
  const onClickLine = (line: string) => {
    openModal();
    setSelectLine(line);
  };
  const openModal = () => {
    dispatch(postModalActions.setIsOpen(true));
  };
  const closeModal = () => {
    dispatch(postModalActions.setIsOpen(false));
  };
  const line = ['top', 'jungle', 'mid', 'bot', 'support'];
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    //bestplayer 예외처리 진행 후 POST REQUEST
    const playerData = Object.values(postModal).slice(1);
    const playerDescription = ref?.current?.value;
    if (!playerData.every((player) => player.isSelected === true)) return;
    post({ playerData, playerDescription });
  };
  const reSelect = (line: string) => {
    dispatch(postModalActions.playerSelect({ line: line, playerInfo: {}, isSelected: false }));
    dispatch(postModalActions.setIsOpen(true));
  };
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      height: '550px',
    },
  };
  Modal.setAppElement('#__next');
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Item>
          {line.map((line, idx) => {
            return (
              <ImageBox key={line}>
                {postModal[line].isSelected ? (
                  <>
                    <Button onClick={() => reSelect(line)}>
                      <svg
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 1000 1000"
                        enableBackground="new 0 0 1000 1000"
                      >
                        <g>
                          <path d="M864.2,559.6c0,201.3-162.9,364.2-364.2,364.2S135.8,760.9,135.8,559.6c0-201.3,162.9-364.2,364.2-364.2c25.2,0,49,2.6,72.8,7.9l-94,94l46.4,46.4L692,176.9L525.2,10l-46.4,46.4l76.8,76.8c-18.5-1.3-37.1-4-55.6-4c-237.1,0-430.4,193.4-430.4,430.4C69.6,796.6,262.9,990,500,990c237.1,0,430.4-193.4,430.4-430.4H864.2z" />
                        </g>
                      </svg>
                    </Button>
                    <ProfileBox name={postModal[line].name}></ProfileBox>
                    <ProfileText>{`${postModal[line].year}  ${postModal[line].season}`}</ProfileText>
                  </>
                ) : (
                  <>
                    <Line line={line}></Line>
                    <Profile onClick={() => onClickLine(line)}>{`${line} 선택하기 +`}</Profile>
                  </>
                )}
              </ImageBox>
            );
          })}
        </Item>
        <Modal isOpen={postModal.isOpen} onRequestClose={closeModal} style={customStyles}>
          <PostModal line={selectedLine} />
        </Modal>
        <Item>
          <Description>
            <h1>팀 설명</h1>
            <textarea rows={10} ref={ref}></textarea>
          </Description>
        </Item>
        <Item>
          <Post type="submit" />
        </Item>
      </form>
    </Container>
  );
}

export default MyTeamPost;
