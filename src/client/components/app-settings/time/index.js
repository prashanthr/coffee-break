import React, { useState } from 'react'
import { FormControls } from '@universal-apps/swan-react'

const TimeSetting = ({ time, label, settingKey, onChange, onUpdate }) => {
  const { hour, minute, second } = time
  const [state, updateState] = useState({ 
    time: { hour, minute, second } 
  })
  const handleUpdate = ({ event, settingKey, unit, min, max }) => {
    const input = Number(event.target.value)
    const value = input <= max && input >= min 
      ? input
      : input < min 
        ? min
        : max
    onUpdate({ key: settingKey, data: {
        ...state,
        time: {
          ...state.time,
          [unit]: value
        }
      }
    })
    updateState({
      ...state,
      time: {
        ...state.time,
        [unit]: value
      }
    })
    
  }
  return (
    <div className='coffee-break-app-settings-time'>
      <span>{label}</span>
      <FormControls.NumericInput
        elementOnly
        name='hour-setting'
        max={59}
        min={0}
        defaultValue={state.time.hour}
        onChange={event => {
          handleUpdate({
            event,
            settingKey,
            unit: 'hour',
            min: 0,
            max: 99
          })
        }}
      />
      <FormControls.NumericInput
        elementOnly
        name='minute-setting'
        max={59}
        min={0}
        defaultValue={state.time.minute}
        onChange={event => {
          handleUpdate({
            event,
            settingKey,
            unit: 'minute',
            min: 0,
            max: 99
          })
        }}
      />
      <FormControls.NumericInput
        elementOnly
        name='second-setting'
        max={59}
        min={0}
        defaultValue={state.time.second}
        onChange={event => {
          handleUpdate({
            event,
            settingKey,
            unit: 'second',
            min: 0,
            max: 59
          })
        }}
      />
    </div>
  )
}

export default TimeSetting
