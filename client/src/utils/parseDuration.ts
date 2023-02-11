import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

// use plugins
dayjs.extend(duration)

export function parseDuration(durationInSeconds: number) {
  const duration = dayjs.duration(durationInSeconds, 's')

  let parsedString = ''

  // if there are minutes --> parse minutes 
  if (duration.minutes() > 0 || duration.hours() > 0) {
    parsedString = `${Math.floor(duration.asMinutes())}min`
    if (duration.seconds() > 0) { // if there are seconds --> parse seconds 
      parsedString += ` e ${duration.seconds()}s`
    }
  } else { // parse seconds
    parsedString = `${duration.seconds()}s`
  }


  return parsedString
}
