import { useEffect, useState } from 'react';
import useSWR from 'swr'
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PageWrapper } from '../components/PageWrapper';
import getMember from './api/getMember';
import { useState, useEffect } from 'react';


export default function Home(props) {
  const [member, setMember] = useState(0);

  useEffect(async function () {
    setMember(await getMember());
  }, []);

  return (
    <>
      <PageWrapper>
        <ReactMarkdown
          children={props.allPostsData[0].fileContent}
          remarkPlugins={[remarkGfm]}
        />
      </PageWrapper>
    </>
  );
}

export async function getStaticProps() {
  const allPostsData = getPublicDocs();
  return {
    props: {
      allPostsData,
    },
  };
}

