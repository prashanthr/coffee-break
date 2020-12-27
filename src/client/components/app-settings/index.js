import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import TimeSetting from './time'
import RadioSetting from './radio-setting'
import ColorPicker from './color-picker'
import Counter from './counter'
import Energy from './energy'
import './index.css'

const AppSettings = ({ settings, onChange, onUpdate }) => {
  const timeSettings = [{
    settingKey: 'focus',
    time: settings.focus.time,
    label: 'Focus Time',
    onChange: onChange,
    onUpdate: onUpdate
  }, {
    settingKey: 'break',
    time: settings.break.time,
    label: 'Break Time',
    onChange: onChange,
    onUpdate: onUpdate
  }]
  const strokeSettings = [{
    label: 'Focus color',
    settingKey: 'focus',
    strokeColor: settings.focus.strokeColor,
    onChange: onChange,
    onUpdate: onUpdate
  }, {
    label: 'Break color',
    settingKey: 'break',
    strokeColor: settings.break.strokeColor,
    onChange: onChange,
    onUpdate: onUpdate
  }]
  const counterSettings = [{
    label: settings.nutrients.coffee.label,
    settingKey: 'nutrients.coffee',
    value: settings.nutrients.coffee.value,
    onUpdate
  }, {
    label: settings.nutrients.water.label,
    settingKey: 'nutrients.water',
    value: settings.nutrients.water.value,
    onUpdate
  }, {
    label: settings.nutrients.food.label,
    settingKey: 'nutrients.food',
    value: settings.nutrients.food.value,
    onUpdate
  }]
  const radioSettings = [{
    label: 'Timer Type',
    settingKey: 'timer',
    value: settings.timer.value,
    choices: [{
      id: 'timer-progress',
      value: 'progress',
      label: 'Progress',
      isSelected: settings.timer.value === 'progress'
    }, {
      id: 'timer-countdown',
      value: 'countdown',
      label: 'Countdown',
      isSelected: settings.timer.value === 'countdown'
    }],
    onUpdate
  }, {
    label: 'Notifications',
    settingKey: 'notifications',
    value: settings.notifications.value,
    choices: [{
      id: 'notifications-on',
      value: true,
      label: 'On',
      isSelected: settings.notifications.value === true
    }, {
      id: 'notifications-off',
      value: false,
      label: 'Off',
      isSelected: settings.notifications.value === false
    }],
    onUpdate: ({ key, data })  => {
      onUpdate({ 
        key,
        data: {
          ...data,
          value: data.value === 'true'
        }
      })
    }
  }]
  return (
    <div className='coffee-break-app-settings-grid'>
      <div className='coffee-break-app-settings'>
        <Energy value={settings.energy.value} />
        <h2>Settings</h2>
        {radioSettings.map((rSetting, idx) => (
          <RadioSetting 
            settingKey={rSetting.settingKey}
            label={rSetting.label}
            value={rSetting.value} 
            choices={rSetting.choices}
            onUpdate={rSetting.onUpdate}
          />
        ))}
        {timeSettings.map((tSetting,idx) => (
          <TimeSetting
            key={idx}
            settingKey={tSetting.settingKey}
            time={tSetting.time}
            label={tSetting.label}
            onChange={tSetting.onChange}
            onUpdate={tSetting.onUpdate}
          />
        ))}
        {counterSettings.map((counter, idx) => (
          <Counter
            key={idx}
            settingKey={counter.settingKey}
            label={counter.label}
            value={counter.value}
            onUpdate={counter.onUpdate}
          />
        ))}
        {strokeSettings.map((cSetting, idx) => (
          <ColorPicker
            label={cSetting.label}
            key={idx}
            color={cSetting.strokeColor}
            settingKey={cSetting.settingKey}
            onChange={cSetting.onChange}
            onUpdate={cSetting.onUpdate}
          />
        ))}
      </div>
    </div>
  )
}

export default AppSettings
