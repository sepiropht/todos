import { Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { List, ListItem } from '@chakra-ui/react'

export function SideBar() {
  return (
    <Flex
      padding="30px"
      backgroundColor="#FAFAFA"
      flexDirection="column"
      height="calc(100vh - 44px)"
    >
      <List>
        <ListItem>
          <Link to="/">Today</Link>
        </ListItem>
        <ListItem>
          <Link to="/later">Later</Link>
        </ListItem>
      </List>
    </Flex>
  )
}
