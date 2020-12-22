import { isProd } from '../util/env'

const defaultConfig = {
  debug: true,
  logErrorsToConsole: true,
  apiBaseUrl: 'http://localhost:8088',
  ipUrl: "https://ipinfo.io/json",
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
}

const prodConfig = {
  ...defaultConfig,
  apiBaseUrl: 'https://today-api.universal-apps.xyz',
  debug: false,
  logErrorsToConsole: true
}

const config = isProd() ? prodConfig : defaultConfig

export default config
