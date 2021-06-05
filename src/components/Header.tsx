import { Flex, Icon } from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'

interface HeaderProps {
  tooggleSiderBar: () => void
}
export function Header({ tooggleSiderBar }: HeaderProps) {
  return (
    <Flex width="100%" backgroundColor="red" padding="15px 15px 15px 30px">
      <Icon
        cursor="pointer"
        color="white"
        as={GiHamburgerMenu}
        onClick={() => tooggleSiderBar()}
      ></Icon>
    </Flex>
  )
}
