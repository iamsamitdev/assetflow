import { getPostById } from "@/actions/postActions"
import { notFound } from "next/navigation"

export default async function BlogDetail(
    { id }: { id: string }
) {
  const post = await getPostById(id)

  if (!post) {
    notFound()
  }

  return (
    <article className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-3 mb-6">
            {post.user?.image && (
                <img src={post.user.image} alt={post.user.name ?? ""} className="w-8 h-8 rounded-full" />
            )}
            <span className="text-sm text-muted-foreground">{post.user?.name ?? "ไม่ระบุผู้เขียน"}</span>
        </div>
        <p className="text-lg text-muted-foreground">{post.content}</p>
      </div>
    </article>
  )
}
