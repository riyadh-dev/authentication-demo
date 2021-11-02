import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import SignUp from './components/SignUp';

function App() {
	const queryClient = new QueryClient();
	return (
		<ChakraProvider>
			<QueryClientProvider client={queryClient} >
				<SignUp/>
			</QueryClientProvider>
		</ChakraProvider>
	);
}

export default App;
