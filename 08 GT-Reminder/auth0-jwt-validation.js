/**
 * Following code is based on code found at https://blog.cloudflare.com/dronedeploy-and-cloudflare-workers/
 * but has been modified to make it work for Auth0. Details here: https://liftcodeplay.com/2018/10/01/validating-auth0-jwts-on-the-edge-with-a-cloudflare-worker/
 */

/**
 * Parse the JWT and validate it.
 *
 * We are just checking that the signature is valid, but you can do more that. 
 * For example, check that the payload has the expected entries or if the signature is expired..
 */ 
async function isValidJwt(request) {
  const encodedToken = getJwt(request);
  if (encodedToken === null) {
    return false
  }
  const token = decodeJwt(encodedToken);

  // Is the token expired?
  let expiryDate = new Date(token.payload.exp * 1000)
  let currentDate = new Date(Date.now())
  if (expiryDate <= currentDate) {
    console.log('expired token')
    return false
  }

  return isValidJwtSignature(token)
}

/**
 * For this example, the JWT is passed in as part of the Authorization header,
 * after the Bearer scheme.
 * Parse the JWT out of the header and return it.
 */
function getJwt(request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || authHeader.substring(0, 6) !== 'Bearer') {
    return null
  }
  return authHeader.substring(6).trim()
}

/**
 * Parse and decode a JWT.
 * A JWT is three, base64 encoded, strings concatenated with ‘.’:
 *   a header, a payload, and the signature.
 * The signature is “URL safe”, in that ‘/+’ characters have been replaced by ‘_-’
 * 
 * Steps:
 * 1. Split the token at the ‘.’ character
 * 2. Base64 decode the individual parts
 * 3. Retain the raw Bas64 encoded strings to verify the signature
 */
function decodeJwt(token) {
  const parts = token.split('.');
  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));
  const signature = atob(parts[2].replace(/_/g, '/').replace(/-/g, '+'));
  console.log(header)
  return {
    header: header,
    payload: payload,
    signature: signature,
    raw: { header: parts[0], payload: parts[1], signature: parts[2] }
  }
}

/**
 * Validate the JWT.
 *
 * Steps:
 * Reconstruct the signed message from the Base64 encoded strings.
 * Load the RSA public key into the crypto library.
 * Verify the signature with the message and the key.
 */
async function isValidJwtSignature(token) {
  const encoder = new TextEncoder();
  const data = encoder.encode([token.raw.header, token.raw.payload].join('.'));
  const signature = new Uint8Array(Array.from(token.signature).map(c => c.charCodeAt(0)));

  // You need to JWK data with whatever is your public RSA key. If you're using Auth0 you
  // can download it from https://[your_domain].auth0.com/.well-known/jwks.json

  // The following is setup with the data from an application www.wolftracker.nz 
  // The JWK is available here: https://wolftracker.au.auth0.com/.well-known/jwks.json
  const jwk = {
    alg: "RS256",
    kty: "RSA",
    key_ops: ['verify'],
    use: "sig",
    x5c: ["MIIDCzCCAfOgAwIBAgIJXs0oPWThI8kPMA0GCSqGSIb3DQEBCwUAMCMxITAfBgNVBAMTGHdvbGZ0cmFja2VyLmF1LmF1dGgwLmNvbTAeFw0xNzExMjkwNzQ5MjNaFw0zMTA4MDgwNzQ5MjNaMCMxITAfBgNVBAMTGHdvbGZ0cmFja2VyLmF1LmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANdgF6PPBcEjHcw/ULja/NDZPcVU/8D3k5TY7+pTrM51z6lE0C81xMJwOTKq9IF9dy5TGkA5Wfyr1B+yOxGiUeWk8gdDL1Ub6iNzrQ33FY1mbYVL3cWIM4tfqZ8IxVMgHZMGHfRGvPFcL3iBfrevx5aJbHUAVCecwLQpaGIC+UFtUSEbPoIp1BTyW2ElULiksGBuPGuSjfnGLtuJE1sprj8obyb+dbz3vHvNIZi1g2OA4aFZuyBH6v/Lhp0mIHTtmJgde8gM9mbgR7AZap+mGhUerQsnAB5P8XGpmiZslBrBdv6FlwnL4OfCUx7NItjaSC204O/I5jCIMVrqoThbiH0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUAr4kHf0TYR1teaBpAGtjPXH/xZ8wDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3DQEBCwUAA4IBAQA6NsyUvjnbUeAgnAZpKfUzDviJDYrkvcVeCXqy3yB8oJ6nTBDKXnIjQ9/5NvCpqVABxflvAfvUxG7APyBDAHOnvoiUUPE4GOFTNuqCAcwXT1fFETdZdozdpfA2835rVT5wvoo6Rt03vDpSYJH8h9O+EFfrpH/w+J4MIkRdy5DDCve0eUdICKZJEUccIkni9p5p23KdPjhHU+lztKzz6oUUsmSzJQLwGJ7p1dl25nKbobr+btCqLD8Ln/U9iryTK371JMg/XPh+CsBD+ofSEF0cKcrkhr5TLzA8R+ua4NxH6t5D6AFdNUyE1Pv8GfRjcuSBdI87d1Clne9m8JlBi8xZ"],
    n: "12AXo88FwSMdzD9QuNr80Nk9xVT_wPeTlNjv6lOsznXPqUTQLzXEwnA5Mqr0gX13LlMaQDlZ_KvUH7I7EaJR5aTyB0MvVRvqI3OtDfcVjWZthUvdxYgzi1-pnwjFUyAdkwYd9Ea88VwveIF-t6_HlolsdQBUJ5zAtCloYgL5QW1RIRs-ginUFPJbYSVQuKSwYG48a5KN-cYu24kTWymuPyhvJv51vPe8e80hmLWDY4DhoVm7IEfq_8uGnSYgdO2YmB17yAz2ZuBHsBlqn6YaFR6tCycAHk_xcamaJmyUGsF2_oWXCcvg58JTHs0i2NpILbTg78jmMIgxWuqhOFuIfQ",
    e: "AQAB",
    kid: "MTQ0NjMxOTBCNEJDMjEyM0ZDMkMwQTRGRTRCRTkzRkU0NkY2NTU0RQ",
    x5t: "MTQ0NjMxOTBCNEJDMjEyM0ZDMkMwQTRGRTRCRTkzRkU0NkY2NTU0RQ"
    }
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  return crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, signature, data)
}

export default { isValidJwt }