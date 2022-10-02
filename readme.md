
    SIMPLE TODO APP

1. Pre-configucation
    - Create database name (schema) 'todoapp' on MySQL database
    - Open source file on any command tools
    - Install node packages by running command
        - npm install
    - Initialize model to database, by running command
        - npm run dev sync, (note: CTRL-C after initialized the model to database)
    - (Optional) If using VSCOde, install RestClient by "Huachao Mao".
        - This tools will enable you to run the rest file as a RestApi client

2. Running the application
    - Run the applicaiton by running the command
        - npm run dev

3. Consumming the RestAPI
    - If using Rest Client on VSCode, just click the "Send Request"
    - Note: token will be automaticaly included on request after login
    - If using other Rest Client software like (Postman), make sure that after login copy the token and use it on the fallowing endpoint
        -   POST {{baseurl}}/todoapp/add
        -   GET {{baseurl}}/todoapp/list?page=1&size=10&title=

4. Question
    - Any question or comment, you my send these to ryan23montemayor@yahoo.com or ryan23montemayor@gmail.com