import React, { useState, useEffect } from 'react';
import Layout from '../layout'
import Timer from '../../components/timer'
import TimerControls from '../../components/timer-controls'
import AppSettings from '../../components/app-settings'
import { set, get, sample } from 'lodash'
import { effects } from '../../components/notification'
import { 
  introNotifications,
  notifyOnPaused, 
  notifyOnResume,
  notifyOnPomodoro,
  notifyOnBreak,
  notifyOnFocus,
  notifyNutrientReminder,
  notifyOnEnergyBoost,
  notifyOnEnergyDrain,
  notifyNutrientOverload,
  notifyNutrientGain
} from '../../components/notification/payloads'
import './index.css'

const displayIntroNotifications = ({ notifyFunc }) => {
  console.log('displaying intro...')
  introNotifications
    .forEach(n => {
      effects.notifyWithTimeout({ notifyFunc, ...n })
    })
}

const App = () => {
  const { notify } = effects.useNotifications()
  useEffect(() => {
    displayIntroNotifications({ notifyFunc: notify })
  }, [])
  useEffect(() => {
    const timer = setTimeout(() => {
      notify(notifyNutrientReminder())
    }, 3600000)
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer)
  })
  const [isPaused, togglePause] = useState(true) // Start the timer paused
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
  })
  const activeSettingKey = inBreak ? 'break' : 'focus'
  const activeSetting = settings[activeSettingKey]
  console.log('set', settings)
  const onPauseChange = (event) => {
    togglePause(!isPaused)
    notify(isPaused 
      ? notifyOnResume()
      : notifyOnPaused({ 
          // onDismiss: () => togglePause(!isPaused),
          // onPrimaryClick: () => {
          //     console.log('isp pri')
          //     togglePause(!isPaused)
          //   }
          })
    )
  }
  const onBreakChange = (event) => {
    if (inBreak) {
      updateEnergy({ factor: 5, action: 'increment' })
    }
    toggleBreak(!inBreak)
    notify(inBreak ? notifyOnFocus : notifyOnBreak)
  }
  const updateEnergy = ({ factor, action }) => {
    console.log('Updating energy', factor, action)
    const getValue = () => {
      const currentValue = settings.energy.value
      const max = 100
      const min = 0
      switch(action) {
        case 'increment':
          notify(notifyOnEnergyBoost)
          return Math.min(currentValue + factor, max)
        case 'decrement':
          notify(notifyOnEnergyDrain())
          return Math.max(currentValue - factor, min)
        default:
          return currentValue
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
    console.log('Pomodoro Complete at', time, 'inBreak', inBreak)
    if (!inBreak) { 
      notify(notifyOnPomodoro)
      updateSettings({
        ...settings,
        focus: {
          ...settings.focus,
          elapsed: {
            ...settings.focus.elapsed,
            pomodoros: settings.focus.elapsed.pomodoros + 1
          }
        }
      })
      updateEnergy({
        factor: (
          settings.energy.value > 2 
            ? settings.energy.value > 30 
              ? 10
              : settings.energy.value > 10
                ? 5
                : 2
            : 0
        ),
        action: settings.energy.value > 2 ? 'decrement' : null
      })
    }
  }
  const onNutrientUpdate = ({ nutrient, property }) => {
    console.log('onNutrientUpdate', nutrient, property)
    const nutrientInQuestion = settings.nutrients[nutrient]
    if (nutrientInQuestion.notify && nutrientInQuestion.value > nutrientInQuestion.max) {
      notify(notifyNutrientOverload({ nutrient: nutrientInQuestion.label }))
    }
    switch (property) {
      case 'increment':
        updateEnergy({
          factor: (
            settings.energy.value <= 98 
              ? settings.energy.value >= 70 
                ? 5
                : settings.energy.value > 50
                  ? 10
                  : 20
              : 0
          ),
          action: settings.energy.value <= 98 ? 'increment' : null
        })
        notify(notifyNutrientGain())
        return
      case 'decrement':
        updateEnergy({
          factor: (
            settings.energy.value > 2 
            ? settings.energy.value > 50 
              ? 10
              : settings.energy.value > 30
                ? - 5
                : - 5
            : 0
          ),
          action: settings.energy.value > 2 ? 'decrement' : null
        })
        return
      default:
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
            onTogglePause={event => onPauseChange(event)} 
            onToggleBreak={event => onBreakChange(event)} 
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
          onDisplayIntroNotifications={(event) => displayIntroNotifications({ notifyFunc: notify })}
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
