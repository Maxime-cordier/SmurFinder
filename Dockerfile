# From the node image (version 20)
FROM node:20

# Create app directory
WORKDIR /usr/src/smurfinder

# Copy current directory content from host to the container’s directory 
COPY . .

# Definition of the environment parameters
ENV HIT_COUNTER_PORT 3000 
ENV MONGO_USER admin 
ENV MONGO_PASSWORD pass123 
ENV MONGO_HOST localhost 
ENV MONGO_PORT 27017

# Run the npm install command to get the node_modules directories 
RUN npm install

# Run the command to launch the nodejs express server 
CMD [ "node", "index.js"]