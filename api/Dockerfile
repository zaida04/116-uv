FROM oven/bun:1
WORKDIR /usr/src/app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production
COPY . .

ENV NODE_ENV production
EXPOSE 3000
ENTRYPOINT [ "bun", "run", "src/index.ts" ]
