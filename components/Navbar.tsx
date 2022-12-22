import Link from "next/link";
import styled, { css } from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 56px;
  top: 0;
  font-size: 14px;
  color: white;
  z-index: 99;
  padding: 0% 19%;
`;

export default function Navbar() {
  return (
    <nav>
      <Link href={"./stats"}>상세정보</Link>
      <Link href={"./players"}>선수비교</Link>
      <Link href={"./myteams"}>나만의 팀</Link>
    </nav>
  );
}
