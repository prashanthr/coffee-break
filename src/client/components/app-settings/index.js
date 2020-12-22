import React from 'react'
import PropTypes from 'prop-types'
import { FormControls } from '@universal-apps/swan-react'

const TimeSetting = ({ onChange }) => (
  <div>
    <FormControls.NumericInput
      name='hour-setting'
      max={59}
      min={0}
      value={30}
      onChange={event => onChange({ key: 'hour', event })}
    />
  </div>
)

const AppSettings = ({ onChange }) => (
  <div className='coffee-break-app-settings'>
    <div>
      <h2>Settings</h2>
      <TimeSetting onChange={onChange} />
    </div>
  </div>
)

export default AppSettings
