import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './views/home'
import App from './views/app'
import config from './config'
import { loadAnalytics } from './util/analytics'

const Routes = () => {
  useEffect(() => {
    loadAnalytics(config.analytics.google.propertyId)
  }, [])
  return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/app' component={App} />
        </Switch>
      </Router>
  )
}

export default Routes
