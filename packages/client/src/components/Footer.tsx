import { Box, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';

export default function Footer() {
	const mainBg = useColorModeValue('gray.100', 'gray.800');
	const lineColor = useColorModeValue('gray.300', 'gray.700');
	const mainColor = useColorModeValue('gray.700', 'gray.300');
	return (
		<Box w='full' bg={mainBg} color={mainColor}>
			<Box py={5}>
				<Flex
					align={'center'}
					_before={{
						content: '""',
						borderBottom: '1px solid',
						borderColor: lineColor,
						flexGrow: 1,
						mr: 8,
					}}
					_after={{
						content: '""',
						borderBottom: '1px solid',
						borderColor: lineColor,
						flexGrow: 1,
						ml: 8,
					}}
				>
					<Image
						borderRadius='full'
						boxSize='45px'
						src='https://avatars.githubusercontent.com/u/50684407?v=4'
						alt='Riyadh Baatchia'
					/>
				</Flex>
				<Text pt={6} fontSize={'sm'} textAlign={'center'}>
					© {new Date().getFullYear()} Riyadh Baatchia. All rights reserved
				</Text>
			</Box>
		</Box>
	);
}
