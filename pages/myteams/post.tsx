import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import PostModal from '@components/postModal';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, postModalActions } from '@store/index';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';
import { S } from '@styles/myteams/post';
import ResetSvg from 'assets/ResetSvg';

function MyTeamPost() {
  const { postModal } = useSelector((state: IRootState) => state);
  const [post, { data }] = useMutation<{ ok: boolean; id: string }>('/api/post/bestplayer');
  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      router.push(`${data.id}`);
    }
  }, [data]);
  const [selectedLine, setSelectLine] = useState('');
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

  Modal.setAppElement('#__next');
  return (
    <S.Container>
      <form onSubmit={handleSubmit}>
        <S.Item>
          {line.map((line) => {
            return (
              <S.ImageBox key={line}>
                {postModal[line].isSelected ? (
                  <>
                    <S.Button onClick={() => reSelect(line)}>
                      <ResetSvg />
                    </S.Button>
                    <S.ProfileBox name={postModal[line].name}></S.ProfileBox>
                    <S.ProfileText>{`${postModal[line].year}  ${postModal[line].season}`}</S.ProfileText>
                  </>
                ) : (
                  <>
                    <S.Line line={line}></S.Line>
                    <S.Profile onClick={() => onClickLine(line)}>{`${line} 선택하기 +`}</S.Profile>
                  </>
                )}
              </S.ImageBox>
            );
          })}
        </S.Item>
        <Modal isOpen={postModal.isOpen} onRequestClose={closeModal} style={customStyles}>
          <PostModal line={selectedLine} />
        </Modal>
        <S.Item>
          <S.Description>
            <h1>팀 설명</h1>
            <textarea rows={10} ref={ref}></textarea>
          </S.Description>
        </S.Item>
        <S.Item>
          <S.Post type="submit" />
        </S.Item>
      </form>
    </S.Container>
  );
}

export default MyTeamPost;

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
