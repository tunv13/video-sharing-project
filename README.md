# video-sharing

# 1) Introduction:

 - This is a project about sharing video of youtube, user can see all of video that is shared by other people
 - User can login to website to received notification when other user posted new video
 - Technical: ReactJS, NodeJS, MySql
 - key features is: Login, View list video, share video, notification when other user push new video

# 2) Prerequisites: 

Require nodejs version 16+, any tools to ide or editor can using for apply this project (I'm using vscode)

# 3) Installation & Configuration: 

 - Clone project: (require install git)
 >[git clone https://github.com/tunv13/video-sharing-project](https://github.com/tunv13/video-sharing-project.git)
 
- Have 2 file .env (Recommmend stay my configuration)

> /front-end/.env (Link api and save youtube API key)
> 
> /backend/.env (port run BE service and secret key to bypass password)

# 4) Database config
- I am using database server host on cloud AWS RDS. (Recommend using my DB, my configuration)
- Config database in link: */backend/config/config.json*
- Please skip it if you want using my database

You can change address database. Please create database first with charset is utf8.
Then run this command for migration and seed DB
>npx sequelize-cli db:migrate
>
>npx sequelize-cli db:seed:all

# 5) Running the Application (Docker and without Docker)
## Run on local with Docker and Docker-compose
### Run website
Run this command in root folder: 
>docker compose up
>
Everything is auto run and web will start in port 81 *http://localhost:81*

### Run test unit for BE
You must have stay in folder *backend* 
- Run this command for build image
> docker build -t node-docker-unit -f Dockerfile_unit_test .
- Run this command for run unit test
> docker run --rm --name "unit-test" node-docker-unit

### Run test integration for BE
You must have stay in folder *backend* by command
> cd backend
- Run this command for build image
> docker build -t node-docker-integration -f Dockerfile_integration_test .
- Run this command for run unit test
> docker run --rm --name "unit-integration" node-docker-integration


## Run on local without Docker 
### Run website
- You must install nodejs version 16+
- You must you 2 terminals for run 2 services
- At folder front-end: cd front-end && yarn install && yarn start
- At folder backend: cd backend && yarn install && yarn start
- Web will run port 3000 for FE and port 8000 for BE

### Run test unit for BE
You must have stay in folder *backend* by command
> cd backend
>
- Run this command for unit test
> yarn && yarn unit


### Run test integration for BE
You must have stay in folder *backend* by command
> cd backend
>
- Run this command for integration test
> yarn && yarn integration

# 7) Usage
- Login: User can login by default account: example@example.com / 123123
- List video: User can see list video in homepage, if user click to any item in homepage, user can redirect to youtube
- Share video: User click button share video in homepage, website is redirect to Share video screen
>
At this screen, user can paste link youtube in Input box, then system will show preview video. User just click button share video
- Notification: If have any user share video, if you are loged in, you will see a notification box in system

# 8) Troubleshooting
Nothing



