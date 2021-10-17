import { useEffect, useState } from 'react';
import Head from 'next/head';
import Markdown from 'react-markdown';
import matter from "gray-matter";
import { Sidebar } from '../../components/PageWrapper';
import LogInButton from '../../components/LogIn';
import { Heading, Box, Grid } from '@chakra-ui/react'
import gfm from 'remark-gfm';
import raw from 'rehype-raw';


export default function Home(props) {

	const [pageData, setPageData] = useState();
	const [privatePageData, setPrivatePageData] = useState();
	const [currentPageData, setCurrentPageData] = useState();
	const [currentPageContent, setCurrentPageContent] = useState();
	const [currentSlug, setCurrentSlug] = useState();
	const [slugParameters, setSlugParameters] = useState();

	// insert custom components into this.
	const components = {

	} 

	useEffect(() => {
		const getData = async () => {
			setCurrentSlug(window.location.pathname);
			const response = await fetch('/api/getPrivateDocs');
			const resJson = await response.json();
			setPageData(resJson.data);	
		}
		// if (!window?.sessionStorage.getItem('publicData')) {
		// 	const response = await fetch('/api/getPublicDocs');
		// 	const resJson = await response.json();
		// 	const stringifiedPublicData = JSON.stringify(resJson.data);
		// 	window.sessionStorage.setItem('publicData', stringifiedPublicData);
		// 	setPageData(resJson.data);
		// }
		// if (window?.sessionStorage.getItem('publicData')) {
		// 	const stringifiedPublicData = window.sessionStorage.getItem('publicData');
		// 	const publicData = JSON.parse(stringifiedPublicData);
		// 	setPageData(publicData);
		// }
		getData();
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
			pageData?.forEach((post) => {
				if (slugParameters[1] === post.slug) {
					const { data, content } = matter(post.fileContent);
					setCurrentPageData(data);
					setCurrentPageContent(content);
				}
			});
			if (typeof privatePageData !== 'undefined') {
				console.log(privatePageData);
				privatePageData[slugParameters[0]]?.forEach((post) => {
					// updates current page if private data is available only
					if (slugParameters[1] === post.slug) {
						const { data, content } = matter(post.fileContent);
						setCurrentPageData(data);
						setCurrentPageContent(content);
					}
				});
			}
		}

	}, [pageData, slugParameters, privatePageData])


	return (
		<>
			{(typeof currentPageData !== 'undefined' && typeof currentPageContent !== 'undefined') &&
				<>
					<Head>
						<title>{currentPageData.title}</title>
				</Head>
					<Box h="100vh" w="100vw" sx={{ position: `relative` }}>
						<Grid templateColumns="1fr 4fr" >
							<Sidebar data={pageData} />
							<Box sx={{
								backgroundColor: `brand.900`,
								padding: `2rem`,
								color: 'white',
								overflowY: `scroll`,
							maxHeight: `100vh`,
						}}>
							<Box sx={{maxWidth: `800px`, margin: `0 auto`}}>
								<Heading as="h2" sx={{ fontSize: `3rem` }}>{currentPageData?.title}</Heading>
								<div className="md-container">
										{console.log(currentPageContent)}
									<Markdown remarkPlugins={[gfm]} rehypePlugins={[raw]}>
										{currentPageContent}
									</Markdown>
								</div>
							</Box>
							</Box>
						</Grid>
					</Box>
					<LogInButton setPrivatePageData={(d) => setPrivatePageData(d)} /> {/* d for data */}
				</>
			}
		</>
	)
}
