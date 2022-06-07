import Link from 'next/link';
import Image from 'next/image';

const Post = ({ post }) => {
  return (
    <div className="card">
      <div className="center-img">
        <Image
          src={post.formatter.cover_image}
          alt={post.formatter.title}
          width={300}
          height={200}
        />
      </div>

      <div className="post-date">Posted on {post.formatter.date}</div>
      <h3>{post.formatter.title}</h3>
      <p>{post.formatter.excerpt}</p>
      <Link href={`/blog/${post.slug}`}>
        <a className="btn"> Read More ...</a>
      </Link>
    </div>
  );
};

export default Post;
