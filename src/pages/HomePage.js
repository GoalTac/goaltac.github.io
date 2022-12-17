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
  const [session, setSession] = useState(state.session)
  const [user, setUser] = useState(undefined)

  
  
  useEffect(()=>{ 

    if (!session) {
      navigate('/login')
    }
  },[user])


  

  // const shouldIStayOrShouldIGo = function(){
  //   getUserData()
  //   if (!user === undefined) {
  //     navigate('/')
  //   } else{
  //     navigate('/login')
  //   }
  // }

  
    const whatAmIShowing = () =>{
      // console.log(session)
      if (session){return(
        <>
        {/* HStack is such that the two buttons are side by side */}
        <HStack> 
          <AddTask key={session.user.id} session={session} /> 
          
          <Button pr='15px' onClick={supabase.auth.signOut}>Sign Out</Button>

        </HStack>
        <TaskList />
          
        </>
      )}
    }

    const onSignOut = async function(){
      const { error } = await supabase.auth.signOut()
      navigate('/')
    }


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
