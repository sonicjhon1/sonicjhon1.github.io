# 🗝 How to Setup and Test 🗝

## Setting up the JWK certificate from your tenant
When we get a JWT (JSON Web Token) we need to check a bunch of things, such as if well formed, expired and cryptographically valid.

To do the latter you need to enter details from your Auth0 tenant. You can get everything you need from [`https://[your_domain].auth0.com/.well-known/jwks.json`](https://[your_domain].auth0.com/.well-known/jwks.json)

### Why hard code the JWK info?
Auth0 [do not rotate (change) your JWK info](https://community.auth0.com/t/when-do-signing-certificates-change-expire/7487) so it's effectively static. You could try reading the file directly but may encourage rate limiting limits from Auth0. You could get clever and read the file occasionally and cache it if you want to.

## How To Test
Let's use a test website - something simple.

### Step 1: Get a token
* Go to [www.wolftracker.nz](www.wolftracker.nz)
* Login with your choice of account (GitHub, Twitter, Google). It doesn't matter which
* Open up your Chrome dev tools. Go to *Application* > *Local Storage*
* Find the item with a key of `id_token`. The value should start with `eyJ` and be quite long

![alt text](wolftracker-jwt.png "Logo Title Text 1")


### Step 2: Test using Wrangler
* In the command line, run `wrangler preview`. This will open a web browser tab
* In the browser click on the *Testing* tab
* Click *Add New Header*
* In the key field enter `Authorization`
* In the value field enter `Bearer ` and then the token. For example (note this will likely be expired if you try the following): 
```
Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1UUTBOak14T1RCQ05FSkRNakV5TTBaRE1rTXdRVFJHUlRSQ1JUa3pSa1UwTmtZMk5UVTBSUSJ9.eyJpc3MiOiJodHRwczovL3dvbGZ0cmFja2VyLmF1LmF1dGgwLmNvbS8iLCJzdWIiOiJnaXRodWJ8MTM2MjE4NzYiLCJhdWQiOiJIODB0NVJENllaRmszS25kWkd2UjBJeVM2d0FqYlR3NSIsImlhdCI6MTU2MDA2NjU0MCwiZXhwIjoxNTYwMTAyNTQwLCJhdF9oYXNoIjoiZGt2QmcyTll3RlNpU2ZSY1IyNlg0dyIsIm5vbmNlIjoiX3J1X0VscHg4NXlMdGJBNTQ3Z3pidGVIZ0ptdlU4X2wifQ.0dHGFqSlgw5kQUhnqImMZgieg5YIivKNVkZlPoD3_g_QNz1BEhjzsmBsabDqSEAlxqVvm6U6ZaXuKMxilnrtBYGHFS-nSV1q6SqaxlA5w3odOE43c3xu9FGcuGutgWrpKZiJ3v_NVNAKxScEjItYQuWYs-Cs9YIwwk9nPbjtz0eGFIf2gLMIXPAiQ-gks68RfjWKDGrsmGlJ4OlLACjDbN-ubgZclwdWHdkjXUknfp4AdG_UJVG073OpPvPt8H7TPzjrBxHcKltVOwmXP6JNfAoMLe0G1w_p0xx7cqWZXj1sRF6P9so1T4ItTJUMbBLBxxWr6fHgAE7VjFuqXW4UZw
```
* Click *Run Test*
* If it's all good you get a 200 OK response and it says *Hello worker with a valid JWT!*. If not you'll get a 403 and a message saying *Invalid JWT*

![alt text](testing-jwt.png "Logo Title Text 1")