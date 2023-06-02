import '@/styles/globals.css';
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import Cookies from 'js-cookie';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	const httpLink = createHttpLink({
		uri: process.env.NEXT_PUBLIC_API_URL,
	});

	const authLink = setContext((_, { headers }) => {
		const userInfo = Cookies.get('user') && JSON.parse(Cookies.get('user')!);
		return {
			headers: {
				...headers,
				Authorization: userInfo?.accessToken
					? `Bearer ${userInfo?.accessToken}`
					: '',
			},
		};
	});

	const client = new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
	});

	return (
		<>
			<ApolloProvider client={client}>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{
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
