import { useEffect, useState } from 'react';
import useSWR from 'swr'
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PageWrapper } from '../components/PageWrapper';
import getMember from './api/getMember';


export default function Home(props) {

	const goToDocsIndex = () => {
		window.location.pathname = '/docs';
	}

	return (
		<>
			<div style={{ display: `grid`, placeItems: `center`, minHeight: `100vh`, minWidth: `100vw` }}>
				<div style={{ display: `flex`, flexDirection: `column`, alignItems: `center` }}>
					<h3>DOCS!</h3>
					<h4 onClick={() => goToDocsIndex()}>Enter App</h4>
				</div>
			</div>
		</>
	);
}

