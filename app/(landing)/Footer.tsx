import Link from "next/link"

export default function Footer() {
  return (
    <footer className="min-w-full px-8 py-10 border-t dark:bg-gray-800 dark:text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        {/* Column 1 - Brand */}
        <div>
          <h3 className="text-lg font-bold mb-3">AssetFlow</h3>
          <p className="text-sm text-muted-foreground">
            ระบบจัดการครุภัณฑ์อัจฉริยะ ช่วยให้การติดตามและบริหารสินทรัพย์เป็นเรื่องง่าย
          </p>
        </div>

        {/* Column 2 - Links */}
        <div>
          <h3 className="text-lg font-bold mb-3">ลิงก์</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-primary">หน้าแรก</Link></li>
            <li><Link href="/about" className="hover:text-primary">เกี่ยวกับเรา</Link></li>
            <li><Link href="/contact" className="hover:text-primary">ติดต่อเรา</Link></li>
          </ul>
        </div>

        {/* Column 3 - Contact */}
        <div>
          <h3 className="text-lg font-bold mb-3">ติดต่อ</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>อีเมล: info@assetflow.com</li>
            <li>โทร: 02-xxx-xxxx</li>
            <li>ที่อยู่: กรุงเทพมหานคร</li>
          </ul>
        </div>

      </div>

      <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
        &copy; 2026 AssetFlow. All rights reserved.
      </div>
    </footer>
  )
}
