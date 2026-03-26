import Link from 'next/link'

interface FooterProps {
  brandName: string
  links?: { label: string; href: string }[]
  copyright?: string
}

export function Footer({ brandName, links, copyright }: FooterProps) {
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-5 text-sm text-muted-foreground">
        <span>{copyright ?? `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`}</span>
        {links && (
          <nav className="flex gap-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </footer>
  )
}
