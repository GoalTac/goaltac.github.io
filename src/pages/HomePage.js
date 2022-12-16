import { Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import supabase from '../supabase';



function HomePage() {

  //React Router DOM
  const navigate = useNavigate()  

  //Supabase
  const [user, setUser] = useState(undefined)
  
  useEffect(()=>{
    getUserData()
    if (!user === undefined) {
      navigate('/')
    } else{
      navigate('/login')
    }
  },[])
  const getUserData = async function(){
    const {v} = await supabase.auth.getSession()

    if (v !== undefined){setUser(v.user)}
    
  }

  // const shouldIStayOrShouldIGo = function(){
  //   getUserData()
  //   if (!user === undefined) {
  //     navigate('/')
  //   } else{
  //     navigate('/login')
  //   }
  // }
    
  return (
    <Center
    h='80vh'
    w='100vw'>
      
    

    </Center>
  );
}

export default HomePage;
