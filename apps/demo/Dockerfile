## Pruner

FROM node:16-alpine AS pruner
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

RUN yarn global add turbo@1.10.7
COPY . .
RUN npx @turbo/codemod add-package-manager
RUN turbo prune --scope="demo" --docker

## Builder

FROM node:16-alpine AS builder

RUN apk add --no-cache libc6-compat python3 make g++
RUN apk update
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PUBLIC_ENV dev

RUN yarn global add pnpm@8.5.0
COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-*.yaml .
RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
RUN ls -la
COPY ../../turbo.json turbo.json

RUN pnpm build:demo
RUN ls -la

## Runner

FROM node:16-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs


COPY --from=builder --chown=nextjs:nodejs /app/apps/demo/next.config.js .
COPY --from=builder --chown=nextjs:nodejs /app/apps/demo/package.json .

COPY --from=builder --chown=nextjs:nodejs /app/apps/demo/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/demo/.next/static ./apps/demo/.next/static
RUN ls -la

# CMD ["node", "demo/server.js"]
# CMD ["ls" , "-la"]
# CMD ["cd app &ls" , "-la"]
# CMD cd app;ls -la
CMD ["node", "./apps/demo/server.js"]