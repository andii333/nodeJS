Task

Implement data validation for User profile, using Nest.js built-in class-validator The goal is to ensure that incoming data is validated according to predefined rules and constraints, providing a reliable and secure application.

Requirements:

- Utilize the class-validator library to perform data validation in a Nest.js app.

- Create a sample data model, such as a User entity, with various properties that need to be validated.

- Implement validation decorators provided by the class-validator library to enforce rules on the data model, such as required fields, string length limits, numerical ranges, and email format validation.

- Handle validation errors and return appropriate error responses to the client.

- Implement a custom validation rule using a class-validator decorator to perform more complex validation logic, such as:

- unique username;

- email validation against existing data;

- 18 years old access validation, calculated from date of birth.

- Create a Nest.js controller or service that handles requests to create or update instances of the data model and performs validation before saving the data.

- Write unit tests to ensure the validation rules are properly enforced and validated against different input scenarios.

To run nest you need to text in command line  -  " npm run start "
To run tests you need to text in command line  -  " npm run test "