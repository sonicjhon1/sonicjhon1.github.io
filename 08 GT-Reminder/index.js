import auth from './auth0-jwt-validation'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
}) 

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  try {
    let isValid = await auth.isValidJwt(request)
    if (!isValid) {
      return new Response('Invalid JWT', { status: 403 })
    }
  
    console.log('JWT is valid')
    return new Response('Hello worker with a valid JWT!', { status: 200 })
    
  } catch (error) {
    console.log(error)
    return new Response('Invalid JWT', { status: 403 })
  }
}
