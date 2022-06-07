import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Post from '../components/Post';
import { sortByDate } from '../utils';

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
        <meta name="blog of technology" content="blog" />
      </Head>

      <div className="posts">
        {posts.map((post) => (
          <Post key={post.formatter.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // Get files from directory to post
  const files = fs.readdirSync(path.join('post'));

  // Get slug and frontmatter from post
  const posts = files.map((fileName) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('post', fileName),
      'utf-8'
    );
    const { data: formatter } = matter(markdownWithMeta);
    return {
      slug: fileName.replace('.md', ''),
      formatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
