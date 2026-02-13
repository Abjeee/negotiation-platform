# Test for auth service
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

# Test for negotiation service
```
curl -X POST http://localhost:5000/negotiate/start \
-H "Content-Type: application/json" \
-d '{"productId":"P1","basePrice":1000,"minPrice":700}'

curl -X POST http://localhost:5000/negotiate/message \
-H "Content-Type: application/json" \
-d '{"sessionId":"SESSION_ID_HERE","message":"Too expensive"}'

curl -X POST http://localhost:5000/negotiate/offer \
-H "Content-Type: application/json" \
-d '{"sessionId":"SESSION_ID_HERE","offer":650}'

```
