import { Box, Button, Flex, FormControl, Input, InputGroup, InputLeftElement, InputRightElement, Stack, useColorModeValue, useToast } from "@chakra-ui/react";
import bubble from './../images/bubble.svg'
import { supabase } from "../supabase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
    const toast = useToast();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirmation password
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    const SetNewPassword = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            toast({
                title: "Passwords do not match",
                description: "Please make sure both passwords match.",
                position: 'bottom',
                status: 'error',
                duration: 3000,
                isClosable: false,
            });
            return; // Return early if passwords don't match
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) {
                throw error;
            }
            navigate('/login'); // Redirect to login page
            toast({
                title: "Password reset success! Log in with your new password.",
                position: 'bottom',
                status: 'success',
                duration: 5000,
                isClosable: false,
            })
        } catch (error: any) {
            toast({
                title: "Password Reset Failure",
                description: error.message,
                position: 'bottom',
                status: 'error',
                duration: 3000,
                isClosable: false,
            })
        }
    }

    return (
        <Flex
            flexDirection='column'
            width='100wh'
            height='100vh'
            justifyContent='center'
            alignItems='center'
            color="white"
            backgroundImage={bubble}
            backgroundSize='cover'>
            Reset Password
            <Box>
                <form onSubmit={SetNewPassword}>
                    <Stack
                        spacing={4}
                        p='1rem'
                        backgroundColor={useColorModeValue('gray.50', 'blackAlpha.200')}>
                        <FormControl>
                            <InputGroup>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    textColor={useColorModeValue('black', 'white')}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="New Password" // Add a placeholder for better UI
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleShowClick} bg={newPassword ? 'whiteAlpha.400' : 'whiteAlpha.100'} _hover={{ backgroundColor: 'blackAlpha.100' }}>
                                        {showPassword ? 'hide' : 'show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    textColor={useColorModeValue('black', 'white')}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password" // Add a placeholder for better UI
                                />
                            </InputGroup>
                        </FormControl>
                        <Button
                            onClick={(e) => SetNewPassword(e)}
                            borderRadius={5}
                            type='submit'
                            variant={useColorModeValue('outline', 'solid')}
                            width='full'
                            bg={newPassword ? 'whiteAlpha.400' : 'whiteAlpha.100'} _hover={{ backgroundColor: 'blackAlpha.100' }}>
                            Reset Password
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Flex>
    )
}
