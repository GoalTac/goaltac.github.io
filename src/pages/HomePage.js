import { Center, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import supabase from '../supabase';



function HomePage() {

  //React Router DOM
  const navigate = useNavigate()  

  //Supabase
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(undefined)
  
  useEffect(()=>{

    const getUserData = async function(){
      await supabase.auth.getSession().then((val)=>{
        if (val.data.session){
          setSession(val.data.session)
        }
      })
    }
    

    getUserData()
    if (session === undefined) {
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
      if (session){return(
        <>
        
        <AddTask key={session.user.id} session={session} /> 
        <TaskList />
          
        </>
      )}else{
        return <><Text>Redirecting maybe</Text></>
      }
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
