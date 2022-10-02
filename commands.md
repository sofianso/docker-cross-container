<!-- Create the container -->
docker build -t favorites-node .

<!-- Run the container -->
docker run --name favorites -d --rm -p 3000:3000 favorites-node

<!-- Run the container to see the errors (-d or detach mode prevents us from seeing any errors)-->
docker run --name favorites --rm -p 3000:3000 favorites-node

<!-- Create your own MongoDB container -->
docker run -d --name mongodb mongo

<!-- To get MongoDB IP address (only after you pull the MongoDB image from Docker) -->
docker container inspect mongodb

<!-- Allow Docker containers to retrieve and configure IP addresses among containers -->
docker run --network my_network...
docker run -d --name mongodb --network favorites-net mongo

<!-- Unlike volumes, you have to create the network using the command below -->
docker network --help
docker network create favorites-net
<!-- Run this again after the network is created-->
docker run -d --name mongodb --network favorites-net mongo
docker run -d --name favorites --network favorites-net --rm -p 3000:3000 favorites-node

