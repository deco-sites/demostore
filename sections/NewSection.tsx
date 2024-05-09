interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
}

interface Props {
  /**
   * @description The list of blog posts to display.
   */
  blogPosts?: BlogPost[];
}

export default function BlogPostSection({
  blogPosts = [
    {
      title: "Item of the Summer",
      excerpt: "Lorem ipsum...",
      author: "Por Fulano Beltrano",
      date: "October 30, 2023",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Another Blog Post",
      excerpt: "Lorem ipsum...",
      author: "By John Doe",
      date: "November 15, 2023",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "New Adventures",
      excerpt: "Lorem ipsum...",
      author: "Jane Smith",
      date: "December 5, 2023",
      image: "https://via.placeholder.com/150",
    },
  ],
}: Props) {
  return (
    <section class="bg-gray-100 p-4 sm:p-8">
      <h2 class="text-3xl text-center font-semibold mb-6">Blogposts</h2>

      <div class="flex flex-col sm:flex-row items-stretch gap-4">
        {blogPosts.map((post, index) => (
          <article
            key={index}
            class="bg-white p-4 rounded-md shadow-md w-full sm:w-1/3"
          >
            <img
              src={post.image}
              alt={post.title}
              class="w-full h-40 object-cover mb-4"
            />
            <h3 class="text-lg font-semibold mb-2">{post.title}</h3>
            <p class="text-sm mb-2">{post.excerpt}</p>
            <div class="text-gray-600 mb-1">{post.author}</div>
            <div class="text-gray-400">{post.date}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
