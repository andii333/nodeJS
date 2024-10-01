Task

Implement rate limiting for a Nest.js API using Redis as a storage solution. The API should limit the number of requests that a client can make within a given time period. Requests that exceed the limit should be rejected with a status code such as 429 Too Many Requests. As an input you need to create a small API that allows clients to submit feedback about a product. You want to limit the number of feedback submissions that a client can make within a given time period to prevent spam.

Requirements:

- The API should limit the number of requests that a client can make within a given time period.

- Use ThrottledGuard proposed by Nest.js to handle rate limiting. Documentation.

- The rate limit should be configurable, with parameters such as the number of requests allowed per time period and the time period itself.

- Requests that exceed the limit should be rejected with a status code such as 429 Too Many Requests.

- Redis should be used as a storage solution to store and retrieve rate limit data.

- Configure rate limit to allow only 2 requests per minute. Manually check that rate limiter is correctly working: 

Try one request per minuteTry two request per minuteTry three request per minuteTry two requests per minute and one request after minute pause.

To run server you need to text in command line  -  " npm run start "
By the postman send request Get to " http://localhost:3000/ "