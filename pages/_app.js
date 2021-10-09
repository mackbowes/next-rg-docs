// Import fonts declared in theme from fontsource here (before importing theme)
import "@fontsource/texturina/500.css" // you can import multiple weights
import "@fontsource/open-sans/500.css"
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../themes/Default'


function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default MyApp
