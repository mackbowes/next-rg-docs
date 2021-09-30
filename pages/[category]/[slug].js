import { useEffect, useState } from 'react';
import Head from 'next/head';
import useSWR from 'swr'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PageWrapper } from '../../components/PageWrapper';
import { MetaData } from '../../components/Metadata';



export default function Home(props) {

	const [pageData, setPageData] = useState();
	const [currentPage, setCurrentPage] = useState();
	const [currentSlug, setCurrentSlug] = useState();
	const [slugParameters, setSlugParameters] = useState();

	useEffect(async () => {
		setCurrentSlug(window.location.pathname);
		const response = await fetch('/api/getPublicDocs');
		const resJson = await response.json();
		setPageData(resJson.data);
	}, []);

	useEffect(() => {
		setSlugParameters();
		if (typeof currentSlug !== 'undefined') {
			let slugParams = currentSlug?.split("/");
			slugParams.splice(0, 1);
			setSlugParameters(slugParams);
		}
	}, [currentSlug]);

	useEffect(() => {
		if (typeof slugParameters !== 'undefined' && typeof pageData !== 'undefined') {
			// console.log(pageData[slugParameters[0]]);
			pageData[slugParameters[0]].forEach((post) => {
				if (slugParameters[1] === post.slug) {
					setCurrentPage(post);
				}
			});
		}
	}, [pageData, slugParameters])


	return (
		<>
			{(typeof currentPage !== 'undefined') &&
				<>
					<MetaData title={currentPage.title} />
					<PageWrapper sidebarData={pageData}>
						<ReactMarkdown children={currentPage.fileContent} remarkPlugins={[remarkGfm]} />
					</PageWrapper>
				</>
			}

		</>
	)
}

