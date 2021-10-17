import {
  Flex,
  Text,
  Input,
  Button,
  Box,
  Stack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { Task } from '../models'
import 'react-datepicker/dist/react-datepicker.css'

interface addProps {
  add: (task: Task) => void
}
export function AddTask({ add }: addProps) {
  const [isShow, toogleShow] = useState<boolean>(false)
  const [taskName, setTask] = useState<string>('')
  const [times, setTimes] = useState('0')
  return (
    <Box paddingTop="5px" borderTop="1px solid #e4e4e4">
      <Flex
        display={isShow ? 'none' : 'flex'}
        onClick={() => toogleShow(true)}
        cursor="pointer"
        flexDirection="row"
      >
        <AddIcon color="red" h={6}></AddIcon>
        <Text color="#c3bebe" _hover={{ color: 'red' }} marginLeft="10px">
          Add task
        </Text>
      </Flex>
      <Flex flexDirection="column" display={!isShow ? 'none' : 'flex'}>
        <Flex
          border="1px solid black"
          borderRadius="5px"
          padding="10px"
          flexDirection="column"
        >
          <Input
            onChange={(e) => setTask(e.target.value)}
            placeholder="ex: Buy new stuff"
            variant="unstyled"
          ></Input>
          <Flex flexDirection="row">
            <RadioGroup onChange={setTimes} value={times}>
              <Stack direction="row">
                <Radio value="0">Default</Radio>
                <Radio value="1">only today</Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </Flex>
        <Flex justifyContent="flex-start" marginTop="10px">
          <Button
            onClick={() => {
              add({
                name: taskName,
                onlyToday: times === '1',
              })
              setTask('')
              toogleShow(false)
            }}
            disabled={!taskName.length}
            colorScheme="red"
            variant="solid"
            fontSize="14px"
          >
            Add task
          </Button>
          <Button
            marginLeft="20px"
            variant="link"
            onClick={() => toogleShow(false)}
          >
            Cancel
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
