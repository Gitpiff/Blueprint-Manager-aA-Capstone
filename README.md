# Blueprint Manager


### Render Link

[Blueprint Manager](https://blueprint-manager-aa-capstone.onrender.com/)

## DB Diagram
![database schema design here!](/dbDiagram.png)

# Technology Stack
<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="Javascript Logo" width="100" height="100"/>
  <img src="https://sequelize.org/img/logo.svg" alt="Sequelize Logo" width="100" height="100"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" alt="PostgreSQL Logo" width="100" height="100"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" width="100" height="100"/>
  <img src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png" alt="Redux Logo" width="100" height="100"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" alt="HTML5 Logo" width="100" height="100"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" alt="CSS3 Logo" width="100" height="100"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="Express Logo" width="100" height="100"/>
</p>



## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get the Current User

Returns the information about the current User that is logged in.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/session
  * Body: none

* Successful Response when there is a logged in Project Manager
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "username": "JohnSmith",
        "companyName": "Smith Construction",
        "industryName": "Construction",
        "email": "john.smith@gmail.com",
      } 
    }
    ```

* Successful Response when there is no logged in Project Manager
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": null
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/session
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
       "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "username": "JohnSmith",
        "companyName": "Smith Construction",
        "industryName": "Construction",
        "email": "john.smith@gmail.com",
      } 
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", 
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```


### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
       "firstName": "John",
        "lastName": "Smith",
        "username": "JohnSmith",
        "companyName": "Smith Construction",
        "industryName": "Construction",
        "email": "john.smith@gmail.com",
        "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "username": "JohnSmith",
        "companyName": "Smith Construction",
        "industryName": "Construction",
        "email": "john.smith@gmail.com",
      }
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", 
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```


## Project

### Get Current User Projects

When User successfully Logs in,  it should display all active project cards

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/projects/
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "ActiveProjects": [
        {
        "id": 3,
        "projectManagerId": 1,
        "coverImage": "https://theironoffice.com/cdn/shop/files/Gym_12.23-19.jpg?v=1701994187&width=3840",
        "name": "Oscar's Gym",
        "clientName": "Oscar Robles",
        "description": "Oscar's Gym focuses on creating a state-of-the-art gym facility designed to meet the fitness and wellness needs of the community. This modern gym will feature a spacious and open layout, equipped with the latest exercise machines and free weights to cater to all fitness levels. The facility will include dedicated areas for cardio workouts, strength training, group fitness classes, and functional training. Additionally, we will incorporate specialized zones such as a yoga studio, a spin class room, and a recovery area with saunas and massage rooms. The design emphasizes natural light and ventilation to create an inviting and energizing atmosphere, complemented by eco-friendly materials and energy-efficient systems. This gym aims to provide a comprehensive and motivating environment for individuals to achieve their fitness goals and promote a healthy lifestyle.",
        "budget": 80000,
        "startDate": "2025-02-13T00:00:00.000Z",
        "completionDate": "2025-05-01T00:00:00.000Z",
        "createdAt": "2024-08-23T21:59:28.000Z",
        "updatedAt": "2024-08-23T21:59:28.000Z",
        "projectImages": [
            {
                "url": "https://goldcoastschools.com/wp-content/uploads/2023/07/blog_image_how-to-become-a-certified-building-inspector-in-florida@2x.jpg"
            },
            {
                "url": "https://images.unsplash.com/photo-1514994444123-10094655bdb5?q=80&w=2651&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "url": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "url": "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "url": "https://images.unsplash.com/photo-1577992805669-c80be3285f36?q=80&w=4032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        ],
        "employees": [
            {
                "id": 3,
                "firstName": "Alice",
                "lastName": "Johnson",
                "jobTitle": "Site Engineer",
                "hireDate": "2024-06-01T00:00:00.000Z",
                "contactNumber": 12345678903,
                "email": "alice.johnson@example.com",
                "salary": 90000,
                "picture": "https://static.probuildermag.co.uk/professional-builder/uploads/Shutterstock-LO2-scaled.jpg",
                "projectId": 3
            },
            {
                "id": 9,
                "firstName": "Grace",
                "lastName": "Taylor",
                "jobTitle": "Carpenter",
                "hireDate": "2024-03-01T00:00:00.000Z",
                "contactNumber": 12345678909,
                "email": "grace.taylor@example.com",
                "salary": 66000,
                "picture": "https://www.checkatrade.com/blog/wp-content/uploads/2023/10/carpentry-for-women.jpg",
                "projectId": 3
            },
            {
                "id": 11,
                "firstName": "Victor",
                "lastName": "Navarro",
                "jobTitle": "Junior Front End Developer",
                "hireDate": "2024-08-23T00:00:00.000Z",
                "contactNumber": 8318878991,
                "email": "viknavarro@gmail.com",
                "salary": 23000,
                "picture": "https://images.pexels.com/photos/3609139/pexels-photo-3609139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "projectId": 3
            }
        ]
    }
      ]
    }

    ```

