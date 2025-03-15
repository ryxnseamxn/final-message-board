FROM node:22-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./
RUN npm install --omit=dev

# Copy source (EXCLUDES .env via .dockerignore)
COPY . .

# Use environment variables from CLOUD RUN
CMD ["node", "index.js"]