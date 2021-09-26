import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function renderTest(markdown) {
  const getData = async () => {
    // membership = getMember();
    const membership = true;
    let body = { membership };
    body = JSON.stringify(body);

    let myHeaders = new Headers();
    const myInit = {
      method: 'POST',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
      body,
      membership: true,
    };
    const url = '/api/test';
    const response = await fetch(url, myInit);
    const resJson = await response.json();
    const theNumberFive = 5;
    console.log(theNumberFive);
    return theNumberFive;
  };

  markdown = 'Placeholder';

  return (
    <div>
      {<ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />}
    </div>
  );
}
