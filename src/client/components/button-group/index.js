import React from 'react'
import PropTypes from 'prop-types'
import Button from '../button'
import './index.css'

const ButtonGroup = ({ buttons, className }) => (
  <div className={`coffee-break-button-group ${className}`}>
    {buttons.map((button, idx) => (
      <Button
        key={idx}
        className={button.className}
        name={button.name}
        value={button.value}
        onClick={button.onClick}
      />
    ))}
  </div>
)

ButtonGroup.defaultProps = {
  className: ''
}

export default ButtonGroup
