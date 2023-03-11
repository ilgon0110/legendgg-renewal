import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Seo() {
  const router = useRouter();
  return (
    <Head>
      <title>{router.route.replace('/', '')}</title>
    </Head>
  );
}
