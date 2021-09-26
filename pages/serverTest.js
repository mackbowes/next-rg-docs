export async function getServerSideProps(context) {
  const res = await fetch('/api/test');
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { markdown: 'Sucessful test!' }, // will be passed to the page component as props
  };
}
