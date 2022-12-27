import { Flex, Text, Image, Center, Link, Box, IconButton, Spacer } from '@chakra-ui/react';
import React from 'react';
import { FaDiscord } from 'react-icons/fa';

const Footer = () => {
  return (
      <Flex
        bottom="0%"
        bg="gray.700"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
          <Flex>
            <Link isExternal href="https://discord.gg/EzFPQDAKGf">
              <IconButton mt={4} mb={2} variant="outlined" icon={<FaDiscord size="sm" color="rgba(114,137,218)" />}  />
            </Link>
          </Flex>     
      </Flex>
    
  );
};

export default Footer;