### Get A Project by Id

Returns the details of a Project specified by its id.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/projects/:projectId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "id": 3,
        "projectManagerId": 1,
        "coverImage": "https://theironoffice.com/cdn/shop/files/Gym_12.23-19.jpg?v=1701994187&width=3840",
        "name": "Oscar's Gym",
        "clientName": "Oscar Robles",
        "description": "Oscar's Gym focuses on creating a state-of-the-art gym facility designed to meet the fitness and wellness needs of the community. This modern gym will feature a spacious and open layout, equipped with the latest exercise machines and free weights to cater to all fitness levels. The facility will include dedicated areas for cardio workouts, strength training, group fitness classes, and functional training. Additionally, we will incorporate specialized zones such as a yoga studio, a spin class room, and a recovery area with saunas and massage rooms. The design emphasizes natural light and ventilation to create an inviting and energizing atmosphere, complemented by eco-friendly materials and energy-efficient systems. This gym aims to provide a comprehensive and motivating environment for individuals to achieve their fitness goals and promote a healthy lifestyle.",
        "budget": 80000,
        "startDate": "2025-02-13T00:00:00.000Z",
        "completionDate": "2025-05-01T00:00:00.000Z",
        "createdAt": "2024-08-23T21:59:28.000Z",
        "updatedAt": "2024-08-23T21:59:28.000Z",
        "projectImages": [
            {
                "url": "https://goldcoastschools.com/wp-content/uploads/2023/07/blog_image_how-to-become-a-certified-building-inspector-in-florida@2x.jpg"
            },
            {
                "url": "https://images.unsplash.com/photo-1514994444123-10094655bdb5?q=80&w=2651&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "url": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "url": "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "url": "https://images.unsplash.com/photo-1577992805669-c80be3285f36?q=80&w=4032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        ],
        "employees": [
            {
                "id": 3,
                "firstName": "Alice",
                "lastName": "Johnson",
                "jobTitle": "Site Engineer",
                "hireDate": "2024-06-01T00:00:00.000Z",
                "contactNumber": 12345678903,
                "email": "alice.johnson@example.com",
                "salary": 90000,
                "picture": "https://static.probuildermag.co.uk/professional-builder/uploads/Shutterstock-LO2-scaled.jpg",
                "projectId": 3
            },
            {
                "id": 9,
                "firstName": "Grace",
                "lastName": "Taylor",
                "jobTitle": "Carpenter",
                "hireDate": "2024-03-01T00:00:00.000Z",
                "contactNumber": 12345678909,
                "email": "grace.taylor@example.com",
                "salary": 66000,
                "picture": "https://www.checkatrade.com/blog/wp-content/uploads/2023/10/carpentry-for-women.jpg",
                "projectId": 3
            },
            {
                "id": 11,
                "firstName": "Victor",
                "lastName": "Navarro",
                "jobTitle": "Junior Front End Developer",
                "hireDate": "2024-08-23T00:00:00.000Z",
                "contactNumber": 8318878991,
                "email": "viknavarro@gmail.com",
                "salary": 23000,
                "picture": "https://images.pexels.com/photos/3609139/pexels-photo-3609139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "projectId": 3
            }
        ]
    }
    ```

* Error response: Couldn't find a Project with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Project couldn't be found"
    }
    ```


### Create a Project

Creates and returns a new project.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/projects/new
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
     {
        "id": 3,
        "projectManagerId": 1,
        "coverImage": "https://theironoffice.com/cdn/shop/files/Gym_12.23-19.jpg?v=1701994187&width=3840",
        "name": "Oscar's Gym",
        "clientName": "Oscar Robles",
        "description": "Oscar's Gym focuses on creating a state-of-the-art gym facility designed to meet the fitness and wellness needs of the community. This modern gym will feature a spacious and open layout, equipped with the latest exercise machines and free weights to cater to all fitness levels. The facility will include dedicated areas for cardio workouts, strength training, group fitness classes, and functional training. Additionally, we will incorporate specialized zones such as a yoga studio, a spin class room, and a recovery area with saunas and massage rooms. The design emphasizes natural light and ventilation to create an inviting and energizing atmosphere, complemented by eco-friendly materials and energy-efficient systems. This gym aims to provide a comprehensive and motivating environment for individuals to achieve their fitness goals and promote a healthy lifestyle.",
        "budget": 80000,
        "startDate": "2025-02-13T00:00:00.000Z",
        "completionDate": "2025-05-01T00:00:00.000Z",
        "createdAt": "2024-08-23T21:59:28.000Z",
        "updatedAt": "2024-08-23T21:59:28.000Z",
        "projectImages": [
            {
                "url": "https://goldcoastschools.com/wp-content/uploads/2023/07/blog_image_how-to-become-a-certified-building-inspector-in-florida@2x.jpg"
            },
            {
                "url": "https://images.unsplash.com/photo-1514994444123-10094655bdb5?q=80&w=2651&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "url": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "url": "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "url": "https://images.unsplash.com/photo-1577992805669-c80be3285f36?q=80&w=4032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        ],
        "employees": [
            {
                "id": 3,
                "firstName": "Alice",
                "lastName": "Johnson",
                "jobTitle": "Site Engineer",
                "hireDate": "2024-06-01T00:00:00.000Z",
                "contactNumber": 12345678903,
                "email": "alice.johnson@example.com",
                "salary": 90000,
                "picture": "https://static.probuildermag.co.uk/professional-builder/uploads/Shutterstock-LO2-scaled.jpg",
                "projectId": 3
            },
            {
                "id": 9,
                "firstName": "Grace",
                "lastName": "Taylor",
                "jobTitle": "Carpenter",
                "hireDate": "2024-03-01T00:00:00.000Z",
                "contactNumber": 12345678909,
                "email": "grace.taylor@example.com",
                "salary": 66000,
                "picture": "https://www.checkatrade.com/blog/wp-content/uploads/2023/10/carpentry-for-women.jpg",
                "projectId": 3
            },
            {
                "id": 11,
                "firstName": "Victor",
                "lastName": "Navarro",
                "jobTitle": "Junior Front End Developer",
                "hireDate": "2024-08-23T00:00:00.000Z",
                "contactNumber": 8318878991,
                "email": "viknavarro@gmail.com",
                "salary": 23000,
                "picture": "https://images.pexels.com/photos/3609139/pexels-photo-3609139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "projectId": 3
            }
        ]
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:
     ```json
    {
        "id": 3,
        "projectManagerId": 1,
        "coverImage": "https://theironoffice.com/cdn/shop/files/Gym_12.23-19.jpg?v=1701994187&width=3840",
        "name": "Oscar's Gym",
        "clientName": "Oscar Robles",
        "description": "Oscar's Gym focuses on creating a state-of-the-art gym facility designed to meet the fitness and wellness needs of the community. This modern gym will feature a spacious and open layout, equipped with the latest exercise machines and free weights to cater to all fitness levels. The facility will include dedicated areas for cardio workouts, strength training, group fitness classes, and functional training. Additionally, we will incorporate specialized zones such as a yoga studio, a spin class room, and a recovery area with saunas and massage rooms. The design emphasizes natural light and ventilation to create an inviting and energizing atmosphere, complemented by eco-friendly materials and energy-efficient systems. This gym aims to provide a comprehensive and motivating environment for individuals to achieve their fitness goals and promote a healthy lifestyle.",
        "budget": 80000,
        "startDate": "2025-02-13T00:00:00.000Z",
        "completionDate": "2025-05-01T00:00:00.000Z",
        "createdAt": "2024-08-23T21:59:28.000Z",
        "updatedAt": "2024-08-23T21:59:28.000Z",
        "projectImages": [
            {
                "url": "https://goldcoastschools.com/wp-content/uploads/2023/07/blog_image_how-to-become-a-certified-building-inspector-in-florida@2x.jpg"
            },
            {
                "url": "https://images.unsplash.com/photo-1514994444123-10094655bdb5?q=80&w=2651&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "url": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "url": "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "url": "https://images.unsplash.com/photo-1577992805669-c80be3285f36?q=80&w=4032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        ],
        "employees": [
            {
                "id": 3,
                "firstName": "Alice",
                "lastName": "Johnson",
                "jobTitle": "Site Engineer",
                "hireDate": "2024-06-01T00:00:00.000Z",
                "contactNumber": 12345678903,
                "email": "alice.johnson@example.com",
                "salary": 90000,
                "picture": "https://static.probuildermag.co.uk/professional-builder/uploads/Shutterstock-LO2-scaled.jpg",
                "projectId": 3
            },
            {
                "id": 9,
                "firstName": "Grace",
                "lastName": "Taylor",
                "jobTitle": "Carpenter",
                "hireDate": "2024-03-01T00:00:00.000Z",
                "contactNumber": 12345678909,
                "email": "grace.taylor@example.com",
                "salary": 66000,
                "picture": "https://www.checkatrade.com/blog/wp-content/uploads/2023/10/carpentry-for-women.jpg",
                "projectId": 3
            },
            {
                "id": 11,
                "firstName": "Victor",
                "lastName": "Navarro",
                "jobTitle": "Junior Front End Developer",
                "hireDate": "2024-08-23T00:00:00.000Z",
                "contactNumber": 8318878991,
                "email": "viknavarro@gmail.com",
                "salary": 23000,
                "picture": "https://images.pexels.com/photos/3609139/pexels-photo-3609139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "projectId": 3
            }
        ]
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", 
      "errors": {
        "coverImage": "A valid Cover Image URL is required",
        "name": "Project Name must be between 7 and 30 characters",
        "clientName": "Client Name must be between 7 and 30 characters",
        "description": "Project Description must be between 30 and 2000 characters",
        "budget": "Budget must be greater than 500",
        "startDate": "Start Date cannot be in the past",
        "completionDate": "Completion Date is required",
        "projectImages": "You Need At least Another Image"
      }
    }
    ```


### Edit a Project

* Require Authentication: true
* Require proper authorization: Project must belong to the current PM and must be an active project
* Request
  * Method: PUT
  * URL: /api/projects/:projectId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
     {
        "id": 3,
        "projectManagerId": 1,
        "coverImage": "https://theironoffice.com/cdn/shop/files/Gym_12.23-19.jpg?v=1701994187&width=3840",
        "name": "Oscar's Gym",
        "clientName": "Oscar Robles",
        "description": "Oscar's Gym focuses on creating a state-of-the-art gym facility designed to meet the fitness and wellness needs of the community. This modern gym will feature a spacious and open layout, equipped with the latest exercise machines and free weights to cater to all fitness levels. The facility will include dedicated areas for cardio workouts, strength training, group fitness classes, and functional training. Additionally, we will incorporate specialized zones such as a yoga studio, a spin class room, and a recovery area with saunas and massage rooms. The design emphasizes natural light and ventilation to create an inviting and energizing atmosphere, complemented by eco-friendly materials and energy-efficient systems. This gym aims to provide a comprehensive and motivating environment for individuals to achieve their fitness goals and promote a healthy lifestyle.",
        "budget": 80000,
        "startDate": "2025-02-13T00:00:00.000Z",
        "completionDate": "2025-05-01T00:00:00.000Z",
        "createdAt": "2024-08-23T21:59:28.000Z",
        "updatedAt": "2024-08-23T21:59:28.000Z",
        "projectImages": [
            {
                "url": "https://goldcoastschools.com/wp-content/uploads/2023/07/blog_image_how-to-become-a-certified-building-inspector-in-florida@2x.jpg"
            },
            {
                "url": "https://images.unsplash.com/photo-1514994444123-10094655bdb5?q=80&w=2651&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "url": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "url": "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "url": "https://images.unsplash.com/photo-1577992805669-c80be3285f36?q=80&w=4032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        ],
        "employees": [
            {
                "id": 3,
                "firstName": "Alice",
                "lastName": "Johnson",
                "jobTitle": "Site Engineer",
                "hireDate": "2024-06-01T00:00:00.000Z",
                "contactNumber": 12345678903,
                "email": "alice.johnson@example.com",
                "salary": 90000,
                "picture": "https://static.probuildermag.co.uk/professional-builder/uploads/Shutterstock-LO2-scaled.jpg",
                "projectId": 3
            },
            {
                "id": 9,
                "firstName": "Grace",
                "lastName": "Taylor",
                "jobTitle": "Carpenter",
                "hireDate": "2024-03-01T00:00:00.000Z",
                "contactNumber": 12345678909,
                "email": "grace.taylor@example.com",
                "salary": 66000,
                "picture": "https://www.checkatrade.com/blog/wp-content/uploads/2023/10/carpentry-for-women.jpg",
                "projectId": 3
            },
            {
                "id": 11,
                "firstName": "Victor",
                "lastName": "Navarro",
                "jobTitle": "Junior Front End Developer",
                "hireDate": "2024-08-23T00:00:00.000Z",
                "contactNumber": 8318878991,
                "email": "viknavarro@gmail.com",
                "salary": 23000,
                "picture": "https://images.pexels.com/photos/3609139/pexels-photo-3609139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "projectId": 3
            }
        ]
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

     ```json
     {
        "id": 3,
        "projectManagerId": 1,
        "coverImage": "https://theironoffice.com/cdn/shop/files/Gym_12.23-19.jpg?v=1701994187&width=3840",
        "name": "Oscar's Gym",
        "clientName": "Oscar Robles",
        "description": "Oscar's Gym focuses on creating a state-of-the-art gym facility designed to meet the fitness and wellness needs of the community. This modern gym will feature a spacious and open layout, equipped with the latest exercise machines and free weights to cater to all fitness levels. The facility will include dedicated areas for cardio workouts, strength training, group fitness classes, and functional training. Additionally, we will incorporate specialized zones such as a yoga studio, a spin class room, and a recovery area with saunas and massage rooms. The design emphasizes natural light and ventilation to create an inviting and energizing atmosphere, complemented by eco-friendly materials and energy-efficient systems. This gym aims to provide a comprehensive and motivating environment for individuals to achieve their fitness goals and promote a healthy lifestyle.",
        "budget": 80000,
        "startDate": "2025-02-13T00:00:00.000Z",
        "completionDate": "2025-05-01T00:00:00.000Z",
        "createdAt": "2024-08-23T21:59:28.000Z",
        "updatedAt": "2024-08-23T21:59:28.000Z",
        "projectImages": [
            {
                "url": "https://goldcoastschools.com/wp-content/uploads/2023/07/blog_image_how-to-become-a-certified-building-inspector-in-florida@2x.jpg"
            },
            {
                "url": "https://images.unsplash.com/photo-1514994444123-10094655bdb5?q=80&w=2651&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "url": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "url": "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "url": "https://images.unsplash.com/photo-1577992805669-c80be3285f36?q=80&w=4032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        ],
        "employees": [
            {
                "id": 3,
                "firstName": "Alice",
                "lastName": "Johnson",
                "jobTitle": "Site Engineer",
                "hireDate": "2024-06-01T00:00:00.000Z",
                "contactNumber": 12345678903,
                "email": "alice.johnson@example.com",
                "salary": 90000,
                "picture": "https://static.probuildermag.co.uk/professional-builder/uploads/Shutterstock-LO2-scaled.jpg",
                "projectId": 3
            },
            {
                "id": 9,
                "firstName": "Grace",
                "lastName": "Taylor",
                "jobTitle": "Carpenter",
                "hireDate": "2024-03-01T00:00:00.000Z",
                "contactNumber": 12345678909,
                "email": "grace.taylor@example.com",
                "salary": 66000,
                "picture": "https://www.checkatrade.com/blog/wp-content/uploads/2023/10/carpentry-for-women.jpg",
                "projectId": 3
            },
            {
                "id": 11,
                "firstName": "Victor",
                "lastName": "Navarro",
                "jobTitle": "Junior Front End Developer",
                "hireDate": "2024-08-23T00:00:00.000Z",
                "contactNumber": 8318878991,
                "email": "viknavarro@gmail.com",
                "salary": 23000,
                "picture": "https://images.pexels.com/photos/3609139/pexels-photo-3609139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "projectId": 3
            }
        ]
    }
    ```


## Delete a Project

Deletes existing Project

* Require Authentication: true
* Require proper authorization: Project must belong to the current PM
* Request
  * Method: DELETE
  * URL: /api/projects/:projectId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Project Successfully deleted"
    }
    ```

* Error response: Couldn't find a Project with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Project couldn't be found"
    }
    ```


## Employees

### Create new Employee
Creates and returns a new employee.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/employees/new
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
    {
         "id": 3,
        "firstName": "Alice",
        "lastName": "Johnson",
        "jobTitle": "Site Engineer",
        "hireDate": "2024-06-01T00:00:00.000Z",
        "contactNumber": 12345678903,
        "email": "alice.johnson@example.com",
        "salary": 90000,
        "picture": "https://static.probuildermag.co.uk/professional-builder/uploads/Shutterstock-LO2-scaled.jpg",
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:   
   ```json
    {
        "id": 3,
        "firstName": "Alice",
        "lastName": "Johnson",
        "jobTitle": "Site Engineer",
        "hireDate": "2024-06-01T00:00:00.000Z",
        "contactNumber": 12345678903,
        "email": "alice.johnson@example.com",
        "salary": 90000,
        "picture": "https://static.probuildermag.co.uk/professional-builder/uploads/Shutterstock-LO2-scaled.jpg",
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:
   ```json
    {
       "firstName": "First Name is required",
        "lastName": "Last Name is required",
        "jobTitle": "Job Title is required",
        "hireDate": "Hire Date is required",
        "contactNumber": "Phone number is required",
        "email": "Email must have between 4 and 30 characters",
        "salary": "Salary must be a positive number",
        "picture": "Picture is required",
    }
    ```


### Edit an Employee

* Require Authentication: true
* Require proper authorization: Employee must be part of the PM's project and the project must be active
* Request
  * Method: PUT
  * URL: /api/employees/:id
  * Headers:
    * Content-Type: application/json
  * Body:
   ```json
    {
        "id": 3,
        "firstName": "Alice",
        "lastName": "Johnson",
        "jobTitle": "Site Engineer",
        "hireDate": "2024-06-01T00:00:00.000Z",
        "contactNumber": 12345678903,
        "email": "alice.johnson@example.com",
        "salary": 90000,
        "picture": "https://static.probuildermag.co.uk/professional-builder/uploads/Shutterstock-LO2-scaled.jpg",
        "projectId": 3
    }
    ```


### Delete an Employee

Removes Employee from existing Project

* Require Authentication: true
* Require proper authorization: Employee must be part of the PM's project and the project must be active
* Request
  * Method: DELETE
  * URL: /api/employees/:id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Employee Removed from current project"
    }
    ```

* Error response: Couldn't find a Project with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Employee couldn't be found"
    }
    ```


## Project Images

### Create New Project Image

Creates and returns a new Project Image

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/employees
  * Headers:
    * Content-Type: application/json
  * Body:
  
  ```json
    {
         "url": "https://goldcoastschools.com/wp-content/uploads/2023/07/blog_image_how-to-become-a-certified-building-inspector-in-florida@2x.jpg"
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:   
   ```json
    {
        "url": "https://goldcoastschools.com/wp-content/uploads/2023/07/blog_image_how-to-become-a-certified-building-inspector-in-florida@2x.jpg"
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:
   ```json
    {
      "url": "Project Image URL is required",
    }
    ```

### Edit Project Image

* Require Authentication: true
* Request
  * Method: PUT
  * URL: /api/projectImages/:id
  * Headers:
    * Content-Type: application/json
  * Body:
   ```json
    {
      "url": "https://goldcoastschools.com/wp-content/uploads/2023/07/blog_image_how-to-become-a-certified-building-inspector-in-florida@2x.jpg",
    }
    ```

### Delete Project Image

Removes Project Image from existing Project

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/projectImages/:id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Project Image Removed from current project"
    }
    ```

* Error response: Couldn't find a Project with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Project Image couldn't be found"
    }
    ```
