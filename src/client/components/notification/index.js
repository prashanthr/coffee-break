import React from 'react'
// import { Notifications } from '@universal-apps/swan-react'
// const { NotificationsProvider, NotificationsSystem, themes, effects, statuses, transitions } = Notifications.appNotifications
import NotificationsSystem, { 
  NotificationsProvider, 
  useNotifications, 
  setUpNotifications, 
  atalhoTheme,
  baseTheme,
  bootstrapTheme,
  STATUSES,
  FadeTransition,
  GrowTransition,
  SlideTransition,
  POSITIONS
} from 'reapop'

const themes = {
  atalhoTheme,
  baseTheme,
  bootstrapTheme
}

const effects = {
  useNotifications,
  setUpNotifications,
  notifyWithTimeout: ({ notifyFunc, payload = {}, timeout = 1000 }) => {
    setTimeout(() => notifyFunc(payload), timeout)
  }
}

const statuses = {
  ...STATUSES
}

const positions = {
  ...POSITIONS
}

const transitions = {
  FadeTransition,
  GrowTransition,
  SlideTransition
}

const AppNotificationsWrapper = ({ children }) => {
  // 1. Retrieve the notifications to display, and the function used to dismiss a notification.
  const { notifications, dismissNotification } = effects.useNotifications()
  effects.setUpNotifications({
    defaultProps: {
        position: positions.topRight,
        dismissible: true,
        showDismissButton: true,
        onAdd: () => console.log('Notification added'),
        onDismiss: () => console.log('Notification dismissed')
    },
    // customizeNotification: ((notification: NewNotification) => void) | null;
    generateId: () => new Date().getTime().toString()
  })

  return (
      <div>
          <NotificationsSystem
              // 2. Pass the notifications you want Reapop to display.
              notifications={notifications}
              // 3. Pass the function used to dismiss a notification.
              dismissNotification={(id) => dismissNotification(id)}
              // 4. Pass a builtIn theme or a custom theme.
              theme={themes.atalhoTheme}
          />
          {children}
      </div>
  )
}

export {
  NotificationsProvider,
  AppNotificationsWrapper,
  effects,
  statuses,
  positions,
  themes,
  transitions
}
