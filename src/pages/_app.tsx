import '@/styles/globals.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
	const client = new ApolloClient({
		uri: 'http://localhost:8800/graphql',
		cache: new InMemoryCache(),
	});
	return (
		<>
			<Head>
				<title>Page title</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>
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
						<Notifications />
						<Component {...pageProps} />
					</ModalsProvider>
				</MantineProvider>
			</ApolloProvider>
		</>
	);
}
