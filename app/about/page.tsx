// Server Side Component
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "About",
    description: "This is about page",
    keywords: ["about", "page", "assetflow"],
}

import AboutContent from "./AboutContent"

export default function AboutPage() {
  return <AboutContent />
}
