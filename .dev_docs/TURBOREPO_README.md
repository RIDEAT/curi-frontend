# Turborepo guide

> reference : https://turbo.build/repo/docs/handbook

## Package Installation

### 패키지를 특정 워크스페이스에 설치하기

```
pnpm add <패키지> --filter <워크스페이스>
```

ex. `pnpm add react --filter web`
ex. `pnpm add -D typescript --filter web`

### 특정 워크스페이스에서 패키지 제거하기

```
pnpm uninstall <패키지> --filter <워크스페이스>
```

ex. `pnpm uninstall react --filter web`

### 워크스페이스에서 패키지 업그레이드하기

```
pnpm update <패키지> --filter <워크스페이스>
```

ex. `pnpm update react --filter web`

### 워크스페이스의 root에서 패키지 설치하기

```
pnpm -w <패키지>
```

ex. `pnpm -w -D tailwindcss`

> reference
> https://turbo.build/repo/docs/handbook/package-installation > https://pnpm.io/ko/pnpm-cli

## script

### 모든 워크스페이스의 script 실행

```
pnpm run <script name>
```

ex. `pnpm run dev`

### 특정 워크스페이스의 script 실행

```
pnpm run <script name> --filter web
```

ex. `pnpm run dev --filter web`
