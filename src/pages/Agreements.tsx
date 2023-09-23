import { Box, Heading, IconButton, Image, Link, ListItem, OrderedList, Stack, Text } from "@chakra-ui/react";
import logo_name from './../images/GoalTac_Logo.png'
import { RxExit } from 'react-icons/rx'
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function Terms_Home() {
    const navigate = useNavigate()

    function Header() {

        return (<Stack
            alignItems='center' flexDirection={['column','row']}
            px={['1rem','3rem']}
            py={['1rem','2rem']} overflowX='hidden'>
            <IconButton variant='unstyled' onClick={()=>navigate('/welcome')} icon={<ArrowLeftIcon/>} aria-label='Back to Welcome'/>

            <Image src={logo_name} maxWidth='10rem' />
        </Stack>);
    }

    function Terms_of_Service() {
        return <Box marginLeft={['4rem',null]} id='terms_of_service'>
        <Heading fontSize='3rem'>Terms of Service Agreement</Heading>  
        <Heading fontSize='1.5rem'>Last Updated: [September 21st, 2023]</Heading>

        <Text lineHeight='2rem' marginLeft={['2rem',null]}>
        This Terms of Service Agreement ("Agreement") governs your use of GoalTac, a social media/productivity application designed to connect users seeking accountability in their goal pursuit. By accessing or using GoalTac, you agree to be bound by the terms and conditions of this Agreement. If you do not agree with any part of this Agreement, you must not use GoalTac.
        <OrderedList>
            <ListItem>User Data Storage:
                <Text>
                    GoalTac takes user data storage seriously. We implement industry-standard security measures to protect your data. However, we cannot guarantee the absolute security of your data and you acknowledge and accept that you provide your data at your own risk.
                </Text>
            </ListItem>
            <ListItem>Account Security:
                <Text>
                    You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
                </Text>
            </ListItem>
            <ListItem>Subscription Services:
                <Text>
                    GoalTac may offer subscription services with additional features and benefits. By subscribing to these services, you agree to pay the applicable fees as outlined in the subscription agreement. Failure to pay these fees may result in the suspension or termination of your subscription.
                </Text>
            </ListItem>
            <ListItem>Collection and Storing of User Information:
                <Text>
                    GoalTac collects and stores user information, including but not limited to emails, passwords, tasks, friends, and communities. We use this information to provide you with the services offered by GoalTac. We respect your privacy and will handle your information in accordance with our Privacy Policy.
                </Text>
            </ListItem>
            <ListItem>User Responsibilities:
                <Text>
                    You are solely responsible for the content you post, share, or otherwise make available on GoalTac. You agree not to use GoalTac for any unlawful, harmful, or inappropriate purposes. You also agree to comply with all applicable laws and regulations.
                </Text>
            </ListItem>
            <ListItem>Intellectual Property Rights:
                <Text>
                    GoalTac and its associated trademarks, logos, and other intellectual property are owned by GoalTac or its licensors. You agree not to use, reproduce, or distribute any of these without prior written permission from GoalTac.
                </Text>
            </ListItem>
            <ListItem>Limitations of Liability:
                <Text>
                    GoalTac is provided on an "as is" and "as available" basis. We do not warrant that GoalTac will be uninterrupted, error-free, or free from viruses or other harmful components. In no event shall GoalTac be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with the use of GoalTac.
                </Text>
            </ListItem>
        </OrderedList>
        </Text>
        By using GoalTac, you acknowledge that you have read, understood, and agreed to the terms and conditions of this Agreement. If you do not agree with any part of this Agreement, you must not use GoalTac.
        
        For any questions or concerns regarding this Agreement, please contact us at <Link>goaltac@gmail.com</Link>.
        </Box>
    }

    function Privacy_Policy(){
        return <Box marginLeft={['4rem',null]} id='privacy_policy'>
        <Heading fontSize='3rem'>Privacy Policy</Heading>  
        <Heading fontSize='1.5rem'>Last Updated: [September 21st, 2023]</Heading>

        <Text lineHeight='2rem' marginLeft={['2rem',null]}>
        This Privacy Policy governs the manner in which GoalTac collects, uses, maintains, and discloses information collected from users (each, a "User") of the GoalTac website and mobile application (the "Platform"). This Privacy Policy applies to the Platform and all products and services offered by GoalTac.
        <OrderedList>
            <ListItem>Information Collection and Use:
                <Text>
                    GoalTac may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit the Platform, register on the Platform, place an order, subscribe to the newsletter, respond to a survey, fill out a form, and in connection with other activities, services, features or resources we make available on our Platform. Users may be asked for, as appropriate, name, email address, mailing address, phone number, and credit card information. Users may, however, visit our Platform anonymously. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Platform-related activities.
                </Text>
            </ListItem>
            <ListItem>Data Storage and Security:
                <Text>
                    GoalTac is committed to ensuring that User information is secure. We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of User information, username, password, transaction information, and data stored on our Platform. However, no method of transmission over the Internet, or method of electronic storage, is 100% secure. Therefore, while we strive to use commercially acceptable means to protect User information, we cannot guarantee its absolute security.
                </Text>
            </ListItem>
            <ListItem>Subscription Services:
                <Text>
                    By subscribing to GoalTac's services, Users agree to provide accurate and complete information and to promptly update any changes to their subscription details. Users are responsible for maintaining the confidentiality of their account and password and for restricting access to their computer or mobile device to prevent unauthorized access to their account. Users agree to accept responsibility for all activities that occur under their account or password.
                </Text>
            </ListItem>
            <ListItem>Collection and Storing of User Information:
                <Text>
                    GoalTac may collect and store non-personal identification information about Users whenever they interact with our Platform. Non-personal identification information may include the browser name, the type of computer or mobile device, and technical information about Users' means of connection to our Platform, such as the operating system, the Internet service providers utilized, and other similar information.
                </Text>
            </ListItem>
            <ListItem>User Responsibilities:
                <Text>
                    Users are solely responsible for the content they post on the GoalTac Platform, including any personal or sensitive information shared with others. Users agree not to post any content that is unlawful, defamatory, harassing, threatening, harmful, or otherwise objectionable. Users understand and agree that GoalTac does not endorse or control the content posted by Users and that GoalTac shall not be liable for any such content.
                </Text>
            </ListItem>
            <ListItem>Intellectual Property Rights:
                <Text>
                    The GoalTac Platform and all its original content, features, and functionality are owned by GoalTac and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. Users shall not acquire any right, title, or interest in or to any intellectual property rights belonging to GoalTac.
                </Text>
            </ListItem>
            <ListItem>Limitation of Liability:
                <Text>
                    In no event shall GoalTac, its directors, officers, employees, or agents be liable for any direct, indirect, incidental, special, punitive, or consequential damages arising out of or relating to the use of or inability to use the Platform, including but not limited to any loss of data, profit, or business interruption, whether based on warranty, contract, tort, or any other legal theory, even if GoalTac has been advised of the possibility of such damages.
                </Text>
            </ListItem>
        </OrderedList>
        </Text>
        By using the GoalTac Platform, Users signify their acceptance of this Privacy Policy. If Users do not agree to this Privacy Policy, please do not use our Platform. We reserve the right to update, modify, or change this Privacy Policy at any time. Users are advised to check this Privacy Policy periodically for any changes.
        </Box>
    }

    return <Box>
        <Header/>
        <Stack rowGap='6rem'>
            <Terms_of_Service/>
            <Privacy_Policy/>
        </Stack>
        
    </Box>
}

