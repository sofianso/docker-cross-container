<!-- Create the container -->
docker build -t favorites-node .

<!-- Run the container -->
docker run --name favorites -d --rm -p 3000:3000 favorites-node

<!-- Run the container to see the errors (-d or detach mode prevents us from seeing any errors)-->
docker run --name favorites --rm -p 3000:3000 favorites-node

<!-- Create your own MongoDB container -->
docker run -d --name mongodb mongo

<!-- To get MongoDB IP address (only after you the MongoDB container from Docker) -->
docker container inspect mongodb