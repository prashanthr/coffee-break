import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import TimeSetting from './time-setting'
import ColorPicker from './color-picker'
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
  return (
    <div className='coffee-break-app-settings-grid'>
      <div className='coffee-break-app-settings'>
        <h2>Settings</h2>
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
