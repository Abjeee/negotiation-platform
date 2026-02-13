#test
```
node src/server.js (this is to run the server, keeping auth_service folder as root; .env can be accessed like this , you can change the path in the dotconfig file
curl -X POST http://localhost:4000/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com","password":"123456","role":"developer"}'

curl -X POST http://localhost:4000/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com","password":"123456"}'

curl -X POST http://localhost:4000/auth/api-key
)

```
