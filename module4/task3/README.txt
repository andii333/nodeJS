Task

1. Implement simple Express.js POST endpoint /transform/json, which should fetch data as a stream from URL (http://.../csv) specified in environment variables. The application from the previous task should be run on this URL and serve requests.

2. The /transform/json endpoint should transform the loading data stream to JSON on the fly and output to the http response stream.

3. The endpoint should accept only the single parameter: rows limit.

4. Downloaded file must contain a valid JSON and be provided with proper content type headers.

5. Implement a POST endpoint /transform/ndjson similar to the /transform/json. It should return a valid NDJSON file (MIME-type “application/x-ndjson”).

To display result you need:
1.Run server of previous task - in command line text "npm run task2" in folder task2
2.Run server of this task - in command line text "npm run task3" in folder task3
3.Open index.html file in browser and try.