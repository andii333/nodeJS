Task

1. Implement simple Express.js POST endpoint /csv which respond a CSV stream (copy generation code from the previous task).

2. The endpoint should accept the same parameters as in the previous task (size limit or rows limit). The parameters must be properly validated.

3. Downloading file must have correct MIME type headers, name etc.

4. Downloaded file must be properly opened in Excel.

5. Test using file size 2GB or higher.

To start server, you need to enter command in the terminal: " npm run task2".
To display result with your sizeLimit, you need to do request with json 
{
  "limit": yourSizeLimit,
  "type": "size"
}
or
{
  "limit": yourRowLimit,
  "type": "row"
}

