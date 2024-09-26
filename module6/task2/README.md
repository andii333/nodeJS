Task

Imagine you are working on a website for a big glocey store. Implement a service with an endpoint that returns an archive of QR codes for all the products. Each QR code must contain just ID of a specific product.

Requirements:

- Backend should use PRODUCT_AMOUNT environment variable.

- Backend should handle GET /products/qrcodes endpoint.

- The qrcode library should be used to generate the QR codes. The library should be configured to generate PNG files with a size of 500x500px (define in ENV variable).

- Backend should not store any product infromation. Instead, it should generate uuid for every product from 1 to PRODUCT_AMOUNT on the fly.

- Backend should not save the QR code images as files on the server or use significant amounts of RAM. Instead, it should generate the PNG files on the fly and stream them as a response.

- Node.js' built-in zlib module should be used to create a ZIP archive. The archive should contain separate PNG files for each product. The PNG files should be named with the product indexes and have the .png file extension.

- Response should be streamed back to client, and the backend should be able to handle corner case when PRODUCT_AMOUNT is big and the memory is limited.

To run server you need to text in command line  -  " npm run task2 "
To get QRcodes by Postman you should do GET request " http://localhost:3000/products/qrcodes "