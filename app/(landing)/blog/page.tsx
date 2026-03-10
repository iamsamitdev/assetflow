import BlogContent from "@/app/(landing)/blog/BlogContent"

import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Blog",
    description: "This is blog page",
    keywords: ["blog", "page", "assetflow"],
}

export default function BlogPage() {
  return <BlogContent />
}
