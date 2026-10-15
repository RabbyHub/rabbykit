FROM node:22-bookworm-slim AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.10.0 --activate
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig*.json ./
COPY ./packages/rabbykit/package.json ./packages/rabbykit/package.json
COPY ./site/doc/package.json ./site/doc/package.json
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
ENV NODE_OPTIONS="--max_old_space_size=4096"
RUN pnpm build:doc

FROM ghcr.io/nginx/nginx-unprivileged:stable-alpine AS runner
COPY ./site/doc/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/site/doc/dist /usr/share/nginx/html
EXPOSE 3000
