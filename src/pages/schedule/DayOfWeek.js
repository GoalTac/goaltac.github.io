import {
    Text
} from '@chakra-ui/react'
import { useEffect } from 'react'

export default function DayOfWeek(props){

    return(
        <Text ml='5px'
        border='4px' 
        textAlign='center'
        borderColor={props.borderColor}
        fontSize='lg'
        bg={props.bg} 
        color={props.color}
        borderRadius='20px'>
            {props.text}
        </Text>
    )
}