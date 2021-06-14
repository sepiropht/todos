import { Task } from '../models/'
import { Tasks } from './Tasks'
import dayjs, { Dayjs } from 'dayjs'
import { Box } from '@chakra-ui/react'
import { AddTask } from './AddTask'

interface DayProps {
  currentDay: Dayjs
}

interface LaterProps {
  tasks: Array<Task>
  updateTask: (tasks: Array<Task>) => void
  setHistory: (date: string) => void
}

export const Later = ({ tasks, updateTask, setHistory }: LaterProps) => {
  const nextDays = Array(365 * 2)
    .fill(1)
    .map((_, index) => dayjs().add(index, 'day'))

  const Day = ({ currentDay }: DayProps) => (
    <Box paddingTop="28px">
      <h4>{dayjs(currentDay).format('MMM DD')}</h4>
      <Tasks
        tasks={tasks.filter((task) =>
          task.date.some(
            (date) =>
              dayjs(currentDay, 'day').isSame(date, 'day') ||
              task.isEachDay ||
              (task.isEachWeek &&
                dayjs(new Date()).format('dddd') ===
                  dayjs(currentDay).format('dddd'))
          )
        )}
        removeTask={(task: Task) => {
          const date = format(new Date())
          setHistory(date)
          updateTask(
            tasks.filter((currentTask: Task) => currentTask.name !== task.name)
          )
        }}
      ></Tasks>
      <AddTask add={(task: Task) => updateTask([...tasks, task])}></AddTask>
    </Box>
  )

  return (
    <Box borderTop="1px solide gray" marginTop="20px">
      {nextDays.map((date, index) => (
        <Day key={index} currentDay={date}></Day>
      ))}
    </Box>
  )
}

function format(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = date.getFullYear()
  return `${yyyy}-${mm}-${dd}`
}
