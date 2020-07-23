# todo-10

# Client

## Install

```
npm install
```

## Build

```
npm run build
```

Build in production mode.

## Dev Server

```
npm run dev
```

## Test

Jest를 설정했습니다. 각 폴더에 `__test__` 폴더를 만들고 그 안에 `{filename}.test.js` 파일을 만듭니다.

```
npm test
```

로 테스트를 실행할 수 있습니다.

## Docker

- 클라이언트 빌드가 필요합니다.

`.env.sample`을 `.env`로 바꾸고 다음을 실행하면 앱이 초기화되고 실행됩니다.

```bash
$ docker-compose up
```
