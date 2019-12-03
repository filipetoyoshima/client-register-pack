# base image
FROM node:8.16.2-jessie

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . .
RUN npm install --silent    
RUN npm audit fix --silent
RUN npm install sails@1.2.3 -g --silent

# expose the port
EXPOSE 1337

# start app
CMD ["sails", "lift", "--alter"]