import { statuses, positions } from './index'
import { sample } from 'lodash'
import config from '../../config'

export const introNotifications = [{
  payload: {
    title: 'Welcome to Coffee Break ☕️',
    status: statuses.info,
    dismissible: true,
    dismissAfter: config.app.notifications.timeout.short
  },
  timeout: config.app.notifications.timeout.quick
}, {
  payload: {
    title: `This is a productivity app designed to help you focus. It's based on the pomodoro principle 🍅`,
    status: statuses.info,
    showDismissButton: true,
    dismissible: true,
    dismissAfter: config.app.notifications.timeout.long,
  },
  timeout: config.app.notifications.timeout.fallShort
}, {
  payload: {
    title: `
      <div style='line-height: 1.6;'>
      Here's how it works:<br /><br />
      1. Focus on work (or something) for a short period of time (25m ideally) <br />
      2. Take a short break (5 m)<br />
      3. Repeat as needed<br />
      4. Adjust settings to your desire<br />
      5. Remember to hydrate and feed yourself<br />
      
      <br />Hit ▶ Start to begin focusing<br /><br />
      Go forth and conquer the world 🚀
      </div>
    `,
    allowHTML: true,
    status: statuses.info,
    showDismissButton: true,
    dismissible: true,
    dismissAfter: config.app.notifications.timeout.eternity
  },
  timeout: config.app.notifications.timeout.long
}]

export const notifyOnPaused = () => ({
  title: sample([
    'Timer Paused. Go slay dragons 🐉',
    `I'll keep watch while you're gone 👀`,
    `Go find your peace ☮️. Return with zen`,
    `Medidate. Play. Sleep. Come back refreshed! 🧘‍♂️`,
    `Grab a drink. Cheers 🍻`
  ]),
  status: statuses.info,
  dismissible: true,
  showDismissButton: true,
  dismissAfter: config.app.notifications.timeout.long,
})

export const notifyOnResume = () => ({
  title: sample([
    'Welcome back, your excellency 🤴',
    'Hello again, old friend 👋',
    'Good to see you again friend 👋',
    `Ah, you've returned from your quest 🐴. Let us begin`
  ]),
  status: statuses.none,
  dismissible: true,
  dismissAfter: config.app.notifications.timeout.short
})


export const notifyOnFocus = ({
  title: `Okay, now let's get some work done! 💪`,
  status: statuses.info,
  dismissible: true,
  dismissAfter: config.app.notifications.timeout.default
})

export const notifyOnBreak = ({
  title: 'Take a break. You deserve it 🧃',
  status: statuses.info,
  dismissible: true,
  dismissAfter: config.app.notifications.timeout.default
})

export const notifyOnPomodoro = ({
  title: 'Congrats! You just completed a pomodoro cycle 🏅',
  status: statuses.success,
  dismissible: true,
  dismissAfter: config.app.notifications.timeout.default
})

export const notifyNutrientGain = () => ({
  title: `${sample(['Aah that was refreshing', 'Thanks. I needed that.', 'Recharged.'])}`,
  position: positions.bottomRight,
  status: statuses.none,
  dismissible: true,
  dismissAfter: config.app.notifications.timeout.fallShort
})

export const notifyNutrientReminder = () => ({
  title: `Don't forget to ${sample(['drink 💧', 'have a cup of ☕️', 'eat 🥗'])}`,
  position: positions.bottomRight,
  status: statuses.info,
  dismissible: true
})

export const notifyNutrientOverload = ({ nutrient }) => ({
  title: `Whoa. Easy there with the ${nutrient} buddy! Don't overdo it.`,
  position: positions.bottomRight,
  status: statuses.warning,
  dismissible: true,
  dismissAfter: config.app.notifications.timeout.short
})

export const notifyOnEnergyBoost = ({
  title: 'You just leveled up. Nice ⚡️',
  position: positions.bottomRight,
  status: statuses.success,
  dismissible: true,
  dismissAfter: config.app.notifications.timeout.default
})

export const notifyOnEnergyDrain = () => ({
  title: `${sample([
    'Whoa. Is it just me or are you feeling a little light headed? 😵',
    `Are you okay?`,
    `I don't feel so good`
  ])}`,
  postion: positions.bottomRight,
  status: statuses.warning,
  dismissible: true,
  dismissAfter: config.app.notifications.timeout.default 
})

