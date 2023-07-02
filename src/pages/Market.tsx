import { useState } from 'react';
import {
    Box,
    Badge,
    IconButton,
    Text,
    VStack,
    HStack,
} from '@chakra-ui/react';
import { FaMedal } from 'react-icons/fa';

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

export default function Market() {
    // Variables ----------------------------------------------------------------------

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