import React, { useState, useEffect } from 'react';
import Layout from '../layout'
import Timer from '../../components/timer'
import TimerControls from '../../components/timer-controls'
import AppSettings from '../../components/app-settings'
import { set, get, sample, pick } from 'lodash'
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
import { getLocalStorage, setLocalStorage } from '../../util/local-storage';
import config from '../../config'

const defaultSettings = config.app.defaultSettings

const settingsLocalStorageKey = config.app.cache.keys.settings
const getSettingsSyncExpiry = () => new Date().getTime() + config.app.cache.ttl
const introLocalStorageKey = config.app.cache.keys.intro

const displayIntroNotifications = ({ notifyFunc }) => {
  introNotifications
    .forEach(n => {
      effects.notifyWithTimeout({ notifyFunc, ...n })
    })
}

const App = () => {
  const [isPaused, togglePause] = useState(true) // Start the timer paused
  const [inBreak, toggleBreak] = useState(false)
  const [isTimerDone, setTimerDone] = useState(false)
  const [settingsSyncExpiry, setSettingsSyncExpiry] = useState(getSettingsSyncExpiry())
  const cachedSettings = getLocalStorage(settingsLocalStorageKey) || {}
  console.log('cachedSettings', cachedSettings.sync, defaultSettings.sync)
  const [settings, updateSettings] = useState({
    ...defaultSettings,
    // ...cachedSettings
  })
  // Notifications
  const { notify } = effects.useNotifications()
  const appNotify = (payload) => {
    if (settings.notifications.value === true) {
      notify(payload)
    }
  }
  useEffect(() => {
    const isIntroShown = getLocalStorage(introLocalStorageKey)
    if (!isIntroShown) {
      displayIntroNotifications({ notifyFunc: appNotify })  
      setLocalStorage(introLocalStorageKey, true)
    }
  }, [])
  useEffect(() => {
    const timer = setTimeout(() => {
      appNotify(notifyNutrientReminder())
    }, config.app.notifications.timeout.nutrientReminder)
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer)
  })

  const activeSettingKey = inBreak ? 'break' : 'focus'
  const activeSetting = settings[activeSettingKey]
  
  // useEffect(() => {
  //   console.log('sett sync', settings.sync)
  //   if (settings.sync.value === true) {
  //     setLocalStorage(settingsLocalStorageKey, settings, settingsSyncExpiry)
  //   } else {
  //     // setLocalStorage(settingsLocalStorageKey, {})
  //   }
  // }, [settings])

  const onResetSettings = () => {
    setLocalStorage(settingsLocalStorageKey, null)
    updateSettings(defaultSettings)
  }

  const onPauseChange = (event) => {
    togglePause(!isPaused)
    appNotify(isPaused 
      ? notifyOnResume()
      : notifyOnPaused()
    )
  }
  const onBreakChange = (event) => {
    if (inBreak) {
      updateEnergy({ factor: 5, action: 'increment' })
    }
    toggleBreak(!inBreak)
    appNotify(inBreak ? notifyOnFocus : notifyOnBreak)
  }
  const updateEnergy = ({ factor, action }) => {
    const getValue = () => {
      const currentValue = settings.energy.value
      const max = config.app.energy.max
      const min = config.app.energy.min
      switch(action) {
        case 'increment':
          appNotify(notifyOnEnergyBoost)
          return Math.min(currentValue + factor, max)
        case 'decrement':
          appNotify(notifyOnEnergyDrain())
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
    setTimerDone(true)
  }
  const onStart = () => {
    setTimerDone(false)
  }
  const onTick = ({ time }) => {
      console.log('tick', settings.sync)
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
    if (!inBreak) { 
      appNotify(notifyOnPomodoro)
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
    const nutrientInQuestion = settings.nutrients[nutrient]
    if (
        nutrientInQuestion.notify && 
        nutrientInQuestion.value > nutrientInQuestion.max
      ) {
      appNotify(notifyNutrientOverload({ nutrient: nutrientInQuestion.label }))
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
        appNotify(notifyNutrientGain())
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
          onDisplayIntroNotifications={(event) => displayIntroNotifications({ notifyFunc: appNotify })}
          onResetSettings={onResetSettings}
          onUpdate={({ key, property, data }) => {
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
            console.log('sett sync', settings.sync)
            console.log('onupdate', key, data)
            if (settings.sync.value === true) {
              
              // setLocalStorage(settingsLocalStorageKey, settings, settingsSyncExpiry)
            } else {
              // setLocalStorage(settingsLocalStorageKey, null)
            }
          }
        } />
      </div>
    </Layout>
  )
}

export default App
