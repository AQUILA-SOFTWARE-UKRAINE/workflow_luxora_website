#!/bin/sh
set -e

# Inject Heroku's $PORT into the Nginx config.
# The quoted argument tells envsubst to ONLY replace ${PORT};
# nginx's own $host, $remote_addr, etc. are left untouched.
envsubst '${PORT}' < /app/nginx.conf.template > /etc/nginx/nginx.conf

# Start Next.js standalone on internal port 3000 (bound to localhost only)
PORT=3000 HOSTNAME=127.0.0.1 node /app/frontend/server.js &

# Start the Telegram/Supabase bot on internal port 5000.
# Subshell keeps the cd from affecting the script's own working directory.
( cd /app/bot && PORT=5000 python main.py ) &

# Start Nginx in the foreground — this is PID 1's effective process,
# so the container stays alive and OS signals are handled correctly.
exec nginx -g 'daemon off;'
