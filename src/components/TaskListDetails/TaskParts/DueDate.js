import { 
    Heading 
} from "@chakra-ui/react";


export default function DueDate({ date, month, size }){
    let fdate = new Date(date);
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return(
        <Heading fontSize={size}>
            {weekdays[fdate.getDay()].substring(0, 3)}, {month[fdate.getMonth()]} {fdate.getDate()}, {fdate.getFullYear()}
        </Heading>
    )
}