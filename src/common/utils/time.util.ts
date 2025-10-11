import _ from 'lodash'

export const getHourMinuteSecond = (time: string) => {
  const splitTime = _.split(time, ':')
  return {
    hour: Number(splitTime[0]) ?? 0,
    minute: Number(splitTime[1]) ?? 0,
    second: Number(splitTime[2]) ?? 0,
  }
}
