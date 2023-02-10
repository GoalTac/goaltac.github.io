import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Link,
  Avatar,
  AvatarBadge,
  useColorMode,
  Switch,
  Card,
  CardBody,
  Text,
  Icon,
  Box,
  HStack,
  Tag,
  TagLeftIcon,
} from '@chakra-ui/react';
import { FaMoon, FaSun, FaQuestion, FaHome } from 'react-icons/fa';
import { BiMessageError } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { SettingsIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import supabase from '../../supabase';
import { CSVLink } from 'react-csv';

export default function Settings({ session }) {
  //Session defined from HomePage.js (supabase.auth.getSession())

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { toggleColorMode, colorMode } = useColorMode();
  const navigate = useNavigate();
  const [exportTasks, setExportTasks] = useState([]);

  const handleTaskExport = async () => {
    let { data: tasks, error } = await supabase.from('todos').select('*');
    console.log(tasks);
    setExportTasks(tasks);
  };

  return (
    <Box>
      <Link as={ReactRouterLink} to='/profiles/Test2333'>
        Go to profile test
      </Link>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton variant='contained' isActive={isOpen} as={Button}>
              <Avatar name='Adi C' bg={isOpen ? 'cyan' : null}>
                <AvatarBadge
                  boxSize='1.25em'
                  bg={session ? 'green.500' : 'red.500'}
                />
              </Avatar>
            </MenuButton>

            <MenuList>
              {/* <MenuGroup>
                <HStack>
                  <Box align='center' margin='10px'>
                    <Avatar id='avatar' name='Adi C' bg='yellow'>
                      <AvatarBadge boxSize='1.25em' bg='green.500' />
                    </Avatar>
                  </Box>

                  <Tag size='lg' colorScheme='orange' borderRadius='full'>
                    <Text>&nbsp;1508</Text>
                  </Tag>
                </HStack>

                <MenuDivider />
              </MenuGroup> */}

              <MenuGroup>
                <MenuItem
                  closeOnSelect={false}
                  onClick={toggleColorMode}
                  icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
                >
                  Dark mode{' '}
                  <Switch
                    id='darkMode'
                    isChecked={colorMode === 'dark' ? true : false}
                  />
                </MenuItem>
                <MenuItem
                  icon={<FaQuestion />}
                  onClick={() => navigate('/help')}
                >
                  Help and support
                </MenuItem>
                <MenuItem>
                  <CSVLink data={exportTasks} onClick={handleTaskExport}>
                    📁&nbsp;Export Data as CSV
                  </CSVLink>
                </MenuItem>
                <MenuItem
                  onClick={() => navigate('/settings')}
                  icon={<SettingsIcon />}
                >
                  Settings
                </MenuItem>
                <MenuItem
                  icon={<FiLogOut />}
                  onClick={async () => {
                    const { error } = await supabase.auth.signOut();
                    navigate('/login');
                  }}
                >
                  Sign Out
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  );
}
