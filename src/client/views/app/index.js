import React, { useState, useRef } from 'react';
import Layout from '../layout'
import Timer from '../../components/timer'
import './index.css'
import TimerControls from '../../components/timer-controls'
import AppSettings from '../../components/app-settings';

const App = () => {
  const [isPaused, togglePause] = useState(false)
  const [fresh, setFresh] = useState(true)
  const [settings, updateSettings] = useState({
    previous: {
      focus: {
        hour: 0,
        minute: 15,
        second: 0
      },
      break: null
    },
    focus: {
      hour: 0,
      minute: 15,
      second: 0
    },
    break: {
      hour: 0,
      minute: 15,
      second: 0
    },
    isDirty: false
  })
  const timerRef = useRef()
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
            previousStart={settings.previous.focus}
            timerRef={timerRef}
            // reset={JSON.stringify(start) !== JSON.stringify(settings.focus)}
          />
          <TimerControls isPaused={isPaused} onTogglePause={togglePause} onBreak={takeABreak} />
        </div>
        <AppSettings settings={settings} onUpdate={({ key, unit, event, data }) => {
            console.log('update', key, unit, event, data)
            const current = settings[key]
            updateSettings({
              ...settings,
              [key]: {
                ...settings[key],
                ...data
              },
              previous: {
                [key]: {
                  ...settings.previous[key],
                  ...current
                }
              }
            })
            console.log('clearing timer', timerRef, timerRef.current)
            setFresh(null)
          }
        } />
      </div>
    </Layout>
  )
}

export default App
