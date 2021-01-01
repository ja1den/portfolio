import { AppProps } from 'next/app';

import 'cirrus-ui';

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;
