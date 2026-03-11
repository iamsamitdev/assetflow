import { getPosts } from "@/actions/postActions"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, UserCircle2 } from "lucide-react"
import Link from "next/link"
import { connection } from "next/server"

export default async function BlogContent() {
  await connection()
  const posts = await getPosts()

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 px-4 py-1 text-sm font-medium mb-4">
            บทความ
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            บทความ<span className="text-emerald-500">ล่าสุด</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            บทความและข่าวสารเกี่ยวกับการจัดการครุภัณฑ์อัจฉริยะ
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="h-full hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300 group">
                <CardContent className="flex flex-col h-full pt-6">
                  <h2 className="text-lg font-semibold mb-3 group-hover:text-emerald-500 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground flex-1 line-clamp-3 mb-6">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground border-t pt-4">
                    {post.user?.image ? (
                      <img
                        src={post.user.image}
                        alt={post.user.name ?? ""}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircle2 className="w-5 h-5" />
                    )}
                    <span>{post.user?.name ?? "ไม่ระบุผู้เขียน"}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <CalendarDays className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>ยังไม่มีบทความในขณะนี้</p>
          </div>
        )}

      </div>
    </section>
  )
}
