FROM node:22-alpine AS deps
WORKDIR /app
# Upgrade npm to match the version used to generate package-lock.json (npm 11)
RUN npm install -g npm@11
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY frontend/ ./
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Standalone output contains server.js + trimmed node_modules
COPY --from=builder /app/.next/standalone ./
# Static assets are not bundled into standalone
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
