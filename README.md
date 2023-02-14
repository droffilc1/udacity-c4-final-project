# Serverless TODO

This project is a simple todo application which is implemented using serverless framework, authO, and aws resources(api gateway, s3 bucket,aws lambda, dynamodb)
Third party authorizer (AuthO) to grant users permissions to perform CRUD 
operations

# Functionality of the application

This application will allow creating/removing/updating/fetching TODO items. Each TODO item can optionally have an attachment image. Each user only has access to TODO items that he/she has created.

### Homepage outlook. Users can create, update, view and delete todos.

![homepage](https://user-images.githubusercontent.com/97587370/218666323-cc0336e2-7589-46ca-9701-9040552adb2d.png)

### Deploying the serverless backend creates a cloudformation stack on aws 

![cloudformation](https://user-images.githubusercontent.com/97587370/218666626-c06dc0ce-7a06-4d48-93da-ea7bf306a0a5.png)

![xray](https://user-images.githubusercontent.com/97587370/218666946-758ec142-3481-4db2-a775-c6b2fedc0eb5.png)

### View project instructions [here](https://github.com/droffilc1/udacity-c4-final-project/blob/main/INSTRUCTIONS.md)
