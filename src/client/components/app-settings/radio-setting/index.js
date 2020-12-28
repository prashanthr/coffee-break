import React, { useState, useEffect } from 'react'
import { FormControls } from '@universal-apps/swan-react'
import './index.css'

const RadioSetting = ({ label, value, settingKey, onUpdate, choices }) => {
  const [state, updateState] = useState({
    value
  })
  useEffect(() => {
    onUpdate({ key: settingKey, data: state })
  }, [state])
  return (
    <div className='coffee-break-app-setting-radio-setting-grid'>
      <span>{label}</span>
      <div className={'coffee-break-app-setting-radio-setting-radio-input'}>
        <FormControls.RadioInput 
          className={'coffee-break-app-setting-radio-setting-radio-input-form-el'}
          name='timer-type'
          choices={choices}
          onChange={event => {
            console.log('Notif on change event', event.target, event.target.value)
            updateState({
              ...state,
              value: event.target.value
            })
          }}
          elementOnly 
        />
      </div>
    </div>
  )
}

export default RadioSetting
