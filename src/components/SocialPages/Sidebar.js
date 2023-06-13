import {
  Box,
  Text,
  Heading,
  Stack,
  CardHeader,
  CardBody,
  Card,
  StackDivider,
  Button,
} from '@chakra-ui/react';

/*
    This is the component that contains the 
    option to view your friends, other communities, etc.
  */

export default function Sidebar() {
  return (
    <Card maxW='225px'>
      <CardHeader>
        <Heading size='md'>Manage my Social</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Text size='xs' textTransform='uppercase'>
              Friends
            </Text>
          </Box>
          <Box>
            <Button
              justifyContent='center'
              // onClick={}
              overflow='hidden'
            >
              <Text size='xs' textTransform='uppercase'>
                Communities
              </Text>
            </Button>
          </Box>
          <Box>
            <Text size='xs' textTransform='uppercase'>
              Analysis
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
