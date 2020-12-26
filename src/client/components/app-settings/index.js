import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormControls } from '@universal-apps/swan-react'
import './index.css'
import Button from '../button'
import { useState } from 'react'

const TimeSetting = ({ time, label, settingKey, onChange, onUpdate }) => {
  const { hour, minute, second } = time
  const [state, updateState] = useState({ 
    time: { hour, minute, second } 
  })
  useEffect(() => {
    onUpdate({ key: settingKey, data: state })
  }, [state])
  return (
    <div className='coffee-break-app-settings-time'>
      <span>{label}</span>
      <FormControls.NumericInput
        name='hour-setting'
        max={59}
        min={0}
        defaultValue={state.time.hour}
        onChange={event => {
          updateState({
            ...state,
            time: {
              ...state.time,
              hour: Number(event.target.value)
            }
          })
        }}
      />
      <FormControls.NumericInput
        name='minute-setting'
        max={59}
        min={0}
        defaultValue={state.time.minute}
        onChange={event => {
          updateState({
            ...state,
            time: {
              ...state.time,
              minute: Number(event.target.value)
            }
          })
        }}
      />
      <FormControls.NumericInput
        name='second-setting'
        max={59}
        min={0}
        defaultValue={state.time.second}
        onChange={event => {
          updateState({
            ...state,
            time: {
              ...state.time,
              second: Number(event.target.value)
            }
          })
        }}
      />
    </div>
  )
}

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
    settingKey: 'focus',
    strokeColor: settings.focus.strokeColor,
    onChange: onChange,
    onUpdate: onUpdate
  }, {
    settingKey: 'focus',
    strokeColor: settings.focus.strokeColor,
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
      </div>
    </div>
  )
}

export default AppSettings
