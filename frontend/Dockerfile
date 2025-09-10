# 1단계: 빌드
FROM node:18-alpine as build
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci --only=production

# 소스코드 복사
COPY . .

# Vite로 빌드
RUN npm run build

# 2단계: Nginx로 서빙
FROM nginx:alpine

# 빌드된 파일을 Nginx 디렉토리로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 포트 80 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
