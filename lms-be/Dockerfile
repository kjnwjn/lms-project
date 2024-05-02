FROM node:18 as builder

WORKDIR /opt/lms/

COPY package.json yarn.lock ./

RUN yarn

COPY ./ ./

RUN npm i -g @vercel/ncc

RUN ncc build src/main.ts -mo dist/main.js

FROM node:18-slim

WORKDIR /opt/lms/

COPY --from=builder /opt/lms/dist ./
# COPY --from=builder /opt/lms/.env ./

CMD [ "node", "/opt/lms/main.js" ]