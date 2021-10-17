import { Box, Flex, Heading, Slide, useDisclosure } from '@chakra-ui/react'
import { Graph } from './components/Graph'
import { AddTask } from './components/AddTask'
import { Tasks } from './components/Tasks'
import { useState } from 'react'
import { Task } from './models'
import { Header } from './components/Header'
import { SideBar } from './components/SideBar'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import dayjs from 'dayjs'

function App() {
  const [tasks, updateTask] = useState<Array<Task>>([])
  const [history, setHistory] = useState<{ [key: string]: number }>({})
  const { isOpen, onToggle } = useDisclosure()
  return (
    <Router>
      <Header tooggleSiderBar={() => onToggle()}></Header>
      <Flex justifyContent="center">
        <Slide
          direction="left"
          in={!isOpen}
          style={{ width: '305px', top: '46px' }}
        >
          <SideBar></SideBar>
        </Slide>
        <Flex
          style={isOpen ? { width: '54%' } : { width: '54%' }}
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
                  setHistory({
                    ...history,
                  })
                  updateTask(
                    tasks.filter(
                      (currentTask: Task) => currentTask.name !== task.name
                    )
                  )
                }}
              ></Tasks>
            </Route>
          </Switch>
          <>
            <AddTask
              add={(task: Task) => updateTask([...tasks, task])}
            ></AddTask>
            <Box marginTop="15px">
              <Graph values={history} until={format(new Date())} />
            </Box>
          </>
        </Flex>
      </Flex>
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
