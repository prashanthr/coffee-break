import React from 'react'
import PropTypes from 'prop-types'
import { FormControls } from '@universal-apps/swan-react'
import './index.css'
import Button from '../button'
import { useState } from 'react'

const TimeSetting = ({ hour, minute, second, label, settingKey, onChange, onUpdate }) => {
  const [state, updateState] = useState({ hour, minute, second })
  return (
    <div className='coffee-break-app-settings-time'>
      {label} 
      &nbsp;&nbsp;
      <FormControls.NumericInput
        name='hour-setting'
        max={59}
        min={0}
        defaultValue={state.hour}
        onChange={event => {
          updateState({
            ...state,
            hour: Number(event.target.value)
          })
          if (onChange) {
            onChange({ key: settingKey, unit: 'hour', event })
          }
        }}
      />
      &nbsp; 
      <FormControls.NumericInput
        name='min-setting'
        max={59}
        min={0}
        defaultValue={15}
        onChange={event => {
          updateState({
            ...state,
            minute: Number(event.target.value)
          })
          if (onChange) {
            onChange({ key: settingKey, unit: 'minute', event })
          }
        }}
      /> 
      &nbsp;
      <FormControls.NumericInput
        name='hour-setting'
        max={59}
        min={0}
        defaultValue={0}
        onChange={event => {
          updateState({
            ...state,
            second: Number(event.target.value)
          })
          if (onChange) {
            onChange({ key: settingKey, unit: 'second', event })
          }
        }}
      />
      &nbsp;
      <Button 
        className='coffee-break-app-setting-btn-update'
        name='setting-update'
        value='Update'
        onClick={event => onUpdate({ key: settingKey, event, data: state })}
      />
    </div>
  )
}

const AppSettings = ({ settings, onChange, onUpdate }) => (
  <div className='coffee-break-app-settings-grid'>
    <div className='coffee-break-app-settings'>
      <h2>Settings</h2>
      <TimeSetting settingKey='focus' hour={settings.focus.hour} minute={settings.focus.minute} second={settings.focus.second} label={'Focus Time'} onChange={onChange} onUpdate={onUpdate} />
      <TimeSetting settingKey='break' hour={settings.break.hour} minute={settings.break.minute} second={settings.break.second} label={'Break Time'} onChange={onChange} onUpdate={onUpdate} />
    </div>
  </div>
)

export default AppSettings
