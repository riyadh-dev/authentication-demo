import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
	Avatar,
	Box,
	Button,
	Center,
	Flex,
	Image,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Stack,
	Text,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { CurrentUserContext } from './Main';

const avatarLink =
	'https://avatars.dicebear.com/api/avataaars/your-custom-seed.svg?top[]=shortFlat&hatColor[]=gray02&hairColor[]=brown&accessories[]=sunglasses&facialHair[]=beardMedium&clothes[]=hoodie&clothesColor[]=gray01&eyes[]=wink&mouth[]=smile&skin[]=brown';

const logoLink = 'https://cdn-icons-png.flaticon.com/512/5524/5524383.png';

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const formBg = useColorModeValue('gray.200', 'gray.700');

	const { currentUser, logout } = useContext(CurrentUserContext);

	return (
		<Box bg={formBg} px={4} mb={6}>
			<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
				<Image
					borderRadius='full'
					boxSize='45px'
					src={logoLink}
					alt='Auth Demo'
					backgroundColor='gray.900'
				/>
				<Text
					fontFamily='heading'
					fontSize='xl'
					fontWeight='bold'
					color={useColorModeValue('gray.800', 'white')}
				>
					Authentication Demo
				</Text>

				<Flex alignItems={'center'}>
					<Stack direction={'row'} spacing={7}>
						<Button onClick={toggleColorMode}>
							{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
						</Button>

						{currentUser && (
							<Menu>
								<MenuButton
									as={Button}
									rounded={'full'}
									variant={'link'}
									cursor={'pointer'}
									minW={0}
								>
									<Avatar size={'sm'} src={avatarLink} />
								</MenuButton>
								<MenuList alignItems={'center'}>
									<br />
									<Center>
										<Avatar size={'2xl'} src={avatarLink} />
									</Center>
									<br />
									<Center>
										<p>{currentUser.username}</p>
									</Center>
									<br />
									<MenuDivider />
									<MenuItem onClick={() => logout()}>Logout</MenuItem>
								</MenuList>
							</Menu>
						)}
					</Stack>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Navbar;
