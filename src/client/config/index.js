import { isProd } from '../util/env'
import { sample } from 'lodash'

const defaultConfig = {
  debug: true,
  logErrorsToConsole: true,
  coffeeUrl: "https://www.buymeacoffee.com/TGuwXOA",
  analytics: {
    google: {
      propertyId: ''
    }
  },
  author: {
    name: "Prashanth R.",
    url: "https://github.com/prashanthr"
  },
  app: {
    cache: {
      ttl: 43200,
      keys: {
        settings: 'coffee-break-timer-settings',
        intro: 'coffee-break-intro'
      }
    },
    notifications: {
      timeout: {
        quick: 1000,
        default: 2000,
        fallShort: 2500,
        short: 3000,
        long: 5000,
        eternity: 40000,
        nutrientReminder: 3600000
      }
    },
    energy: {
      min: 0,
      max: 100
    },
    defaultSettings: {
      timer: {
        value: 'progress'
      },
      notifications: {
        value: true
      },
      sync: {
        value: false,
      },
      focus: {
        time: {
          hour: 0,
          minute: 25, // Pomodoro
          second: 0
        },
        elapsed: {
          time: {
            hour: 0,
            minute: 0,
            second: 0
          },
          pomodoros: 0
        },
        strokeColor: '#5d65e7'
      },
      break: {
        time: {
          hour: 0,
          minute: 5,
          second: 0
        },
        elapsed: {
          time: {
            hour: 0,
            minute: 0,
            second: 0
          },
        },
        strokeColor: 'orange'
      },
      energy: {
        value: 100
      },
      nutrients: {
        coffee: {
          label: '☕ Coffee',
          max: 3,
          value: 0,
          notify: true
        },
        water: {
          label: '💧 Water',
          value: 0
        },
        food: {
          label: `${sample(['🍔','🍕','🍟','🥗','🍜','🍩'])} Food`,
          value: 0,
          max: 3,
          notify: true
        }
      }
    }
  }
}

const prodConfig = {
  ...defaultConfig,
  debug: false,
  logErrorsToConsole: true
}

const config = isProd() ? prodConfig : defaultConfig

export default config
