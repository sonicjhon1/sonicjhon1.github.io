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
  return authHeader
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
    x5c: ["MIIDHTCCAgWgAwIBAgIJRmlkgSgOKFesMA0GCSqGSIb3DQEBCwUAMCwxKjAoBgNVBAMTIWRldi10ZXN4eGk1MXhyODhnY2djLnVzLmF1dGgwLmNvbTAeFw0yMjEyMjYwNTQwNTVaFw0zNjA5MDMwNTQwNTVaMCwxKjAoBgNVBAMTIWRldi10ZXN4eGk1MXhyODhnY2djLnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMmYXU4WqytaVzZi012hdy7Ol4JLj1xsXZNsWiVOEyGRoI9a1L9witf6t9CF51b9FlK60m7bh3y5tf6dw8LStwz6N4sl3PKm8j5EvJrQm9eD2BVue481KqUqYHVrBYaptRz6MUzoeFPSaNnRwA5aLO3haICSJARuJIiNaeu/5XopgEQ2/m3ew8qGk3p90Vn/LywCpoqBGdJenuT+n+TGQJKIUNz7OMggTpecX9GBNUpyhiGvAGIIGD2sFMYJM+A1mnPzBAe7SgGiByI5uGB4lOUwMezsX+NPp//ldWmp8U76ba/mKfI4dBDZJwbBE6B+90V8xr2Xqy3nhk9i0aj4TSkCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQU5lTzOrYvsh2pS6DFqkzfRPKetNcwDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3DQEBCwUAA4IBAQBtdiXqbEn5Aw6/Ujq3KiR2Lfy85wvlQbKxzNg/R7KPF6AohOdqgLP68JA0SjhkK0QakIEprK14lzCWpy1ADTBiGhAEFAsYoWE0HW1F0rKe7Zo9ubQOH7woLh/FqsZrDqRHmN1ORFw5DfYf+hOAPZqycipAKl8pawbadlVedeKIViycga0cxovqqmsP2aXQ3GWjOuR+/+ddasMKpHQfkPBdpsrImbHC9Edsa7P/fzCj+/0HDRdPScrCxZdoFDtTx82rBNJn1K7cjV+vUd5zIzTX4MFQIBG89NgKahJq0bi0tpsy7JIAuB2HCYgVw7FI6X7eWGbFcgHG/Y6Iv40PeKRQ"],
    n: "yZhdTharK1pXNmLTXaF3Ls6XgkuPXGxdk2xaJU4TIZGgj1rUv3CK1_q30IXnVv0WUrrSbtuHfLm1_p3DwtK3DPo3iyXc8qbyPkS8mtCb14PYFW57jzUqpSpgdWsFhqm1HPoxTOh4U9Jo2dHADlos7eFogJIkBG4kiI1p67_leimARDb-bd7DyoaTen3RWf8vLAKmioEZ0l6e5P6f5MZAkohQ3Ps4yCBOl5xf0YE1SnKGIa8AYggYPawUxgkz4DWac_MEB7tKAaIHIjm4YHiU5TAx7Oxf40-n_-V1aanxTvptr-Yp8jh0ENknBsEToH73RXzGvZerLeeGT2LRqPhNKQ",
    e: "AQAB",
    kid: "OfiusNg3G7MOWAwTKN1vo",
    x5t: "XzJDiyVwDnPp7N8i6ljtK_ymCRo"
    }
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  return crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, signature, data)
}

export default { isValidJwt }