import { ReactElement, useEffect, useState } from "react";
import { 
    Box, useColorMode, Button, Flex
} from '@chakra-ui/react'
import {
    HiOutlineFolderAdd,
} from 'react-icons/hi'
import { IconBaseProps } from "react-icons";
import { supabase } from './../../../supabase'

export default function GoalDashboard({community}: any) : ReactElement{

    const [goals, setGoals] = useState<any>(community.goals);

    return(<Flex borderWidth='10px' height='fit-content' justifyContent='center'>


        {/* Add a folder to organize goals */}
        <Button boxSize='fit-content' borderWidth='10px' isDisabled>
            <HiOutlineFolderAdd size='100px' />
        </Button>

            




    </Flex>)
}

/**
 * 
 * @param param0 
 */
function Module({goal}: any) : ReactElement {
    return(<Box>

    </Box>)
}