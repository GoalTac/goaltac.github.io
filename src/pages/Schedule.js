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

    const getTasks = async function(){
        function formatDate(){ //This is to match it to supabase's 'yyyy-mm-dd' format
            const date = new Date()
            let fdate = ''
            fdate += date.getFullYear() + '-'
            fdate += (date.getMonth() > 9 ? date.getMonth()+1 : '0' + (date.getMonth()+1)) + '-' //Thx js for letting me do this
            fdate += (date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
            return fdate
        }
        const fdate = formatDate()
        // console.log(fdate)
        let { data: tasks } = await supabase.from('todos').select('*').eq('end_date', fdate)
        setTasks(tasks)
        // console.log(tasks)
    }

    const getSession = async function(){
        await supabase.auth.getSession().then((table)=>{
            if (!table.data?.session){
                console.log("\nThere's no session")
                navigate('/login')
            }else{
                setSession(table.data)
                getTasks()
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
            <GridItem colSpan={1} rowSpan={2}><Today tasks={tasks}/></GridItem>
            <GridItem colSpan={7} ><Calendar /></GridItem>
        </Grid>
    )
}