import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../../button'
import './index.css'

const Counter = ({ label, settingKey, value, onUpdate }) => {
  const [state, updateState] = useState({
    value,
    lastAction: null
  })
  useEffect(() => {
    onUpdate({ key: settingKey, property: state.lastAction, data: state })
  }, [state])
  return (
    <div className='coffee-break-app-settings-counter'>
      {label}
      <Button
        value={'-'}
        onClick={event => updateState({
            ...state,
            value: state.value - 1,
            lastAction: 'decrement'
          })
        }
      />
      <span className='coffee-break-app-settings-counter-value'>{value}</span>
      <Button
        value={'+'}
        onClick={event => updateState({
            ...state,
            value: state.value + 1,
            lastAction: 'increment'
          })
        }
      />
    </div>
  )
}
Counter.propTypes = {

}

Counter.defaultProps = {

}

export default Counter
