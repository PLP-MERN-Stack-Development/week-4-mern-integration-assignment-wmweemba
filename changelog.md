## [Date] - [Change Type]
- Description of the change

## [2024-05-10] - Backend Setup Dependencies Installed
- Installed express, mongoose, dotenv, cors, morgan for core backend functionality.
- Added jsonwebtoken and bcryptjs for authentication and password hashing.
- Added nodemon as a dev dependency for development server auto-reloading.

## [2024-05-10] - Implemented Blog API Endpoints
- Added RESTful API endpoints for posts: GET all, GET by id, POST, PUT, DELETE.
- Added RESTful API endpoints for categories: GET all, POST.
- Created controllers and route files for posts and categories.
- Added Category model.

## [2024-05-10] - Input Validation Added
- Implemented input validation for post and category endpoints using express-validator.
- Added validation middleware to post and category routes.

## [2024-05-10] - Error Handling Middleware Added
- Implemented comprehensive error handling middleware for API routes.
- Added asyncHandler wrapper to catch async errors in controllers.
- Updated controllers to use asyncHandler and throw errors instead of try-catch blocks.
