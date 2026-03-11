import { getPostById } from "@/actions/postActions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, UserCircle2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { connection } from "next/server"

export default async function BlogDetail(
    { id }: { id: string }
) {
  await connection()
  const post = await getPostById(id)

  if (!post) {
    notFound()
  }

  return (
    <article className="py-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Back button */}
        <Button variant="ghost" size="sm" className="mb-8 -ml-2" asChild>
          <Link href="/blog">
            <ArrowLeft className="w-4 h-4 mr-1" />
            กลับไปยังบทความ
          </Link>
        </Button>

        {/* Badge */}
        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 mb-4">
          บทความ
        </Badge>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{post.title}</h1>

        {/* Author */}
        <div className="flex items-center gap-3 mb-10 pb-8 border-b">
          {post.user?.image ? (
            <img
              src={post.user.image}
              alt={post.user.name ?? ""}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <UserCircle2 className="w-10 h-10 text-muted-foreground" />
          )}
          <div>
            <p className="text-sm font-medium">{post.user?.name ?? "ไม่ระบุผู้เขียน"}</p>
            <p className="text-xs text-muted-foreground">ผู้เขียน</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-base leading-8 text-foreground/80 whitespace-pre-wrap">{post.content}</p>
        </div>

      </div>
    </article>
  )
}
