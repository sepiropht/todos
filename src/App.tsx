import { Box, Grid, Flex } from '@chakra-ui/react'
import { Graph } from './components/Graph'
import { AddTask } from './components/AddTask'
import { Tasks } from './components/Tasks'
import { useState } from 'react'
import { Task } from './models'
import { SideBar } from './components/SideBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  const [tasks, addTask] = useState<Array<Task>>([])
  let values: { [key: string]: number } = {
    '2020-11-24': 4,
    '2021-01-16': 1,
    '2021-06-01': 2,
  }
  console.log(tasks)
  return (
    <Router>
      <Grid templateColumns="305px 1fr">
        <SideBar></SideBar>
        <Flex padding="30px" flexDirection="column">
          <Switch>
            <Route path="/">
              <h2>Today</h2>
              <Tasks tasks={tasks}></Tasks>
              <AddTask
                add={(task: Task) => addTask([...tasks, task])}
              ></AddTask>
              <Box marginTop="15px">
                <Graph values={values} until={today()} />
              </Box>
            </Route>
            <Route path="/later">
              <h2>Later</h2>
              <AddTask
                add={(task: Task) => addTask([...tasks, task])}
              ></AddTask>
              <Box marginTop="15px">
                <Graph values={values} until={today()} />
              </Box>
            </Route>
          </Switch>
        </Flex>
      </Grid>
    </Router>
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
