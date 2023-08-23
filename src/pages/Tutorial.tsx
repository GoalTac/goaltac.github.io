import { AtSignIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, FormControl, Heading, Image, Input, InputGroup, InputLeftElement, InputRightElement, Link, Text, Stack, FormHelperText, FormLabel, useToast } from "@chakra-ui/react";
import Canvas from "../components/Canvas";
import logo from './../images/GoalTac_TLogo.png'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { useSession } from "../hooks/SessionProvider";

export function Tutorial() {
    const [userName, setUserName] = useState('');
    const [displayName, setDisplayName] = useState('');

    const toast = useToast();
    const navigate = useNavigate();
    const { user } = useSession();
    const userID = user?.['id']

    const handleNameSubmit = async () => {
        // get the user's information    
        const { data, error } = await supabase
          .from('profiles')
          .update({ username: userName})
          .eq('userid', userID) //could have more protections behind this
          .select()
        if (error) {
          console.log(error)
          toast({
            title: `${error}`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } 
        return (error == null ? true : false)
      };
    
    const handleDisplaySubmit = async () => {
        // get the user's information    
        const { data, error } = await supabase
          .from('profiles')
          .update({ name: displayName})
          .eq('userid', userID) //could have more protections behind this
          .select()
        if (error) {
          console.log(error)
          toast({
            title: `${error}`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } 
        return (error == null ? true : false)
      };
    
      const handleSubmit = async() => {
        const checkOne = handleDisplaySubmit()
        const checkTwo = handleNameSubmit()

        Promise.all([checkOne, checkTwo]).then((checks: any)=>{
            if(!checks.every((e: boolean) => e === true)) {
                setDisplayName('')
                setUserName('')
            } else {
                navigate('/')
            }
        })
        
      }

    return (
        <Flex alignItems='center' flexDirection='column' paddingBottom='60px'>
            <Image src={logo} width={['60%','fit-content']}/>
            <Heading paddingY='30px' fontWeight='200'>
                One last thing...
            </Heading>
            <FormControl  maxWidth={['90%','60%']}>
                <Flex flexDirection='column' paddingY='40px'>
                    <FormLabel fontSize='1.5rem' fontWeight='300'>
                        Please choose your username
                    </FormLabel>
                    <Input isRequired type='text' fontSize='2rem' paddingY='30px' paddingX='20px'
                        value={userName}
                        onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^a-z0-9]/g, '');
                        }}
                        onChange={(e) => setUserName(e.target.value)}/>

                    <FormHelperText>
                        No capital letters
                    </FormHelperText>
                </Flex>
                
                <Flex flexDirection='column' paddingY='40px'>
                    <FormLabel fontSize='1.5rem' fontWeight='300'>
                        Please choose your display name
                    </FormLabel>
                    <Input isRequired type='text' fontSize='2rem' paddingY='30px' paddingX='20px'
                        value={displayName}
                        onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^A-z0-9_ ]/g, '');
                        }}
                        onChange={(e) => setDisplayName(e.target.value)}/>
                    <FormHelperText>
                        What's your name?
                    </FormHelperText>
                </Flex>
            </FormControl>
            <Button padding='40px' fontSize='2rem' colorScheme="blue" onClick={handleSubmit}>
                Submit
            </Button>
        </Flex>
    );
}
//                <Canvas style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
