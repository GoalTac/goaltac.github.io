import {
    Flex,
} from '@chakra-ui/react';
import InsideView from '../components/Communities/InsideView/InsideView';
import Dashboard from '../components/Communities/Dashboard/Dashboard';

/*
Contains the dashboard, recommended communities, and search for new communities
 */
export default function CommunityDisplay() {  

  return (
    <Flex>
      <Dashboard />
      
      {/* Will add recommended and other displays below the dashboard 
      <InsideView />
      */}
    </Flex>
  );        
}
