# Production build
FROM node:20-bookworm-slim AS production

WORKDIR /usr/src/prod

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

RUN addgroup --system --gid 1001 nodep
RUN adduser --system --uid 1001 apijs

# Copy source code and set ownership
COPY --chown=apijs:nodep . .

CMD ["npm", "run", "start"]