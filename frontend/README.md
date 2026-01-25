# WhatLunch

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

## Development

```bash
bun run dev
```

## Build

```bash
bun run build
```

## Deployment

```bash
sudo rsync -av --delete ./dist/ /var/www/whatlunch/
```
