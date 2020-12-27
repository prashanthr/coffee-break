import React, { useState, useRef, useEffect } from 'react';
import Layout from '../layout'
import Timer from '../../components/timer'
import TimerControls from '../../components/timer-controls'
import AppSettings from '../../components/app-settings'
import { set, get, sample } from 'lodash'
import './index.css'

const App = () => {
  const [isPaused, togglePause] = useState(false)
  const [inBreak, toggleBreak] = useState(false)
  const [isTimerDone, setTimerDone] = useState(false)
  const [settings, updateSettings] = useState({
    timer: {
      value: 'progress'
    },
    notifications: {
      value: true
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
      strokeColor: '#d367c1'
    },
    break: {
      time: {
        hour: 0,
        minute: 10,
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
        value: 0
      },
      water: {
        label: '💧 Water',
        value: 0
      },
      food: {
        label: `${sample(['🍔','🍕','🍟','🥗','🍜','🍩'])} Food`,
        value: 0
      }
    }
  })
  const activeSettingKey = inBreak ? 'break' : 'focus'
  const activeSetting = settings[activeSettingKey]
  console.log('set', settings)
  const updateEnergy = ({ factor, action }) => {
    console.log('Updating energy', factor, action)
    const getValue = () => {
      const currentValue = settings.energy.value
      const max = 100
      const min = 0
      switch(action) {
        case 'increment':
          return Math.min(currentValue + factor, max)
        case 'decrement':
          return Math.max(currentValue - factor, min)
      }
    }
    updateSettings({
      ...settings,
      energy: {
        ...settings.energy,
        value: getValue() 
      }
    })
  }
  const onEnd = () => {
    console.log('timer is done')
    setTimerDone(true)
  }
  const onStart = () => {
    console.log('timer started')
    setTimerDone(false)
  }
  const onTick = ({ time }) => {
      updateSettings({
        ...settings,
        [activeSettingKey]: {
          ...activeSetting,
          elapsed: {
            ...activeSetting.elapsed,
            time
          }
        }
      })
  }
  const onPomodoroComplete = ({ time }) => {
    console.log('Pomodoro Complete at', time)
    updateSettings({
      ...settings,
      energy: {
        ...settings.energy,
        value: settings.energy.value > 2 
          ? settings.energy.value > 30 
            ? settings.energy.value - 10
            : settings.energy.value > 10
              ? settings.energy.value - 5
              : settings.energy.value - 2
          : settings.energy.value
      }
    })
  }
  const onNutrientUpdate = ({ nutrient, property }) => {
    console.log('onNutrientUpdate', nutrient, property)
    switch (property) {
      case 'increment':
        updateSettings({
          ...settings,
          energy: {
            ...settings.energy,
            value: settings.energy.value <= 98 
              ? settings.energy.value >= 70 
                ? settings.energy.value + 5
                : settings.energy.value > 50
                  ? settings.energy.value + 10
                  : settings.energy.value + 20
              : 100
          }
        })
        return
      case 'decrement':
        updateSettings({
          ...settings,
          energy: {
            ...settings.energy,
            value: settings.energy.value > 2 
              ? settings.energy.value > 50 
                ? settings.energy.value - 10
                : settings.energy.value > 30
                  ? settings.energy.value - 5
                  : settings.energy.value - 5
              : settings.energy.value
          }
        })
        return
    }
  }
  
  return (
    <Layout>
      <div className='coffee-break-app-container'>
        <div className='coffee-break-timer-grid'>
          <TimerControls 
            isPaused={isPaused} 
            isDone={isTimerDone}
            inBreak={inBreak} 
            onTogglePause={event => togglePause(!isPaused)} 
            onToggleBreak={event => {
              if (inBreak) {
                updateEnergy({ factor: 5, action: 'increment' })
              }
              toggleBreak(!inBreak)
              
            }} 
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
            type={settings.timer.value}
            className='coffee-break-timer' 
            digitClassName='coffee-break-timer-digit' 
            isPaused={isPaused}
            start={activeSetting.time}
            elapsed={activeSetting.elapsed.time}
            strokeColor={activeSetting.strokeColor}
            onStart={onStart}
            onEnd={onEnd}
            onTick={onTick}
            onPomodoroComplete={onPomodoroComplete}
          />
        </div>
        <AppSettings 
          settings={settings} 
          onUpdate={({ key, property, data }) => {
            console.log('update', key, property, data)
            updateSettings({
              ...settings,
              ...set(settings, key, {
                ...get(settings, key),
                ...data
              })
            })
            if (key.includes('nutrients.')) {
              onNutrientUpdate({
                nutrient: key.replace('nutrients.', ''),
                property
              })
            }
          }
        } />
      </div>
    </Layout>
  )
}

export default App
