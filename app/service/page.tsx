import ServiceContent from '@/app/service/ServiceContent'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Service",
    description: "This is service page",
    keywords: ["service", "page", "assetflow"],
}

export default function ServicePage() {
  return <ServiceContent />
}
