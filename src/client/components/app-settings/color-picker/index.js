import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { PopoverPicker } from "./popover-picker"
import './index.css'

const ColorPicker = ({ label, color, settingKey, onChange, onUpdate }) => {
  const [state, updateState] = useState({
    strokeColor: color
  })
  useEffect(() => {
    onUpdate({ key: settingKey, data: state })
  }, [state])
  return (
    <div className='coffee-break-app-settings-color'>
      <span>{label}</span>
      <PopoverPicker 
        color={state.strokeColor} 
        onChange={color => updateState({
          ...state,
          strokeColor: color
        })} 
      />
    </div>
  )
}

ColorPicker.propTypes = {
  color: PropTypes.string
}

ColorPicker.defaultProps = {
  color: '#aabbcc'
}

export default ColorPicker
