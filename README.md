## Server information

1. Connect to EC2
   `ssh -i "wavyroom-front.pem" ubuntu@ec2-43-203-106-222.ap-northeast-2.compute.amazonaws.com`

2. Login into Super User
   `su`
   `0000`

3. Pull the code
   ` cd wavyroom_front`
   ` git pull`

4. Kill the pm2 and build
   `pm2 kill`
   `yarn build`
   `pm2 start "yarn start"`
