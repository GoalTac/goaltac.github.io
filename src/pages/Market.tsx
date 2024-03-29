import { useState } from 'react';
import {
    Box,
    Badge,
    IconButton,
    Text,
    Stack,
    VStack,
    HStack,
    Icon,
    Button,
    Flex,
    Image,
    Heading,
    Center,
    Divider,
    useColorMode,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react';
import { FaCoins, FaMedal, FaPencilAlt, FaRegCalendar, FaTshirt, FaShoppingCart } from 'react-icons/fa';
import { TbTargetArrow } from 'react-icons/tb';

import premiumLogo from './../images/premium_logo.png';
import premiumName from './../images/premium_logo_name.png';


export default function Market() {
    // UseEffect ----------------------------------------------------------------------
    // Functions ----------------------------------------------------------------------

    const [balance, setBalance] = useState(500);    
    type Item = {
        id: number;
        name: string;
        description: string;
        price: number;
        icon: JSX.Element;
       };
    
       const items: Item[] = [
        {
            id: 1,
            name: 'GoalTac T-Shirt',
            description: 'Description of shirt',
            price: 100,
            icon: <FaTshirt size="5em"/>
        },
        {
            id: 2,
            name: 'GoalTac Calendar',
            description: 'Description of calendar',
            price: 50,
            icon:  <FaRegCalendar size="5em"/>
        },
        {
            id: 3,
            name: 'GoalTac Pencil', 
            description: 'Description of pencil',
            price: 25,
            icon: <FaPencilAlt size="5em"/>
        }, 
       ];

    const [cart, setCart] = useState<Item[]>([]);

    const [showBuy, setShowBuy] = useState(false);


    const handleClick = () => {
        setShowBuy(!showBuy);
        };
    

    const handleBuy = (items: Item) => {
        if (balance >= items.price) {
            setBalance(balance - items.price);
            setCart([...cart, items]);
        } else {
            alert('Not enough balance!');
        }
    };

    function Buy() {
        return (
        <VStack>
                     {cart.map((items) => (
                                <Box
                                    key={items.id}
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    overflow="hidden"
                                    p={4}
                                    w="100%"
                                >
                                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                                        {items.name}
                                    </Text>
                                    <Text fontSize="lg" mb={2}>
                                        Price: {items.price}
                                    </Text>
                                </Box>
                            ))}
                </VStack>
                )
    }

    const displayItems = (items: Item[]) => {
        if (cart.length === 0) {
            alert('No items in cart');
        } else {
            <VStack>
                 {cart.map((items) => (
                            <Box
                                key={items.id}
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                p={4}
                                w="100%"
                            >
                                <Text fontSize="xl" fontWeight="bold" mb={2}>
                                    {items.name}
                                </Text>
                                <Text fontSize="lg" mb={2}>
                                    Price: {items.price}
                                </Text>
                            </Box>
                        ))}
            </VStack>
        }
        // {cart.length === 0 ? (
        //     <Text>No items in cart</Text>
        // ) : (
        //     <Text>Items in cart</Text>
            // <VStack>
            //     {cart.map((items) => (
            //                 <Box
            //                     key={items.id}
            //                     borderWidth="1px"
            //                     borderRadius="lg"
            //                     overflow="hidden"
            //                     p={4}
            //                     w="100%"
            //                 >
            //                     <Text fontSize="xl" fontWeight="bold" mb={2}>
            //                         {items.name}
            //                     </Text>
            //                     <Text fontSize="lg" mb={2}>
            //                         Price: {items.price}
            //                     </Text>
            //                 </Box>
            //             ))}
            // </VStack>
        // )}
    };

    // const handleClick = () => {
    //     if (cart.length !== 0) {
    //       setOutput(
    //         <Buy/>
    //       );
    //     } else {
    //         alert('No items in cart');
    //     }
    //     };
    
    // const [showVStack, setShowVStack] = useState(false);

    // const handleClick = () => {
    // setShowVStack(!showVStack);
    // };

    return (
        <Box>
            <Text
            fontSize="4xl" fontWeight="bold" bgGradient='linear(to-t, teal.300, blue.500)' bgClip='text'
                    // mt={-50} 
                    // mb={-100}
                    textAlign={'center'}
                    >
                         Marketplace
            </Text>
            <HStack justify={'right'} gridGap="3px" 
                mt={-50} 
                mb={50}

                >
                <Text>{balance}</Text>
                    <TbTargetArrow size="1em" />
                <IconButton 
                    aria-label="Cart"
                    icon={<FaShoppingCart size="1em" />}
                    onClick={handleClick}
                    />
        {showBuy && cart.length !== 0 && <Buy/>}


                {/* <Menu>
                    <MenuButton 
                    as={IconButton} 
                    icon={<FaShoppingCart size="1em" />}
                    onClick={handleClick} 
                    />
                    <MenuList> */}
                        {/* <MenuItem>Download</MenuItem>
                        <MenuItem>Create a Copy</MenuItem>
                        <MenuItem>Mark as Draft</MenuItem>
                        <MenuItem>Delete</MenuItem>
                        <MenuItem>Attend a Workshop</MenuItem> */}
                        {/* <Box>
                            {cart.map((items) => (
                                <Box
                                    key={items.id}
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    // overflow="hidden"
                                    // p={4}
                                    // w="100%"
                                >
                                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                                        {items.name}
                                    </Text>
                                    <Text fontSize="lg" mb={2}>
                                        Price: {items.price}
                                    </Text>
                                </Box>
                            ))}
                        </Box> */}
                    {/* </MenuList>
                </Menu> */}
            </HStack> 

            <HStack>
                <Flex 
                // flexDir='row' 
                w='75vw' 
                // marginX='auto' 
                justify='center'
                // borderWidth='10px'
                >
                    <VStack divider={<Divider borderColor='gray.200' />}
                    // borderWidth={'10px'}
                    >
                            <Box>
                                <Text fontSize="3xl" fontWeight="bold" bgGradient='linear(to-t, teal.300, blue.500)' bgClip='text'>
                                    Merch
                                </Text>
                            </Box>

                            {items.map((items) => (
                                <Flex>
                                    <HStack spacing={10}>
                                        {items.icon}
                                        <VStack>
                                            <Text fontSize="xl" fontWeight="bold">
                                                {items.name}
                                            </Text>
                                            <Text>
                                                {items.description}
                                            </Text>
                                        </VStack>
                                        <Button 
                                        rightIcon={<TbTargetArrow size="1em" />}
                                        onClick={() => handleBuy(items)}
                                        isDisabled={balance < items.price}
                                        >
                                            Get For: {items.price}
                                        </Button>
                                    </HStack>
                                </Flex>
                            

                            ))}
                    </VStack>
                    
                </Flex>
                <Flex 
                    justify={'right'}
                    w='25vw'
                    >
                    <Premium/> 
                </Flex>
            </HStack>



        </Box> 
        
            
    );
}

function Premium(){
    const { colorMode } = useColorMode()

    return( <Flex
        
        width={300}
        flexDirection='column' 
        position='relative'
        rowGap='1rem' 
        borderColor={(colorMode == 'dark' ? 'yellow.500' : 'orange.300')}>
        <Image zIndex='hide' position='absolute' top='0px' right='0px' width='25%' src={premiumLogo}/>
        <VStack alignItems='left'>
            <Image width='50%' src={premiumName} />
            <Box paddingStart='0.6rem' rowGap='1rem'>
                <Heading fontSize='1.2rem'>
                    Try Premium for free
                </Heading>
                <Text lineHeight='1.5rem'>
                    No ads, more features, full access!
                </Text>
            </Box>
        </VStack>
            <Button borderRadius='15px'
                _active={{
                    bgColor: 
                    (colorMode == 'dark' ? 
                    'rgb(236, 201, 75)' : 
                    'rgb(251, 211, 141)')
                }}
                boxShadow={(colorMode == 'dark' ? 
                '0px 2px 8px rgb(214, 158, 46)' : 
                '0px 2px 8px rgb(237, 137, 54)')}
                textColor='white' 
                marginX='1rem' 
                borderWidth='1px' 
                _hover={{
                    boxShadow: (colorMode == 'dark' ? 
                '0px 2px 14px rgb(214, 158, 46)' : 
                '0px 2px 14px rgb(237, 137, 54)')
                }}
                bgColor={(colorMode == 'dark' ? 'yellow.500' : 'orange.300')}>
                Try 1 week free!
            </Button>
        </Flex>)
}





export function MarketOld() {
    // Variables ----------------------------------------------------------------------
    type Medal = {
        id: number;
        name: string;
        price: number;
        icon: JSX.Element;
    };
    
    const medals: Medal[] = [
        {
            id: 1,
            name: 'Gold Medal',
            price: 100,
            icon: <FaMedal color="gold" size="2em" />,
        },
        {
            id: 2,
            name: 'Silver Medal',
            price: 50,
            icon: <FaMedal color="silver" size="2em" />,
        },
        {
            id: 3,
            name: 'Bronze Medal',
            price: 25,
            icon: <FaMedal color="peru" size="2em" />,
        },
    ];
    const [cart, setCart] = useState<Medal[]>([]);

    const handleBuy = (medal: Medal) => {
        if (balance >= medal.price) {
            setBalance(balance - medal.price);
            setCart([...cart, medal]);
        } else {
            alert('Not enough balance!');
        }
    };

    // UseEffect ----------------------------------------------------------------------
    // Functions ----------------------------------------------------------------------

    const [balance, setBalance] = useState(500);
    return (
        <Box p={12}>
            <Text fontSize="3xl" fontWeight="bold" mt={12} mb={4}>
                Marketplace
            </Text>
            <Badge colorScheme="green">Balance: {balance}</Badge>
            <VStack spacing={4}>
                <Text fontSize="2xl" fontWeight="bold">
                    Medals
                </Text>
                <HStack spacing={4} align="stretch">
                    {medals.map((medal) => (
                        <Box
                            key={medal.id}
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            p={6}
                            w="100%"
                        >
                            <Badge mb={2}>{medal.name}</Badge>
                            <Text fontSize="lg" mb={2}>
                                Price: {medal.price}
                            </Text>
                            <IconButton
                                aria-label="Buy"
                                icon={medal.icon}
                                variant="outline"
                                size="sm"
                                onClick={() => handleBuy(medal)}
                                isDisabled={balance < medal.price}
                            />
                        </Box>
                    ))}
                </HStack>
                <Text fontSize="2xl" fontWeight="bold" mt={4}>
                    Cart
                </Text>
                {cart.length === 0 ? (
                    <Text>No items in cart</Text>
                ) : (
                    <HStack spacing={4} align="stretch">
                        {cart.map((medal) => (
                            <Box
                                key={medal.id}
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                p={4}
                                w="100%"
                            >
                                <Text fontSize="xl" fontWeight="bold" mb={2}>
                                    {medal.name}
                                </Text>
                                <Text fontSize="lg" mb={2}>
                                    Price: {medal.price}
                                </Text>
                            </Box>
                        ))}
                    </HStack>
                )}
            </VStack>
        </Box>
    );
} 