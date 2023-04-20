const { UNKNOW_ERROR } = require('../config/error.config')
const momentService = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    const { id } = ctx.tokenInfo
    const { content } = ctx.request.body

    if (!content) return

    const result = await momentService.create({ id, content }, ctx)
    if (result) {
      ctx.body = {
        code: 0,
        msg: '添加成功～',
      }
    }
  }
  async list(ctx, next) {
    let { current, pageSize } = ctx.request.body
    // 处理分页
    if (!current) current = 1
    if (!pageSize) pageSize = 10
    current = pageSize * (current - 1)

    const result = await momentService.queryList({ current, pageSize }, ctx)

    ctx.body = {
      code: 0,
      msg: '获取列表成功',
      data: result,
    }
  }

  async detail(ctx, next) {
    const { id } = ctx.params

    const result = await momentService.queryListById(id)

    ctx.body = {
      code: 0,
      msg: '查询列表成功',
      data: result[0],
    }
  }

  async update(ctx, next) {
    const { id, content } = ctx.request.body
    if (!id || !content) return

    const result = await momentService.updateById({ id, content }, ctx)
    if (result) {
      ctx.body = { code: 0, msg: '修改成功～' }
    }
  }

  async delete(ctx, next) {
    const { id } = ctx.params

    if (!id) return
    const result = await momentService.deleteById(id, ctx)
    if (result) {
      ctx.body = { code: 0, msg: '删除成功～' }
    }
  }

  async addLabels(ctx, next) {
    const { id } = ctx.params
    const labels = ctx.labels

    try {
      // 将id(momentID)和label添加到moment_label表中
      for (let label of labels) {
        // 判断当前存入的label_id和moment_id，表里是否存在相同的记录
        const isExists = await momentService.hasLabel(id, label.id)
        if (isExists) continue

        // 不存在才添加
        const insertResult = await momentService.addLabels(id, label.id)
      }

      ctx.body = {
        code: 0,
        msg: '添加成功～',
      }
    } catch (error) {
      console.log(error)
      ctx.app.emit('error', UNKNOW_ERROR, ctx)
    }
  }
}

module.exports = new MomentController()
