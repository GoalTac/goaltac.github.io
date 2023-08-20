import { AtSignIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, FormControl, Image, Input, InputGroup, InputLeftElement, InputRightElement, Link, Spinner, Stack } from "@chakra-ui/react";
import Canvas from "../components/Canvas";

export function Tutorial() {
    return (
        <Flex
            flexDirection='column'
            width='100wh'
            height='100vh'
            justifyContent='center'
            alignItems='center'
            color="white"
        >
            <Stack
                flexDir='column'
                mb='2'
                justifyContent='center'
                alignItems='center'
            >

                <Canvas style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
                <Image src="logo.png" alt="Logo" boxSize="80px" />
            </Stack>
        </Flex>
    );
}