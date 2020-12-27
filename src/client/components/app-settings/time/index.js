import React, { useEffect, useState } from 'react'
import { FormControls } from '@universal-apps/swan-react'

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
        elementOnly
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
        elementOnly
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
        elementOnly
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

export default TimeSetting
