import React from 'react'
import PropTypes from 'prop-types'
import TimeSetting from './time'
import RadioSetting from './radio-setting'
import ColorPicker from './color-picker'
import Counter from './counter'
import Energy from './energy'
import Button from '../button'
import './index.css'
import ButtonGroup from '../button-group'

const AppSettings = ({ settings, onChange, onUpdate, onDisplayIntroNotifications, onResetSettings }) => {
  const timeSettings = [{
    settingKey: 'focus',
    time: settings.focus.time,
    label: 'Focus Time',
    onChange: onChange,
    onUpdate: onUpdate
  }, {
    settingKey: 'break',
    time: settings.break.time,
    label: 'Break Time',
    onChange: onChange,
    onUpdate: onUpdate
  }]
  const strokeSettings = [{
    label: 'Focus color',
    settingKey: 'focus',
    strokeColor: settings.focus.strokeColor,
    onChange: onChange,
    onUpdate: onUpdate
  }, {
    label: 'Break color',
    settingKey: 'break',
    strokeColor: settings.break.strokeColor,
    onChange: onChange,
    onUpdate: onUpdate
  }]
  const counterSettings = [{
    label: settings.nutrients.coffee.label,
    settingKey: 'nutrients.coffee',
    value: settings.nutrients.coffee.value,
    onUpdate
  }, {
    label: settings.nutrients.water.label,
    settingKey: 'nutrients.water',
    value: settings.nutrients.water.value,
    onUpdate
  }, {
    label: settings.nutrients.food.label,
    settingKey: 'nutrients.food',
    value: settings.nutrients.food.value,
    onUpdate
  }]
  const radioSettings = [{
    label: 'Timer Type',
    settingKey: 'timer',
    value: settings.timer.value,
    choices: [{
      id: 'timer-progress',
      value: 'progress',
      label: 'Progress',
      labelClassName: settings.timer.value === 'progress' 
        ? 'coffee-break-app-setting-radio-setting-radio-input-label-checked'
        : 'coffee-break-app-setting-radio-setting-radio-input-label',
      isSelected: settings.timer.value === 'progress'
    }, {
      id: 'timer-countdown',
      value: 'countdown',
      label: 'Countdown',
      labelClassName: settings.timer.value === 'countdown' 
        ? 'coffee-break-app-setting-radio-setting-radio-input-label-checked'
        : 'coffee-break-app-setting-radio-setting-radio-input-label',
      isSelected: settings.timer.value === 'countdown'
    }],
    onUpdate
  }, {
    label: 'Notifications',
    settingKey: 'notifications',
    value: settings.notifications.value,
    choices: [{
      id: 'notifications-on',
      value: true,
      label: 'On',
      labelClassName: settings.notifications.value === true
        ? 'coffee-break-app-setting-radio-setting-radio-input-label-checked'
        : 'coffee-break-app-setting-radio-setting-radio-input-label',
      isSelected: settings.notifications.value === true
    }, {
      id: 'notifications-off',
      value: false,
      label: 'Off',
      labelClassName: settings.notifications.value === false
        ? 'coffee-break-app-setting-radio-setting-radio-input-label-checked'
        : 'coffee-break-app-setting-radio-setting-radio-input-label',
      isSelected: settings.notifications.value === false
    }],
    onUpdate: ({ key, data })  => {
      console.log('yo notification onUpdateChoice', data)
      let value = typeof data.value === 'string' 
        ? data.value === 'true'
        : data.value === true
      onUpdate({ 
        key,
        data: {
          ...data,
          value
        }
      })
    }
  }, {
      label: 'Sync Settings',
      settingKey: 'sync',
      value: settings.sync.value,
      choices: [{
        id: 'sync-on',
        value: true,
        label: 'On',
        labelClassName: settings.sync.value === true
          ? 'coffee-break-app-setting-radio-setting-radio-input-label-checked'
          : 'coffee-break-app-setting-radio-setting-radio-input-label',
        isSelected: settings.sync.value === true
      }, {
        id: 'sync-off',
        value: false,
        label: 'Off',
        labelClassName: settings.sync.value === false
          ? 'coffee-break-app-setting-radio-setting-radio-input-label-checked'
          : 'coffee-break-app-setting-radio-setting-radio-input-label',
        isSelected: settings.sync.value === false
      }],
      onUpdate: ({ key, data })  => {
        console.log('yo notification onUpdateChoice', data)
        let value = typeof data.value === 'string' 
          ? data.value === 'true'
          : data.value === true
        onUpdate({ 
          key,
          data: {
            ...data,
            value
          }
        })
      }
  }]
  return (
    <div className='animate__animated animate__fadeInRight coffee-break-app-settings-grid'>
      <div className='coffee-break-app-settings'>
        <Energy value={settings.energy.value} />
        <h2>Settings</h2>
        {radioSettings.map((rSetting, idx) => (
          <RadioSetting
            key={idx}
            settingKey={rSetting.settingKey}
            label={rSetting.label}
            value={rSetting.value} 
            choices={rSetting.choices}
            onUpdate={rSetting.onUpdate}
          />
        ))}
        {timeSettings.map((tSetting,idx) => (
          <TimeSetting
            key={idx}
            settingKey={tSetting.settingKey}
            time={tSetting.time}
            label={tSetting.label}
            onChange={tSetting.onChange}
            onUpdate={tSetting.onUpdate}
          />
        ))}
        {counterSettings.map((counter, idx) => (
          <Counter
            key={idx}
            settingKey={counter.settingKey}
            label={counter.label}
            value={counter.value}
            onUpdate={counter.onUpdate}
          />
        ))}
        {strokeSettings.map((cSetting, idx) => (
          <ColorPicker
            label={cSetting.label}
            key={idx}
            color={cSetting.strokeColor}
            settingKey={cSetting.settingKey}
            onChange={cSetting.onChange}
            onUpdate={cSetting.onUpdate}
          />
        ))}
        <ButtonGroup
          buttons={[{
            value: 'Show Intro',
            onClick: onDisplayIntroNotifications
          }, {
            value: 'Reset',
            onClick: onResetSettings
          }]}
        />
      </div>
    </div>
  )
}

