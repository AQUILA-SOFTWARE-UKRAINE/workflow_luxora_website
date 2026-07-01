# ── Stage 1: Build Next.js frontend ──────────────────────────────────────────
FROM node:22-alpine AS node-builder

WORKDIR /build

RUN npm install -g npm@11

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY
COPY frontend/ ./
RUN npm run build

# ── Stage 2: Combined runtime (Python 3.12 + Node.js 22 + Nginx) ─────────────
FROM python:3.12-slim

# Install Node.js 22, Nginx, and gettext-base (provides envsubst)
RUN apt-get update && apt-get install -y --no-install-recommends \
        nginx \
        gettext-base \
        curl \
        ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# ── Next.js standalone output ─────────────────────────────────────────────────
COPY --from=node-builder /build/.next/standalone   ./frontend/
COPY --from=node-builder /build/.next/static       ./frontend/.next/static
COPY --from=node-builder /build/public             ./frontend/public

# ── Python bot ────────────────────────────────────────────────────────────────
COPY bot/requirements.txt ./bot/requirements.txt
RUN pip install --no-cache-dir -r ./bot/requirements.txt

COPY bot/ ./bot/

# ── Nginx config template + startup script ────────────────────────────────────
COPY nginx.conf.template ./
COPY entrypoint.sh       ./
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]
