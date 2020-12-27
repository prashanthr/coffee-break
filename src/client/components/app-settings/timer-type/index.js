import React, { useState, useEffect } from 'react'
import { FormControls } from '@universal-apps/swan-react'
import './index.css'

const TimerType = ({ label, value, settingKey, onUpdate }) => {
  const [state, updateState] = useState({
    type: value
  })
  useEffect(() => {
    onUpdate({ key: settingKey, data: state })
  }, [state])
  return (
    <div className='coffee-break-app-setting-timer-type-grid'>
      <span>{label}</span>
      <div className={'coffee-break-app-setting-timer-type-radio-input'}>
        <FormControls.RadioInput 
          // className={'coffee-break-app-setting-timer-type-radio-input'}
          name='timer-type'
          choices={[{
            id: 'timer-progress',
            value: 'progress',
            label: 'Progress',
            isSelected: value === 'progress'
          }, {
            id: 'timer-countdown',
            value: 'countdown',
            label: 'Countdown',
            isSelected: value === 'countdown'
          }]}
          onChange={event => {
            updateState({
              ...state,
              type: event.target.value
            })
          }}
          elementOnly 
        />
      </div>
    </div>
  )
}

TimerType.defaultProps = {
  label: 'Timer Type'
}

export default TimerType
