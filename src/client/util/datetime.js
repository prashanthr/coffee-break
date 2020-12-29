import { debug } from './debug'

export const toHumanReadableDate = (
	date,
	options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
}) => {
 	return new Intl.DateTimeFormat('en-US', options).format(date)
}

export const getTimeZone = () => {
	const result = Intl.DateTimeFormat().resolvedOptions().timeZone
	debug('getTimeZone', result)
	return result
}

