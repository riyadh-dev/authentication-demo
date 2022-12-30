import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Main from './components/Main';

function App() {
	const queryClient = new QueryClient({
		defaultOptions: { mutations: { retry: 0 }, queries: { retry: 0 } },
	});
	return (
		<ChakraProvider>
			<QueryClientProvider client={queryClient}>
				<Main />
			</QueryClientProvider>
		</ChakraProvider>
	);
}

export default App;
