import { useEffect, useState } from 'react';
import useSWR from 'swr'
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PageWrapper } from '../components/PageWrapper';



export default function Home() {

	return (
		<>
			<PageWrapper>
				{/* <ReactMarkdown children={props.allPostsData[0].fileContent} remarkPlugins={[remarkGfm]} /> */}

			</PageWrapper>
		</>
	)
}
