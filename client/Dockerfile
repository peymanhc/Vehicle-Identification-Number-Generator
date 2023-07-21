FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN cat /app/.env
RUN npm install --only=prod --force
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]