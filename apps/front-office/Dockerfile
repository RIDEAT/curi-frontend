## Pruner

FROM node:16-alpine AS pruner
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

RUN yarn global add turbo@1.10.7
COPY . .
RUN turbo prune --scope="front-office" --docker

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
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm build:front-office
RUN ls -la

## Runner

FROM node:16-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs


COPY --from=builder --chown=nextjs:nodejs /app/apps/front-office/next.config.js .
COPY --from=builder --chown=nextjs:nodejs /app/apps/front-office/package.json .

COPY --from=builder --chown=nextjs:nodejs /app/apps/front-office/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/front-office/.next/static ./apps/front-office/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/front-office/public ./apps/front-office/public


RUN ls -la

# CMD ["node", "front-office/server.js"]
# CMD ["ls" , "-la"]
# CMD ["cd app &ls" , "-la"]
# CMD cd app;ls -la
CMD ["node", "./apps/front-office/server.js"]
