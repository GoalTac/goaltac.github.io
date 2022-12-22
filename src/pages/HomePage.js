import { Button, Center, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import supabase from '../supabase';



function HomePage() {

  //React Router DOM
  const navigate = useNavigate()  
  const {state} = useLocation()

  //Supabase
  const [session, setSession] = useState()
  const [user, setUser] = useState(undefined)

  
  



  

  // const shouldIStayOrShouldIGo = function(){
  //   getUserData()
  //   if (!user === undefined) {
  //     navigate('/')
  //   } else{
  //     navigate('/login')
  //   }
  // }

    const whatAmIShowing = function(){
      supabase.auth.getSession().then((table)=>{
        
        if (!table.data?.session){
          navigate('/login')

        }else{
          setSession(table.data.session)
        }
      })
    }

    const onSignOut = async function(){
      const { error } = await supabase.auth.signOut()
      navigate('/login')
    }

    const getSession = async function(){
      console.log("Entered")
      await supabase.auth.getSession().then((table)=>{
          if (!table.data?.session){
              console.log("\nThere's no session")
              navigate('/login')
          }else{
              setSession(table.data)
          }
          
      })
      
      
    }

  useEffect(()=>{
      
      getSession()

  }, [])
  return (
    <Center
    w='100vw'>
      {/* Passing user in such that their id is accessible
          Passing session should there be a case in the future that involves it
      */}

        <VStack>
            {/* HStack is such that the two buttons are side by side */}
             
              {!(session === undefined) ? 
              <HStack>
                <AddTask /> 
                
                <Button pr='15px' onClick={onSignOut}>Sign Out</Button>
              </HStack> : 
              <>"No data :("</>
              }
              

            <TaskList />
        </VStack>
      

    </Center>
  );
}

export default HomePage;