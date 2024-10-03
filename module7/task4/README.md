Task

Implement Role-Based Access Control (RBAC) decorators for Nest.js controllers. The goal is to provide a flexible and reusable way to enforce route-level permissions based on user roles.

Requirements:
- Create a new decorator using the Nest CLI to handle RBAC permissions.
- Modify the decorator to enforce route-level permissions based on user roles for specific methods in a controller.
- The decorator should retrieve the user's role from the authenticated request context.
- Define the required roles for each route or method using the decorator, ensuring that only users with the appropriate roles can access them.
- If a user attempts to access a route without the required role(s), the decorator should throw an error with a standardized error message and HTTP status code.
- The decorator should be able to handle both synchronous and asynchronous methods in the controller.
- The decorator should be reusable across multiple controllers and applications, allowing for easy configuration of route permissions.
- Use MongoDB to store the data to operate with.
-Implement support for customizable RBAC strategies, such as role hierarchy, fine-grained permissions, or dynamic role assignments.
- Write unit tests to validate the RBAC decorators' functionality and ensure that routes are properly protected based on the defined permissions.

dependencies:
npm i @nestjs/mongoose mongoose

to start test you should text in command line " npm run test "