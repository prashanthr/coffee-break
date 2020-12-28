import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './client/routes';
import * as serviceWorker from './client/serviceWorker';
import ErrorBoundary from './client/components/error-boundary'
import { NotificationsProvider, AppNotificationsWrapper } from './client/components/notification'

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <NotificationsProvider>
        <AppNotificationsWrapper>
          <Routes />
        </AppNotificationsWrapper>
      </NotificationsProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
