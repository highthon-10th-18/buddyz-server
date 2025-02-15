FROM node:23-bookworm-slim AS builder

COPY . /app
WORKDIR /app

ENV time_zone=Asia/Seoul

RUN apt-get update -y && apt-get install -y openssl

RUN corepack enable
RUN corepack prepare pnpm --activate
RUN pnpm install --frozen-lockfile

EXPOSE 3000

RUN pnpm run build

CMD ["pnpm", "start:prod"]
