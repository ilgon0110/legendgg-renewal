 ## Legend.gg



> ### Created by NextJS + TypeScript + Prisma + PlanetScale.
> ### 현역 & 은퇴한 E-SPORT 선수들의 기록을 비교하고, 나만의 팀을 뽑아 게시할 수 있는 사이트(CRUD, auth(NextAuth), etc...) 


# How it works

```bash
|____api           # api service
|____components    # 재사용되는 컴포넌트 모음
|____controllers   # logic(Redux, useSWR...)담당
|____libs          # client나 server에서 쓰이는 libs 모음(Custom Hook)
|____pages         # Next.js 동적 라우팅
|____store         # Redux Store 
```

## Functionality overview

선수들의 기록을 보고 비교할 수 있는 사이트. ApexChart libs를 사용하여 시각적으로 비교 가능. 나만의 팀 만들기는 블로그와 비슷. Custom API를 구축하고 모든 request는 custom API를 사용. NextAuth를 사용하여 SNS login, authentication, authorization 구현.

**General functionality:**

- Session token 으로 유저 인증
- CRUD 게시판
- 게시글 업로드, 수정, 삭제, 좋아요, 댓글 구현

**The general page breakdown looks like this:**

- Home page (URL: / )
    - 선수 목록들을 Slider로 보여줌. 클릭 시 선수 정보 page로 redirect
    
- Sign in/Sign up pages 
    - NextAuth Signin Page
    - No Sign up page(only SNS Login)
    
- Stat page (URL : /stat/:playerName)
    - 선수들의 2013~2021 시즌 기록 확인
    - SSR
    
- Player page (URL : /player)
    - 두명의 선수들의 기록을 바로 비교할 수 있는 페이지
    - use Apexchart , useSWR
    
- Myteam page (URL: /myteams/:id, /myteams/post, /myteams/edit )
    - 내가 뽑은 올스타 팀을 게시하는 페이지
    - 각 라인 별 선수들을 뽑고 팀 설명 제출
    - 게시, 수정, 삭제 , 좋아요, 댓글 기능 업데이트 중
    
- Mypage page (URL : /mypage)
    - 내가 업로드한 나만의 팀 조회, 수정, 삭제하는 페이지
    - 마이페이지에서 로그아웃 가능
