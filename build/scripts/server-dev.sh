while [ ! -d "dist" ]
do
  sleep 1;
  echo "Waiting for build file to be generated."
done
npm run start-dev-server;
