import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../../button'
import './index.css'

const Counter = ({ label, settingKey, value, onUpdate }) => {
  const [state, updateState] = useState({
    value
  })
  useEffect(() => {
    onUpdate({ key: settingKey, data: state })
  }, [state])
  return (
    <div className='coffee-break-app-settings-counter'>
      {label}
      <Button
        value={'-'}
        onClick={event => updateState({
            ...state,
            value: state.value - 1
          })
        }
      />
      <span className='coffee-break-app-settings-counter-value'>{value}</span>
      <Button
        value={'+'}
        onClick={event => updateState({
            ...state,
            value: state.value + 1
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
