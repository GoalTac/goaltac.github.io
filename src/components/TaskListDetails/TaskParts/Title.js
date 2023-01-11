import { ModalHeader } from "@chakra-ui/react"

export default function Title(props){
    const task = props.task
    const titleBackground = function(){        
        switch(task.difficulty){
            case 0:
                return 'green.300';
            
            case 1:
                return 'yellow.300';
    
            case 2:
                return 'red.300';
        }
    
    }
    return(
        <ModalHeader
            whiteSpace='nowrap'
            pt='0px'
            pb='1.5em'
            overflowX='scroll'
            overflowY='hidden'
            bg={titleBackground}
            borderColor='cyan.700' 
            borderRightWidth='0.3vw'
            borderTopWidth='0.3vw'
            borderBottomWidth='0.3vw'
            borderRightRadius={50}
            minH='2.1em' maxH='2.1em'
            minW='60%' maxW='60%'
        >
            {task.title}
        </ModalHeader>
        )
}