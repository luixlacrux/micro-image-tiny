const { parse } = require('url')
const { json } = require('micro')

const imgProcessor = require('./lib/imgProcessor')

const baseUrl = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:3000'
  : 'https://micro-image-tiny.now.sh'

module.exports = async (req, res) => {
  const { query, pathname } = parse(req.url, true) || {}

  if (pathname !== '/') {
    const error = new Error(`Page ${pathname} not Found`)
    error.statusCode = 404
    throw error
  }

  if (!query.src) {
    const exampleUrl = `${baseUrl}?src=http://fakeimg.pl/300/`
    const error = new Error(
      `You must query for a specific source image using a URL like ${exampleUrl}`
    )
    error.statusCode = 400
    throw error
  }

  const mimetype = query.type || 'image/jpeg'
  const imageBuffer = await imgProcessor(query)

  res.setHeader('Content-Type', mimetype)
  res.end(imageBuffer, 'binary')
}
