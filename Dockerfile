FROM node:20-bullseye-slim

EXPOSE 80

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN yarn install --frozen-lockfile
RUN yarn nest build

CMD ["yarn", "run", "start:prod"]
