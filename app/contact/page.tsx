import ContactContent from "./ContactContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact",
    description: "This is contact page",
    keywords: ["contact", "page", "assetflow"],
}

export default function ContactPage() {
    return <ContactContent />
}