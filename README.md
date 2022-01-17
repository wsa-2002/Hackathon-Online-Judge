## Hackthon Online Judge
### Web Programming 110-1 Final Project
by daphne, jtc, wsa

### About this project
This project can judge your hackathon result with cypress online. It also gives you a friendly designed page to see your judged results. 

### How to run this service locally
1. `backend` and `judgecore`  
    (1) copy `.env.local.example` in `/backend`, rename it to `.env` and modify it if needed   
    (2) copy `.env.local.example` in `/judgecore`, rename it to `.env` and modify it if needed  
    (3) rename `docker-compose.local.example.yaml` to `docker-compose.yaml`      
    (4) run the following commands at root
    ``` shell
    docker network create cpj
    ```
    ``` shell
    docker-compose up
    ```
2. `frontend`  
   (1) copy `.env.example` in `frontend`, rename it to `.env` and modify it if needed   
   (2) run the following commands
    ```shell
    cd frontend
    ```
    ``` shell
    yarn
    ```
    ``` shell
    yarn start
    ```

3. `minio` bucket setting  
   (1) go to `localhost:8081` for minio console  
   (2) login with account `cpj_demo` and password `cpj_demo`  
   (3) select `Buckets` on sidebar and click `Create Bucket` at right hand side  
   (4) create a bucket called `temp`

### How to use Hackathon Online Judge?

If you're running the project at local, go to `http://localhost:3006`.  
Or if you want to use the deployed version, go to `https://hackathon.judge.nanami.one`.

#### For TA
1. Login with username : `TA`, password : `wp1101ta`
2. Zip your cypress folder
3. Add a task (include uploading the `cypress.zip`)
4. Zip your src folder
5. Choose a task to submit
6. Submit your `src.zip`
7. Wait for your result
8. Start again from step three or step five

#### For Student
1. Login with username : `student`, password : `wp1101student` or register an account
2. Zip your src folder
3. Choose a task to submit
4. Submit your `src.zip`
5. Wait for your result
6. Start again from step four

#### Notes
1. There are `cypress` and `src` in the `example` folder, you can zip them and upload them if you want.
2. It is known that putting multiple cypress specs in a task will result in a connection timeout with rabbitmq. Please separate your cypress specs into multiple tasks.
3. Save port `3000`, `3006`, `5432`, `8000`, `8080`, `8081` when deploying in local environment. 
4. If your OS is Windows, change `"start": "PORT=3006 react-scripts start"` in `/frontend/package.json` to `"start": "set PORT=3006 && react-scripts start"`.
5. Strongly recommend that you reserve enough RAM for running these services at local in case of judgecore's performance issue. (It's highly possible that the judge feature fails with less than 8G RAM.)
6.  When you need to test the judge feature on the deployed website, contact [陳杰彤](https://www.facebook.com/jtongchenzip/) to open the judgecore.
7.  Currently, this project will connect to the developer's RabbitMQ by default. If you want to connect to your own RabbitMQ, change `.env` in `/judgecore` and `/backend`. **Do not** start a rabbitmq service in docker because connection error is likely to happen. See [StackOverFlow](https://stackoverflow.com/questions/64952005/pika-rabbitmq-docker-with-tls-gen-connection-reset-no-logs).
8.  Only a pure frontend hackathon can be judged now, i.e., only hack1 is supported, not hack2 nor hack3. 


### Job Distribution
* 陳杰彤 b09705001 
   * 前端靜態頁面
   * 後端 API
   * design db schema
   * rabbitmq, backend, judgecore, db docker script
   * deploy    
* 侯維書 b09705005   
   * UI/UX 設計
   * 前端架構、動態頁面
   * 後端 API
   * design db schema
   * minio docker script
* 王紹安 b09705017 
   * 前端串接資料, reducer
   * 後端架構, API
   * design db schema
   * Judge core

### 參考架構
此 project 參考了資管系程式課程批改系統 PDOGS 的程式碼架構，但所有程式碼皆由組員從頭撰寫。

### DEPLOYED LINK
https://hackathon.judge.nanami.one

### DEMO 影片連結
https://youtu.be/A_7S-DE9dug