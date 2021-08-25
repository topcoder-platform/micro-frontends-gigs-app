# Use the base image with Node.js
FROM node:10.22.1

# Copy the current directory into the Docker image
COPY . /micro-frontends-gigs-app

# Set working directory for future use
WORKDIR /micro-frontends-gigs-app

# Install the dependencies from package.json
RUN npm install

RUN npm run build

CMD npm start
