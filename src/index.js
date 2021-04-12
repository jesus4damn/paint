import { App } from './components/App'
import './scss/index.scss'
import {createStore} from './core/createStore'
import {initialState} from './redux/initialState'
import {rootReducer} from './redux/rootReducer'

const store = createStore(rootReducer, initialState)

store.subscribe(state => console.log('App State: ', state))

const app = new App('#app', {store})
  
app.render()