# WhatLunch

오늘 점심 뭐 먹지? 결정 피로 없이 바로 추천받자!

## Features

- GPS 기반 현재 위치 파악
- 카카오 로컬 API로 주변 음식점 검색
- 랜덤 추천 (1~10개, 기본 3개)
- 거리 설정 (100m~1km 슬라이더)
- 무제한 재추천 기능
- 카카오맵 장소 페이지 연결
- 네이버 블로그 검색 URL 연결
- 로딩 중 팁 표시
- PWA 설치 지원

## Prerequisites

- [Bun](https://bun.sh/) installed
- Kakao Developers account with API keys

## Setup

1. Install dependencies:

```bash
bun install
```

2. Create `.env` file from the example:

```bash
cp .env.example .env
```

3. Get your Kakao API keys from [Kakao Developers](https://developers.kakao.com/):
   - Create an application
   - Add `Web` platform with your domain
   - Copy the REST API Key and JavaScript Key
   - Update `.env` with your keys

```env
VITE_KAKAO_REST_API_KEY=your_rest_api_key
VITE_KAKAO_JS_KEY=your_javascript_key
```

## Development

```bash
bun run dev
```

## Build

```bash
bun run build
```

## Docker Deployment

1. Create `.env` file in the project root with your Kakao API keys

2. Build and run with Docker Compose:

```bash
docker-compose up -d --build
```

The app will be available at `http://localhost:8080`

## Tech Stack

- React 19
- Vite 7
- Bun
- Kakao Maps SDK
- Kakao Local API
- PWA with Service Worker
- Docker + nginx
