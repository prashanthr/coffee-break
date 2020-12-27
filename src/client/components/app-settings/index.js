import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import TimeSetting from './time'
import TimerTypeSetting from './timer-type'
import ColorPicker from './color-picker'
import Counter from './counter'
import './index.css'
import Energy from './energy'


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
    label: '☕ Coffee',
    settingKey: 'nutrients.coffee',
    value: settings.nutrients.coffee.value,
    onUpdate: onUpdate
  }, {
    label: '💧 Water',
    settingKey: 'nutrients.water',
    value: settings.nutrients.water.value,
    onUpdate: onUpdate
  }]
  return (
    <div className='coffee-break-app-settings-grid'>
      <div className='coffee-break-app-settings'>
        <Energy value={settings.energy.value} />
        <h2>Settings</h2>
        <TimerTypeSetting 
          settingKey='timer' 
          label={'Timer Type'}
          value={settings.timer.type} 
          onUpdate={onUpdate}
        />
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
