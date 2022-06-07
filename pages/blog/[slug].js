import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Link from 'next/link';
import Image from 'next/image';

const PostPage = ({
  frontmatter: { title, date, cover_image },
  slug,
  content,
}) => {
  return (
    <div className="container">
      <Link href="/">
        <a className="btn btn-back">Go Back</a>
      </Link>
      <div className="card card-page">
        <h1 className="post-title">{title}</h1>
        <div className="post-date">{date}</div>
        <Image src={cover_image} alt={title} width={400} height={300} />
        <div className="post-body">
          <div
            dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('post'));
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('post', `${slug}.md`),
    'utf-8'
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);

  return { props: { frontmatter, slug, content } };
}
