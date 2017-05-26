const Jimp = require('jimp')

module.exports = async ({ src, size=20, quality=20, type='image/jpeg' }) => {
  const image = await Jimp.read(src)
  const n_size = parseInt(size, 10)
  const n_quality = parseInt(quality, 10)

  return image.resize(n_size, Jimp.AUTO)
    .quality(n_quality)
    .getBuffer(type, (err, buffer) => {
      const base64Image = buffer.toString('base64')
      const newImage = `data:${type};base64,${base64Image}`

      return newImage
    })

}
