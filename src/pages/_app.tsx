import '@/styles/globals.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	const client = new ApolloClient({
		uri: process.env.NEXT_PUBLIC_API_URL,
		cache: new InMemoryCache(),
	});

	return (
		<>
			<ApolloProvider client={client}>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{
						/** Put your mantine theme override here */
						colorScheme: 'dark',
					}}
				>
					<ModalsProvider>
						<Notifications position='top-right' zIndex={2077} />
						<Component {...pageProps} />
					</ModalsProvider>
				</MantineProvider>
			</ApolloProvider>
		</>
	);
}
