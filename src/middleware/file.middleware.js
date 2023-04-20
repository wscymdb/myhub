const multer = require('@koa/multer')
const { UPLOAD_PATH } = require('../config/path')

const multerFile = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, UPLOAD_PATH)
    },
    filename(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    },
  }),
})

const handleAvatar = multerFile.single('avatar')

module.exports = {
  handleAvatar,
}
