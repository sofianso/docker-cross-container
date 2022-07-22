<!-- Create the container -->
docker build -t favorites-node .

<!-- Run the container -->
docker run --name favorites -d --rm -p 3000:3000 favorites-node
