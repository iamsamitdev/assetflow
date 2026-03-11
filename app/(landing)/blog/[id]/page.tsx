import BlogDetail from '@/app/(landing)/blog/[id]/BlogDetail'
import { Suspense } from 'react'

export default async function BlogDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    }>
      <BlogDetail id={id} />
    </Suspense>
  )
}
