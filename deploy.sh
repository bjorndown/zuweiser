#!/usr/bin/env sh
sudo docker stop zuweiser 
sudo docker rm zuweiser
sudo docker run --name zuweiser -d -p 8081:80 zuweiser