import React from 'react'
import PropTypes from 'prop-types'
import Button from '../button'
import './index.css'

const ButtonGroup = ({ buttons, className }) => (
  <div className={className}>
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

export default ButtonGroup
