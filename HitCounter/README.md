# HitCounter App  

- [About](#about)  
- [Prerequisites](#prerequisites)  
- [How to run the app](#how-to-run-the-app)  
- [How to deploy with Docker](#how-to-deploy-with-docker)  

---  
## About  

This is a web application which display the number of requests on the server  

---  
## Prerequisites  

You will have to use ***nodejs*** and ***npm***. 

To download them (usable for Manjaro, for Ubuntu or Debian, use `apt install`):  
 
`yay –Sy nodejs npm` 

---  
## How to run the app  

Run this command to **install all the modules required to start the application**: 

`npm install` 

To **launch the server**, run the following command: 

`node index.js`  

--- 
## How to deploy with Docker  

Command to **build the image**: 

`docker build . -t <IMAGE-DESIRED-NAME>` 

Command to **deploy the stack** if you use Docker Swarm:  

`docker stack deploy -c docker-compose.yml <STACK-DESIRED-NAME> ` 

Command to **replicate the container**: 

`docker service scale hit_counter_stack_hit_counter=2` 