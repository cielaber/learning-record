import Knex from '~/src/library/mysql'
import moment from 'moment'
import _ from 'lodash'
import MProject from '~/src/model/project/project'
import MSystem from '~/src/model/parse/system'
import Logger from '~/src/library/logger'
import MCityDistribution from '~/src/model/parse/city_distribution'
import DATE_FORMAT from '~/src/constants/date_format'

const BASE_TABLE_NAME = 't_r_system_device'
const TABLE_COLUMN = [
  `id`,
  `project_id`,
  `device_vendor`,
  `device_model`,
  `total_count`,
  `count_at_month`,
  `city_distribute_id`,
  `create_time`,
  `update_time`
]

/**
 * 获取表名
 * @param {number} projectId 项目id
 * @param {number} createTimeAt 创建时间, 时间戳
 * @return {String}
 */
function getTableName () {
  return BASE_TABLE_NAME
}

async function summarySystemDevice (visitAt) {
  let visitAtMonth = moment.unix(visitAt).format(DATE_FORMAT.DATABASE_BY_MONTH)
  const projectList = await MProject.getList()
  for (let rawProject of projectList) {
    const projectId = _.get(rawProject, 'id', '')
    const projectName = _.get(rawProject, 'project_name', '')
    const systemTableName = MSystem.getTableName(projectId)
    Logger.info(`开始处理项目${projectId}(${projectName})的数据`)
    Logger.info(`[${projectId}(${projectName})] 统计月份:${visitAtMonth}`)
    const sumRes = await Knex
      .count('* as total_count')
      .select([`device_vendor`, `device_model`, `visit_at_month`, `country`, `province`, `city`])
      .from(systemTableName)
      .where('visit_at_month', '=', visitAtMonth)
      .groupBy('device_vendor')
      .groupBy('device_model')
      .groupBy('country')
      .groupBy('province')
      .groupBy('city')
      .catch((err) => {
        Logger.error(err)
        return [];
      })
    Logger.info(`sumRes`,sumRes)  
    if (sumRes.length === 0) {
      continue
    }
    
    let deviceVersionRecord = {}
    for (let countItem of sumRes) {
      const { device_model: deviceModel, device_vendor: deviceVendor, country, province, city, total_count: totalCount, visit_at_month: countAtMonth } = countItem
      let distribution = {}
      let distributionPath = [country, province, city]
      _.set(distribution, distributionPath, totalCount)
      let deviceVersionKey = deviceModel + deviceVendor
      if (_.has(deviceVersionRecord, deviceVersionKey)) {
        // 若是已经有，更新count/distribution
        let oldCount = _.get(deviceVersionRecord, [deviceVersionKey, 'totalCount'], 0)
        let newCount = oldCount + totalCount
        let oldDistribution = _.get(deviceVersionRecord, [deviceVersionKey, 'distribution'], {})
        let cityDistribute = MCityDistribution.mergeDistributionData(distribution, oldDistribution, (newCityRecord, oldCityRecord) => { return newCityRecord + oldCityRecord })
        _.set(deviceVersionRecord, [deviceVersionKey, 'totalCount'], newCount)
        _.set(deviceVersionRecord, [deviceVersionKey, 'distribution'], cityDistribute)
      } else {
        _.set(deviceVersionRecord, [deviceVersionKey], {
          totalCount: totalCount,
          deviceVendor: deviceVendor,
          deviceModel: deviceModel,
          countAtMonth: countAtMonth,
          distribution: distribution
        })
      }
    }

    let totalCount = 0
    console.log('deviceVersionRecord',deviceVersionRecord);
    for (let item of Object.keys(deviceVersionRecord)) {
      if (item) {
        totalCount = totalCount + 1
      }
      let recordInfo = deviceVersionRecord[item]
      await replaceAndAutoIncreaseDeviceRecord(projectId, recordInfo, recordInfo['distribution'])
    }
    Logger.info(`项目${projectId}(${projectName})处理完毕, 共处理${totalCount}条数据`)
  }
}

/**
 * 自动创建&更新, 并增加total_count的值
 * @param {number} projectId
 * @param {number} totalCount
 * @param {number} countAtMonth
 * @param {string} countType
 * @param {object} cityDistribute
 * @return {boolean}
 */
async function replaceAndAutoIncreaseDeviceRecord (projectId, recordInfo, cityDistribute) {
  const { totalCount, deviceVendor, deviceModel, countAtMonth } = recordInfo
  if (!deviceVendor || !deviceModel || !countAtMonth) {
    return false
  }
  let tableName = getTableName()
  let updateAt = moment().unix()
  // 返回值是一个列表
  let oldRecordList = await Knex
    .select([`total_count`, `city_distribute_id`, `create_time`, `id`])
    .from(tableName)
    .where('project_id', '=', projectId)
    .andWhere('count_at_month', '=', countAtMonth)
    .andWhere('device_vendor', '=', deviceVendor)
    .andWhere('device_model', '=', deviceModel)
    .catch(() => {
      return []
    })
  // 利用get方法, 不存在直接返回0, 没毛病
  let id = _.get(oldRecordList, [0, 'id'], 0)
  let cityDistributeIdInDb = _.get(oldRecordList, [0, 'city_distribute_id'], 0)
  let createTimeInDb = _.get(oldRecordList, [0, 'create_time'], 0)

  let data = {
    project_id: projectId,
    count_at_month: countAtMonth,
    total_count: totalCount,
    update_time: updateAt
  }
  let isSuccess = false
  if (id > 0) {
    // 更新城市分布数据
    let isUpdateSuccess = MCityDistribution.updateCityDistributionRecord(cityDistributeIdInDb, projectId, createTimeInDb, JSON.stringify(cityDistribute))
    if (isUpdateSuccess === false) {
      return false
    }
    // 更新具体数据
    let affectRows = await Knex(tableName)
      .update(data)
      .where(`id`, '=', id)
    isSuccess = affectRows > 0
  } else {
    // 首先插入城市分布数据
    let cityDistributeId = await MCityDistribution.insertCityDistributionRecord(JSON.stringify(cityDistribute), projectId, updateAt)
    if (cityDistributeId === 0) {
      // 城市分布数据插入失败
      return false
    }
    data['device_vendor'] = deviceVendor
    data['device_model'] = deviceModel
    data['city_distribute_id'] = cityDistributeId
    data['total_count'] = totalCount
    data['create_time'] = updateAt
    let insertResult = await Knex
      .returning('id')
      .insert(data)
      .into(tableName)
      .catch(e => { return [] })
    let insertId = _.get(insertResult, [0], 0)
    isSuccess = insertId > 0
  }
  return isSuccess
}

/**
 * 获取记录
 */
async function getRecord (projectId, countAtMonth) {
  let tableName = getTableName()
  let recordList = await Knex
    .select(TABLE_COLUMN)
    .from(tableName)
    .where('project_id', '=', projectId)
    .andWhere('count_at_month', '=', countAtMonth)
    .catch(() => {
      return []
    })
  return _.get(recordList, [0], {})
}

export default {
  getRecord,
  summarySystemDevice
}
