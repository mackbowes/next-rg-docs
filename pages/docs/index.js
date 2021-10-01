import { useState, useEffect } from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { isMember } from '../../lib/getMember';

export default function Page() {

	const [pageData, setPageData] = useState();
	const [privatePageData, setPrivatePageData] = useState();
	const [currentPageData, setCurrentPageData] = useState();
	const [currentPageContent, setCurrentPageContent] = useState();

	useEffect(async () => {
		const response = await fetch('/api/getPublicDocs');
		const resJson = await response.json();
		setPageData(resJson.data);
		if (!window?.sessionStorage.getItem('privateData') && true) {
			// get private data IFF it hasn't already been got and the user is allowed
			const privateResponse = await fetch('/api/getPrivateDocs');
			const privateResJson = await privateResponse.json();
			const stringifiedPrivateData = JSON.stringify(privateResJson.data);
			window.sessionStorage.setItem('privateData', stringifiedPrivateData);
			setPrivatePageData(privateResJson.data);
		}
		if (window?.sessionStorage.getItem('privateData')) {
			const stringifiedPrivateData = window.sessionStorage.getItem('privateData');
			const privateData = JSON.parse(stringifiedPrivateData);
			setPrivatePageData(privateData);
		}
	}, []);

	// Set current page to the first item in the PageData array
	useEffect(() => {
		const publicCategories = Object.keys(pageData);
		console.log(pageData[publicCategories[0]]);
	}, [pageData, privatePageData])

	return (
		<>
			{(typeof currentPageData !== 'undefined' && typeof currentPageContent !== 'undefined') &&
				<>
					<Head>
						<title>Docs Overview</title>
					</Head>
					<PageWrapper sidebarData={pageData} privatePageData={privatePageData}>
						<h2>{currentPageData.title}</h2>
						<ReactMarkdown children={currentPageContent} remarkPlugins={[remarkGfm]} />
					</PageWrapper>
				</>
			}
		</>
	)
}