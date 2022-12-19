import { Button, Center, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AddTask from '../components/Tasks/AddTask';
import TaskList from '../components/TaskList';
import supabase from '../supabase';
import NavBar from '../components/NavBar';
import { Routes, Route } from 'react-router-dom';
import Settings from '../components/Settings';



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

    const whatAmIShowing = () =>{
      if (!state) {return(<>"No data :("</>)}

      const sesh = state.session
      if (sesh){return(
        <>
        {/* HStack is such that the two buttons are side by side */}
        <HStack> 
          <AddTask key={sesh.user.id} session={sesh} /> 
        </HStack>
        <TaskList />
          
        </>
      )}
    }

    useEffect(()=>{ 
      if (!state) {
        navigate('/login')
      }
    },[])

  return (
    <Center
    w='100vw'>
      {/* Passing user in such that their id is accessible
          Passing session should there be a case in the future that involves it
      */}

        <VStack>
          <HStack>
            <NavBar />
            <Settings />
          </HStack>
          
          {whatAmIShowing()}
        </VStack>
      

    </Center>
  );
}

export default HomePage;
