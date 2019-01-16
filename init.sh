#!/usr/local/bin/zsh
concurrently -n client,server "cd client; yarn serve" "cd server; yarn dev"