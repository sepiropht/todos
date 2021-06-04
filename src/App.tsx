import { Box, Grid, Flex, Heading } from '@chakra-ui/react'
import { Graph } from './components/Graph'
import { AddTask } from './components/AddTask'
import { Tasks } from './components/Tasks'
import { useState } from 'react'
import { Task } from './models'
import { SideBar } from './components/SideBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  const [tasks, addTask] = useState<Array<Task>>([])
  const [history, setHistory] = useState<{ [key: string]: number }>({
    '2020-11-24': 4,
    '2021-01-16': 1,
    '2021-06-01': 2,
  })

  console.log(tasks)
  return (
    <Router>
      <Grid templateColumns="305px 1fr">
        <SideBar></SideBar>
        <Flex padding="30px" flexDirection="column">
          <Switch>
            <Route path="/">
              <Heading fontSize="20px" fontWeight="700" lineHeight="25px">
                Today
              </Heading>
              <Tasks
                tasks={tasks}
                removeTask={(task: Task) => {
                  const date = format(task.date)
                  setHistory({
                    ...history,
                    [date]: history[date] ? history[date] + 1 : 1,
                  })
                  addTask(
                    tasks.filter(
                      (currentTask: Task) => currentTask.name !== task.name
                    )
                  )
                }}
              ></Tasks>
              <AddTask
                add={(task: Task) => addTask([...tasks, task])}
              ></AddTask>
              <Box marginTop="15px">
                <Graph values={history} until={format(new Date())} />
              </Box>
            </Route>
            <Route path="/later">
              <h2>Later</h2>
              <AddTask
                add={(task: Task) => addTask([...tasks, task])}
              ></AddTask>
              <Box marginTop="15px">
                <Graph values={history} until={format(new Date())} />
              </Box>
            </Route>
          </Switch>
        </Flex>
      </Grid>
    </Router>
  )
}

function format(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = date.getFullYear()
  return `${yyyy}-${mm}-${dd}`
}
export default App
