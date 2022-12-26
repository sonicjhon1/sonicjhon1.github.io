# 👷 `cloudflare-worker-template-auth0-jwt` Hello World... with a valid JWT!

A template for kick starting a Cloudflare worker project with validation of Auth0 JWTs.

[`index.js`](https://github.com/bcnzer/cloudflare-worker-template-auth0-jwt/blob/master/index.js) is the content of the Workers script. Note the use of the `IsValidJwt` function.

[`auth0-jwt-validation.js`](https://github.com/bcnzer/cloudflare-worker-template-auth0-jwt/blob/master/auth0-jwt-validation.js) is where all the validation work occurs. 

## Setting up your JWK
**IMPORTANT** You must setup your JWK info in code, in [`auth0-jwt-validation.js`](https://github.com/bcnzer/cloudflare-worker-template-auth0-jwt/blob/master/auth0-jwt-validation.js)

You can get your JWK info from `https://[your_domain].auth0.com/.well-known/jwks.json`

To learn more checkout the [Setup and Testing instructions](https://github.com/bcnzer/cloudflare-worker-template-auth0-jwt/blob/master/docs/setupandtesting.md).

## Wrangler
To generate using [wrangler](https://github.com/cloudflare/wrangler)

```
wrangler generate myApp https://github.com/bcnzer/cloudflare-worker-template-auth0-jwt
```

## Serverless
To deploy using serverless add a [`serverless.yml`](https://serverless.com/framework/docs/providers/cloudflare/) file.
