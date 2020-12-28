import React from 'react'
// import { Notifications } from '@universal-apps/swan-react'
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
  SlideTransition
} from 'reapop'

const themes = {
  atalhoTheme,
  baseTheme,
  bootstrapTheme
}

const effects = {
  useNotifications,
  setUpNotifications
}

const statuses = {
  ...STATUSES
}

const transitions = {
  FadeTransition,
  GrowTransition,
  SlideTransition
}

const AppNotificationsWrapper = ({ children }) => {
  // 1. Retrieve the notifications to display, and the function used to dismiss a notification.
  const { notifications, dismissNotification } = effects.useNotifications()
  setUpNotifications({
    defaultProps: {
        position: 'top-right',
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
              theme={atalhoTheme}
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
  themes,
  transitions
}
