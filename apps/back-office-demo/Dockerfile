## Pruner

FROM node:16-alpine AS pruner
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

RUN yarn global add turbo@1.10.7
COPY . .
RUN turbo prune --scope="back-office-demo" --docker

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
COPY turbo.json turbo.json

RUN pnpm build:back-office
RUN ls -la

## Runner

FROM node:16-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs


COPY --from=builder --chown=nextjs:nodejs /app/apps/back-office/next.config.js .
COPY --from=builder --chown=nextjs:nodejs /app/apps/back-office/package.json .

COPY --from=builder --chown=nextjs:nodejs /app/apps/back-office/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/back-office/.next/static ./apps/back-office/.next/static
RUN ls -la

# CMD ["node", "back-office/server.js"]
# CMD ["ls" , "-la"]
# CMD ["cd app &ls" , "-la"]
# CMD cd app;ls -la
CMD ["node", "./apps/back-office-demo/server.js"]