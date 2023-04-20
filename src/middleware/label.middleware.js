const labelService = require('../service/label.service')

async function verifyLabelExists(ctx, next) {
  try {
    const { labels } = ctx.request.body
    // 判断label表中是否存在客户端传入都label
    const labelArr = []
    for (const name of labels) {
      let labelObj = { name }

      const result = await labelService.existsLabel(name, ctx)
      if (result) {
        labelObj.id = result.id
      } else {
        const insertResult = await labelService.create(name, ctx)
        labelObj.id = insertResult.insertId
      }

      labelArr.push(labelObj)
    }
    ctx.labels = labelArr
    await next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = verifyLabelExists
