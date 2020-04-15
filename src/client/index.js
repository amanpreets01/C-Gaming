import 'raf/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './containers/App'
import { store } from './store'
import { Provider } from 'react-redux'
import ReactPlayer from 'react-player'

const container = window.document.getElementById('container')

ReactDOM.render(<Provider store={store}><App /></Provider>, container)
