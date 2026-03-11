import BlogContent from "@/app/(landing)/blog/BlogContent"
import { Suspense } from "react"

import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Blog",
    description: "This is blog page",
    keywords: ["blog", "page", "assetflow"],
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    }>
      <BlogContent />
    </Suspense>
  )
}
