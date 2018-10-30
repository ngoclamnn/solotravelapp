// @flow

import React, { Component } from 'react'
import RootNavigation from './RootNavigation'

// For network debugging
global.XMLHttpRequest = global.originalXMLHttpRequest ? global.originalXMLHttpRequest : global.XMLHttpRequest
global.FormData = global.originalFormData ? global.originalFormData : global.FormData

class App extends Component<{}> {
  render () {
    return <RootNavigation />
  }
}

export default App
