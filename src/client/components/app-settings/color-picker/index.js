import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { PopoverPicker } from "./popover-picker"
import './index.css'

const ColorPicker = ({ label, color, settingKey, onChange, onUpdate }) => {
  const [state, updateState] = useState({
    strokeColor: color
  })
  const handleChange = ({ color, settingKey }) => {
    onUpdate({ key: settingKey, data: {
        ...state,
        strokeColor: color
      } 
    })
    updateState({
      ...state,
      strokeColor: color
    }) 
  }
  return (
    <div className='coffee-break-app-settings-color'>
      <span>{label}</span>
      <PopoverPicker 
        color={state.strokeColor} 
        onChange={color => handleChange({ color, settingKey })} 
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
