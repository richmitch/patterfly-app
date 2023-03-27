FROM registry.redhat.io/nodejs/nodejs-14:latest

# Expose ports.
EXPOSE 8080
EXPOSE 443

WORKDIR /app

# Add application sources
ADD content/ .

CMD [ "yarn", "start" ]
