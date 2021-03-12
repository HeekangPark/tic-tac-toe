# tic-tac-toe

Vue.js로 구현한 tic-tac-toe 게임

## 주의사항

- 아래의 모든 명령어는 프로젝트 루트 디렉토리에서 실행한다.
- 스크립트를 실행하기 전 실행 권한을 준다.(ex. `chmod +x setup`)
- 만약 접속이 되지 않는다면 방화벽 설정 등을 확인해 보자.

## 설치하기
```
./setup
```

## 실행하기

### 각자 실행하기

프론트엔드
```
./run
```

백엔드
```
cd server
./run
```

### 한 번에 실행하기

```
./run-at-once
```

### 접속하기

<http://localhost:10000>

## 기타

### RL values 업데이트

현재 적용중인 values는 `./server/ais/rl-values-2021-03-12-06-09-29.txt` 파일이다. 만약 다른 파일을 사용하고 싶다면 파일을 `./server` 디렉토리 밑에 적당히 둔 후 `./server/config.js` 파일에 해당 파일의 경로를 명시해주면 된다.

## 버전 히스토리

### v1.0.0

- First Commit