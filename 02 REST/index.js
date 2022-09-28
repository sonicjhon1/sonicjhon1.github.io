addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  var result = await fetch("https://sonicj.pages.dev/assets/images/1.webp")
  return result
}