import config from '../config'

export const debug = (...data) => {
	if (config.debug) {
		console.log(...data)
	}
}

export const logErrorToConsole = (...data) => {
  if (config.logErrorToConsole) {
		console.error(...data)
	}
}
