import { statuses } from './index'
import { sample } from 'lodash'

export const notifyOnWelcome = ({
  title: 'Welcome to Coffee Break',
  status: statuses.info,
  dismissible: true,
  dismissAfter: 2500
})

export const notifyOnPaused = ({ onDismiss, onPrimaryClick }) => ({
  title: 'Timer Paused. Go slay dragons',
  status: statuses.info,
  dismissible: true,
  showDismissButton: true,
  dismissAfter: 2500,
  // onDismiss,
  // buttons: [{
  //   name: 'Resume',
  //   primary: true,
  //   onClick: () => onPrimaryClick()
  // }],
})

export const notifyOnResume = ({
  title: 'Welcome back, master',
  status: statuses.info,
  dismissible: true,
  dismissAfter: 2000
})


export const notifyOnFocus = ({
  title: `Okay, now let's get some work done! 💪`,
  status: statuses.info,
  dismissible: true,
  dismissAfter: 2000
})

export const notifyOnBreak = ({
  title: 'Take a break. You deserve it 🧃',
  status: statuses.info,
  dismissible: true,
  dismissAfter: 2000
})

export const notifyOnPomodoro = ({
  title: 'Congrats! You just completed a pomodoro cycle',
  status: statuses.success,
  dismissible: true,
  dismissAfter: 2000
})

export const notifyNutrientReminder = () => ({
  title: `Don't forget to ${sample(['drink 💧', 'have a cup of ☕️', 'eat 🥗'])}`,
  status: statuses.info,
  dismissible: true
})

export const notifyNutrientOverload = ({ nutrient }) => ({
  title: `Whoa. Easy there with the ${nutrient} buddy! Don't overdo it.`,
  status: statuses.warning,
  dismissible: true,
  dismissAfter: 3000
})

export const notifyOnEnergyBoost = ({
  title: 'You just leveled up. Nice ⚡️',
  status: statuses.info,
  dismissible: true,
  dismissAfter: 2000
})

export const notifyOnEnergyDrain = ({
  title: `Whoa. Is it just me or are you feeling a little light headed? 😵`,
  status: statuses.info,
  dismissible: true,
  dismissAfter: 2000 
})

