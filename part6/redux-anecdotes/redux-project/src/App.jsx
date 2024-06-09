import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdotesForm from './components/AnecdotesForm'
import AnecdotesList from './components/AnecdotesList'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdotesReducer'



const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdotesList />
      <AnecdotesForm />
    </div>
  )
}

export default App
