import '@/styles/globals.css';
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
} from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import type { AppProps } from 'next/app';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

export default function App({ Component, pageProps }: AppProps) {
	// const myCache = createEmotionCache({
	// 	key: "mantine",
	// 	prepend: false,
	//   });

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
