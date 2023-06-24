import {
    Flex,
} from '@chakra-ui/react';
import InsideView from '../components/Communities/InsideView/InsideView';

/*
Contains the dashboard, recommended communities, and search for new communities
 */
export default function Community({community}) {  

  return (
    <Flex>

      {/* Temporarily here for testing. This would
      be in another level beyond dashboard */}
      <InsideView community={community}/>
    </Flex>
  );        
}
