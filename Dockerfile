# From the node image (version 20)
FROM node:20

# Create app directory
WORKDIR /usr/src/smurfinder

# Copy current directory content from host to the container’s directory 
COPY . .

# Set environement variable SMURFINDER_PORT
ENV SMURFINDER_PORT=80

# Run the npm install command to get the node_modules directories 
RUN npm install

# Espose app on port 80
EXPOSE 80

# Run the command to launch the nodejs express server 
CMD [ "node", "index.js"]