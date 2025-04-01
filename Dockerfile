# Step 1: Build Stage
FROM node:18.18-slim AS builder

WORKDIR /home/node/pizza_ordering_frontend

COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY next.config.ts ./
RUN npm install --force --global yarn typescript

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build


#step 2: Production Stage
FROM node:18.18-slim AS production

WORKDIR /home/node/pizza_ordering_frontend

COPY --from=builder /home/node/blog_frontend/.next ./.next
COPY --from=builder /home/node/blog_frontend/public ./public
COPY --from=builder /home/node/blog_frontend/package.json ./
COPY --from=builder /home/node/blog_frontend/yarn.lock ./
COPY --from=builder /home/node/blog_frontend/next-i18next.config.js ./
COPY --from=builder /home/node/blog_frontend/next.config.mjs ./
COPY --from=builder /home/node/blog_frontend/next-sitemap.config.js ./
COPY --from=builder /home/node/blog_frontend/tsconfig.json ./
COPY --from=builder /home/node/blog_frontend/i18n.ts ./
COPY --from=builder /home/node/blog_frontend/.env .env

RUN yarn install --production --frozen-lockfile

EXPOSE 3000
CMD ["yarn", "start"]