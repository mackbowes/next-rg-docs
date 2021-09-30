import Head from 'next/head';

export const MetaData = (props) => {
	return (
		<Head>
			<title>{props.title}</title>
		</Head>
	)
}