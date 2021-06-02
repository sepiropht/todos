import { Graph } from './components/Graph'

function App() {
  let values: { [key: string]: number } = {
    '2020-11-24': 4,
    '2021-01-16': 1,
    '2021-06-01': 2,
  }

  return (
    <div className="App">
      <Graph values={values} until={today()} />
    </div>
  )
}

function today(): string {
  let today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = today.getFullYear()
  return `${yyyy}-${mm}-${dd}`
}
export default App
