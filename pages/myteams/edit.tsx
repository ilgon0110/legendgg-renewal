import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import PostModal from '@components/postModal';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, postModalActions } from '@store/index';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';
import { S } from '@styles/myteams/edit';

function MyTeamPost() {
  const { postModal } = useSelector((state: IRootState) => state);
  const [post, { data }] = useMutation('/api/post/bestplayer/update');
  const router = useRouter();
  const { playerData, playerDescription, id: bestPlayerId } = router.query;

  useEffect(() => {
    if (data?.ok) {
      router.push(`/myteams/${bestPlayerId}`);
    }
  }, [data]);

  useEffect(() => {
    const playerList = typeof playerData === 'string' ? JSON.parse(playerData) : undefined;
    if (!playerData) return;
    playerList?.forEach((v: any) => {
      dispatch(
        postModalActions.playerSelect({
          line: v.line,
          playerInfo: { name: v.name, year: v.year, season: v.season },
          isSelected: true,
        }),
      );
    });
  }, []);

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
  const lines = ['top', 'jungle', 'mid', 'bot', 'support'];
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    //bestplayer 예외처리 진행 후 POST REQUEST
    const playerData = Object.values(postModal).slice(1);
    const playerDescription = ref?.current?.value;
    if (!playerData.every((player) => player.isSelected === true)) return;
    post({ playerData, playerDescription, bestPlayerId });
  };
  const reSelect = (line: string) => {
    dispatch(postModalActions.playerSelect({ line: line, playerInfo: {}, isSelected: false }));
    dispatch(postModalActions.setIsOpen(true));
    setSelectLine(line);
  };

  Modal.setAppElement('#__next');
  return (
    <S.Container>
      <form onSubmit={handleSubmit}>
        <S.Item>
          {lines.map((line, idx) => {
            return (
              <S.ImageBox key={line}>
                {postModal[line].isSelected ? (
                  <>
                    <S.Button onClick={() => reSelect(line)}>
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
            <textarea rows={10} ref={ref} placeholder={playerDescription?.toString()}></textarea>
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
