import { Flex, Text, Image, Center, Link, Box, IconButton, Spacer } from '@chakra-ui/react';
import React from 'react';
import { FaDiscord } from 'react-icons/fa';

const Footer = () => {
  return (
    <Flex>
      <Flex
        w="full"
        bg="blackAlpha.100"
        minHeight="20vh"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        justifyContent="center"
      >
          <Flex>
            <Link isExternal href="https://discord.gg/EzFPQDAKGf">
              <IconButton mt={4} mb={5} variant="outlined" icon={<FaDiscord size="sm" color="rgba(114,137,218)" />}  />
            </Link>
          </Flex>
          <Text mb="10">
            <Link mr={6} color="whiteAlpha.700" href="terms" isExternal>
              TERMS
            </Link>
            <Link href="privacy" isExternal color="whiteAlpha.700">
              PRIVACY
            </Link>
          </Text>      
      </Flex>
    </Flex>
    
  );
};

export default Footer;