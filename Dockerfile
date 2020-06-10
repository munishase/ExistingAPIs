FROM node:12.18.0
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["sh", "-c", "npm run dev"]
