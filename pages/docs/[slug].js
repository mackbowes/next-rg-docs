import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PageWrapper } from '../../components/PageWrapper';
import { MetaData } from '../../components/Metadata';
import { getPublicPostData, getPublicPostSlugs, getPublicDocs } from '../../lib/posts';

export default function Home(props) {

	return (
		<>
			<MetaData title={props.slug} />
			<PageWrapper sidebarData={props.allPostsData}>
				<ReactMarkdown children={props.content} remarkPlugins={[remarkGfm]} />
			</PageWrapper>
		</>
	)
}

export async function getStaticPaths() {
	const paths = getPublicPostSlugs();
	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps({ params }) {
	console.log(params.slug);
	const postContent = await getPublicPostData(params.slug);
	const allPostsData = getPublicDocs();
	return {
		props:
		{
			allPostsData: allPostsData,
			content: postContent,
			slug: params.slug
		}
	};
}