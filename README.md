# Networking Cross-Container Communication

## Summary

A containerized `node` app will be able to fetch data from an external API (Star Wars API) and write data to MongoDB (local host).

## Instructions

1. Create the container from the Dockerfile `docker build -t favorites-node .`.
2. Run the container with `docker run --name favorites -d --rm -p 3000:3000 favorites-node`. To check whether data is being returned use `Postman` or `REST Client` to check data is being returned. Check whether `GET` will return value with the following URL `localhost:3000/favorites`.
3. There is no need include MongoDB in our Dockerfile since MongoDB already has an official image that is already downloadable.
   Run MongoDB container `docker run -d --name mongodb mongo`.
4. **IMPORTANT**: Firstly, to allow communication between the NodeJS container and MongoDB container, you must first create a network with `docker network create favorites-net`. **OPTIONAL**: To check the list of networks, run `docker network ls`.
5. Lastly, run the two following commands:
   With MongoDB, there is no need to expose the port like the one in `favorites` because it is sharing the same network. However, you need expose the port in the `favorites` in order to `CRUD` data.

   1. `docker run -d --name mongodb --network favorites-net mongo`
   2. `docker run -d --name favorites --network favorites-net --rm -p 3000:3000 favorites-node`

## List of APIs

1. `localhost:3000/movies`
2. `localhost:3000/people`
3. `localhost:3000/favorites` (local)

## Checking For Errors

Run the container to see the errors and when `-d` is added or in detach mode is added it prevents the container from displaying any errors.
` docker run --name favorites --rm -p 3000:3000 favorites-node`

## GET Data From Dockerised API

Download `REST Client` extension. Use `CTRL+SHIFT+P` to in `rest-client.txt`check the data being returned back after container has been created and running.
