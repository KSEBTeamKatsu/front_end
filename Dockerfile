# 빌드 단계
FROM node:22.15.0-alpine3.21 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 배포 단계
FROM node:22.15.0-alpine3.21 AS dev
WORKDIR /app
COPY --from=build /app /app
EXPOSE 5173
# CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
