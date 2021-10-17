import { Task } from '../models'
import { List, ListItem, Text, Flex, Icon } from '@chakra-ui/react'
import { RiCheckboxCircleLine } from 'react-icons/ri'

interface TasksProps {
  tasks: Array<Task>
  removeTask: (task: Task) => void
}
interface TaskProps {
  task: Task
  removeTask: (task: Task) => void
}

export function Tasks({ tasks, removeTask }: TasksProps) {
  const renderTasks = tasks.map((task, index) => (
    <ListItem key={index}>
      <TaskC  task={task} removeTask={removeTask}></TaskC>
    </ListItem>
  ))
  return <List>{renderTasks}</List>
}

const TaskC = ({ task, removeTask }: TaskProps) => {
  return (
    <Flex borderTop="1px solid #e4e4e4" paddingTop="10px">
      <Flex alignItems="center" paddingBottom="25px">
        <Icon
          _hover={{ color: 'green' }}
          cursor="pointer"
          onClick={() => removeTask(task)}
          as={RiCheckboxCircleLine}
          h={4}
          w={5}
        ></Icon>
        <Text marginLeft="5px">{task.name}</Text>
      </Flex>
    </Flex>
  )
}
