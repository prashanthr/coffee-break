import React, { useState } from 'react';
import Layout from '../layout'
import Timer from '../../components/timer'
import './index.css'
import TimerControls from '../../components/timer-controls'
import AppSettings from '../../components/app-settings';

const App = () => {
  const [isPaused, togglePause] = useState(false)
  const [settings, updateSettings] = useState({
    focus: {
      hour: 0,
      minute: 15,
      second: 0
    },
    break: {
      hour: 0,
      minute: 15,
      second: 0
    }
  })
  const takeABreak = () => {}
  console.log('settings', settings)
  return (
    <Layout>
      <div className='coffee-break-app-container'>
        <div className='coffee-break-timer-grid'>
          <Timer 
            className='coffee-break-timer' 
            digitClassName='coffee-break-timer-digit' 
            isPaused={isPaused}
            start={settings.focus}
          />
          <TimerControls isPaused={isPaused} onTogglePause={togglePause} onBreak={takeABreak} />
        </div>
        <AppSettings settings={settings} onUpdate={({ key, unit, event, data }) => {
            console.log('update', key, unit, event, data)
            updateSettings({
              ...settings,
              [key]: {
                ...settings[key],
                ...data
              }
            })
          }
        } />
      </div>
    </Layout>
  )
}

export default App
