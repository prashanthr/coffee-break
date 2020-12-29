import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../../button'
import './index.css'

const Counter = ({ label, settingKey, value, onUpdate }) => {
  const [state, updateState] = useState({
    value,
    lastAction: null
  })
  const handleUpdate = ({ settingKey, value, lastAction }) => {
    onUpdate({ key: settingKey, property: state.lastAction, data: {
        ...state,
        value,
        lastAction
      } 
    })
    updateState({
      ...state,
      value,
      lastAction
    }) 
  }
  return (
    <div className='coffee-break-app-settings-counter'>
      {label}
      <Button
        className='coffee-break-app-settings-counter-btn'
        value={'-'}
        onClick={event => {
          if (state.value > 0) {
            handleUpdate({ settingKey, value: state.value - 1, lastAction: 'decrement'}) 
          }
        }}
      />
      <span className='coffee-break-app-settings-counter-value'>{value}</span>
      <Button
        className='coffee-break-app-settings-counter-btn'
        value={'+'}
        onClick={event => handleUpdate({ settingKey, value: state.value + 1, lastAction: 'increment'}) }
      />
    </div>
  )
}
Counter.propTypes = {
  label: PropTypes.string,
  settingKey: PropTypes.string,
  value: PropTypes.number,
  onUpdate: PropTypes.func
}

Counter.defaultProps = {

}

export default Counter
