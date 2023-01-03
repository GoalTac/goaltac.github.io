import { 
    Grid,
    GridItem,
    HStack
 } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../supabase"
import Calendar from './schedule/Calendar'
import Today from './schedule/Today'





export default function Schedule(){

    const [tasks, setTasks] = useState([])
    const [session, setSession] = useState(undefined)
    const navigate = useNavigate()
    const fetchTasks = async function(){
        let {data: tasks, error} = await supabase.from('todos').select() //check supabase filters for what can apply
        setTasks(tasks)
    }
    const getSession = async function(){
        await supabase.auth.getSession().then((table)=>{
            if (!table.data?.session){
                console.log("\nThere's no session")
                navigate('/login')
            }else{
                setSession(table.data)
                fetchTasks()
            }
            
        })
        
        
    }

    useEffect(()=>{
        
        getSession()

    }, [])

    return (
        <Grid
        mt='10vh'
        templateColumns='repeat(8, 1fr)'>
            <GridItem colSpan={1} rowSpan={2}><Today /></GridItem>
            <GridItem colSpan={7} ><Calendar /></GridItem>
        </Grid>
    )
}