AppSettings.propTypes = {
  settings: PropTypes.shape({
    timer: {
      value: PropTypes.string
    },
    notifications: {
      value: PropTypes.bool
    },
    focus: PropTypes.shape({
      time: PropTypes.shape({
        hour: PropTypes.number,
        minute: PropTypes.number,
        second: PropTypes.number
      }),
      elapsed: PropTypes.shape({
        time: PropTypes.shape({
          hour: PropTypes.number,
          minute: PropTypes.number,
          second: PropTypes.number
        }),
        pomodoros: PropTypes.number
      }),
      strokeColor: PropTypes.string
    }),
    break: PropTypes.shape({
      time: PropTypes.shape({
        hour: PropTypes.number,
        minute: PropTypes.number,
        second: PropTypes.number
      }),
      elapsed: PropTypes.shape({
        time: PropTypes.shape({
          hour: PropTypes.number,
          minute: PropTypes.number,
          second: PropTypes.number
        }),
      }),
      strokeColor: PropTypes.string
    }),
    energy: PropTypes.shape({
      value: PropTypes.number
    }),
    nutrients: PropTypes.shape({
      coffee: PropTypes.shape({
        value: PropTypes.number,
        max: PropTypes.number,
        label: PropTypes.string,
        notify: PropTypes.bool
      }),
      water: PropTypes.shape({
        value: PropTypes.number,
        max: PropTypes.number,
        label: PropTypes.string,
        notify: PropTypes.bool
      }),
      food: PropTypes.shape({
        value: PropTypes.number,
        max: PropTypes.number,
        label: PropTypes.string,
        notify: PropTypes.bool
      })
    })
  }),
  onUpdate: PropTypes.func,
  onChange: PropTypes.func,
  onDisplayIntroNotifications: PropTypes.func,
  onResetSettings: PropTypes.func
}

export default AppSettings
