# Serverless TODO

This project is a simple todo application which is implemented using serverless framework, authO, and aws resources(api gateway, s3 bucket,aws lambda, dynamodb)
Third party authorizer (AuthO) to grant users permissions to perform CRUD 
operations

# Functionality of the application

This application will allow creating/removing/updating/fetching TODO items. Each TODO item can optionally have an attachment image. Each user only has access to TODO items that he/she has created.

### Homepage outlook. Users can create, update, view and delete todos.

![homepage](https://github.com/droffilc1/udacity-c4-final-project/blob/main/images/homepage.PNG)

### Deploying the serverless backend creates a cloudformation stack on aws 

![stack](https://github.com/droffilc1/udacity-c4-final-project/blob/main/images/cloudformation.PNG)

![xray](https://github.com/droffilc1/udacity-c4-final-project/blob/main/images/serverle7.PNG)

### View project instructions [here](https://github.com/droffilc1/udacity-c4-final-project/blob/main/images/INSTRUCTIONS.md)