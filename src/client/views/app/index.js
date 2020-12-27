import React, { useState, useRef } from 'react';
import Layout from '../layout'
import Timer from '../../components/timer'
import './index.css'
import TimerControls from '../../components/timer-controls'
import AppSettings from '../../components/app-settings'

const App = () => {
  const [isPaused, togglePause] = useState(false)
  const [inBreak, toggleBreak] = useState(false)
  const [isTimerDone, setTimerDone] = useState(false)
  const [settings, updateSettings] = useState({
    focus: {
      time: {
        hour: 0,
        minute: 25, // Pomodoro
        second: 0
      },
      strokeColor: '#d367c1'
    },
    break: {
      time: {
        hour: 0,
        minute: 10,
        second: 0
      },
      strokeColor: 'orange'
    },
    coffee: {
      value: 0
    },
    water: {
      value: 0
    }
  })
  const onEnd = () => {
    console.log('timer is done')
    setTimerDone(true)
  }
  const onStart = () => {
    console.log('timer started')
    setTimerDone(false)
  }
  const activeSettingKey = inBreak ? 'break' : 'focus'
  const activeSetting = settings[activeSettingKey]
  return (
    <Layout>
      <div className='coffee-break-app-container'>
        <div className='coffee-break-timer-grid'>
          <TimerControls 
            isPaused={isPaused} 
            isDone={isTimerDone}
            inBreak={inBreak} 
            onTogglePause={event => togglePause(!isPaused)} 
            onToggleBreak={event => toggleBreak(!inBreak)} 
            onRestart={event => {
              updateSettings({
                ...settings,
                [activeSettingKey]: {
                  ...activeSetting,
                  time: {
                    ...activeSetting.time
                  }
                }
              })
            }}
          />
          <Timer 
            className='coffee-break-timer' 
            digitClassName='coffee-break-timer-digit' 
            isPaused={isPaused}
            start={activeSetting.time}
            strokeColor={activeSetting.strokeColor}
            onStart={onStart}
            onEnd={onEnd}
          />
        </div>
        <AppSettings settings={settings} onUpdate={({ key, property, data }) => {
            console.log('update', key, property, data)
            updateSettings({
              ...settings,
              [key]: {
                ...settings[key],
                ...data
              },
            })
          }
        } />
      </div>
    </Layout>
  )
}

export default App
