import { Flex, Text, Input, Button, Box } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { RiCalendarTodoLine } from 'react-icons/ri'

export function AddTask() {
  const [isShow, toogleShow] = useState<boolean>(false)
  const [task, setTask] = useState<string>('')
  return (
    <Box marginTop="15px">
      <Flex
        display={isShow ? 'none' : 'flex'}
        onClick={() => toogleShow(true)}
        cursor="pointer"
        flexDirection="row"
      >
        <AddIcon color="red" h={6}></AddIcon>
        <Text color="gray" _hover={{ color: 'red' }} marginLeft="10px">
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
          <Button
            leftIcon={<RiCalendarTodoLine />}
            colorScheme="teal"
            size="md"
            width="30%"
            marginTop="10px"
            height="30px"
            variant="outline"
          >
            Today
          </Button>
        </Flex>
        <Flex justifyContent="flex-start" marginTop="10px">
          <Button disabled={!task.length} colorScheme="red" variant="solid">
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
