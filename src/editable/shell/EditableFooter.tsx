'use client'

import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-full w-full scale-[2.4] object-cover" />
            </span>
            <span className="editable-display text-xl font-semibold tracking-[0.01em]">{SITE_CONFIG.name}</span>
          </Link>
        </div>

        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white">Site</h3>
          <div className="mt-4 grid gap-2">
            {[
              ['Home', '/'],
              ['About', '/about'],
              ['Contact', '/contact'],
              ...(session ? [] : [['Login', '/login'], ['Sign up', '/signup']]),
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-medium text-white/62 transition hover:text-white">{label}</Link>
            ))}
            {session ? <button type="button" onClick={logout} className="inline-flex items-center gap-2 text-left text-sm font-medium text-white/62 transition hover:text-white"><LogOut className="h-4 w-4" /> Logout</button> : null}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs font-medium tracking-[0.12em] text-white/50">
        © {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
