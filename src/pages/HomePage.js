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

    const whatAmIShowing = () =>{
      if (!state) {return(<>"No data :("</>)}

      const sesh = state.session
      if (sesh){return(
        <>
        {/* HStack is such that the two buttons are side by side */}
        <HStack> 
          <AddTask key={sesh.user.id} session={sesh} /> 
          
          <Button pr='15px' onClick={onSignOut}>Sign Out</Button>

        </HStack>
        <TaskList />
          
        </>
      )}
    }

    const onSignOut = async function(){
      const { error } = await supabase.auth.signOut()
      navigate('/')
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

        <VStack>{whatAmIShowing()}</VStack>
      

    </Center>
  );
}

export default HomePage;
