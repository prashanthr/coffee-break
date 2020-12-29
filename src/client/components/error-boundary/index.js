import React from 'react'
import Layout from '../../views/layout'
import { debug } from '../../util/debug'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { 
      hasError: true,
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    debug('Encountered a React error', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Layout>
          <h1 className='today-web-error-text'>
            Oops, something went wrong! :(
          </h1>
        </Layout>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
