import { Task } from '../models'
import { List, ListItem, Text } from '@chakra-ui/react'

interface TasksProps {
  tasks: Array<Task>
}
export function Tasks({ tasks }: TasksProps) {
  const renderTasks = tasks.map((task) => (
    <ListItem>
      <Text>{task.name}</Text>
    </ListItem>
  ))
  return <List>{renderTasks}</List>
}
