const { parse } = require('url')
const { send, json } = require('micro')

const imgProcessor = require('./lib/imgProcessor')

module.exports = async (req, res) => {
  const { query, pathname } = parse(req.url, true) || {}

  if (pathname !== '/') {
    const error = new Error(`Page ${pathname} not Found`)
    error.statusCode = 404
    throw error
  }

  if (!query.src) {
    const exampleUrl = 'https://localhost:3000?src=http://fakeimg.pl/300/'
    const error = new Error(
      `You must query for a specific source image using a URL like ${exampleUrl}`
    )
    error.statusCode = 400
    throw error
  }

  const newImage = await imgProcessor(query)
  res.setHeader('Content-Type', 'text/html')
  send(res, 200, `<img src="${newImage}"/>`)
}
