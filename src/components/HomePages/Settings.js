import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Avatar,
  Box,
  AvatarBadge,
  useColorMode,
  Switch,
} from '@chakra-ui/react';
import { FaMoon, FaSun, FaQuestion, FaHome } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { SettingsIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { useSupabaseClient } from '../../hooks/SessionProvider';

export default function Settings({ session }) {
  //Session defined from HomePage.js (supabase.auth.getSession())
  const supabase = useSupabaseClient();
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
                    console.log('here');
                    navigate('/signin');
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
