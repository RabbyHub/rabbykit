FROM node:18-buster AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app


COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig*.json ./
COPY ./packages/rabbykit/package.json ./packages/rabbykit/package.json
COPY ./site/doc/package.json ./site/doc/package.json



FROM base AS builder
ENV NODE_OPTIONS --max_old_space_size=4096
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN pnpm build:doc



FROM base AS runner
WORKDIR /app

ENV NODE_ENV production


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/site/doc/public ./site/doc/public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/site/doc/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/site/doc/.next/static ./site/doc/.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "./site/doc/server.js"]