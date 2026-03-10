import { getPosts } from "@/actions/postActions"
import Link from "next/link"

export default async function BlogContent() {

  const posts = await getPosts()

  return (
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <p className="text-lg text-muted-foreground mb-4">
          บทความและข่าวสารเกี่ยวกับการจัดการครุภัณฑ์อัจฉริยะ
        </p>
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="p-4 border rounded-lg hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </h2>
              <p className="text-base mb-3">{post.content}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {post.user?.image && (
                  <img
                    src={post.user.image}
                    alt={post.user.name ?? ""}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span>{post.user?.name ?? "ไม่ระบุผู้เขียน"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
