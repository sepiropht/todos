import {
  Box,
  Grid,
  Flex,
  Heading,
  Slide,
  useDisclosure,
} from '@chakra-ui/react'
import { Graph } from './components/Graph'
import { AddTask } from './components/AddTask'
import { Tasks } from './components/Tasks'
import { useState } from 'react'
import { Task } from './models'
import { Header } from './components/Header'
import { SideBar } from './components/SideBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  const [tasks, updateTask] = useState<Array<Task>>([])
  const [history, setHistory] = useState<{ [key: string]: number }>({})
  const { isOpen, onToggle } = useDisclosure()
  return (
    <Router>
      <Header tooggleSiderBar={() => onToggle()}></Header>
      <Grid>
        <Slide
          direction="left"
          in={!isOpen}
          style={{ zIndex: -1, width: '305px' }}
        >
          <SideBar></SideBar>
        </Slide>
        <Flex
          style={
            isOpen
              ? { zIndex: -1, marginLeft: '200px' }
              : { marginLeft: '305px' }
          }
          padding="30px"
          flexDirection="column"
        >
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
                  updateTask(
                    tasks.filter(
                      (currentTask: Task) => currentTask.name !== task.name
                    )
                  )
                }}
              ></Tasks>
              <AddTask
                add={(task: Task) => updateTask([...tasks, task])}
              ></AddTask>
              <Box marginTop="15px">
                <Graph values={history} until={format(new Date())} />
              </Box>
            </Route>
            <Route path="/later">
              <h2>Later</h2>
              <AddTask
                add={(task: Task) => updateTask([...tasks, task])}
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
