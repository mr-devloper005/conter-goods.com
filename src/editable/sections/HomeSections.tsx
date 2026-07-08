import Link from 'next/link'
import { Search, Sparkles, Star } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type TaskStat = { key: TaskKey; label: string; count: number }

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
  taskStats?: TaskStat[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

function getContent(post?: SitePost | null) {
  return post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function excerpt(post?: SitePost | null, limit = 145) {
  const content = getContent(post)
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = stripHtml(raw)
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function category(post?: SitePost | null, fallback = 'Guide') {
  const content = getContent(post)
  return (typeof content.category === 'string' && content.category.trim()) || post?.tags?.[0] || fallback
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const image = getEditablePostImage(post)
    if (!image || image.includes('placeholder') || seen.has(image)) continue
    seen.add(image)
    out.push(image)
    if (out.length >= max) break
  }
  return out
}

function Stars() {
  return (
    <span className="inline-flex items-center gap-[3px] text-[var(--slot4-accent)]">
      {[0, 1, 2, 3, 4].map((item) => <Star key={item} className="h-4 w-4 fill-current" />)}
    </span>
  )
}

function FeaturedCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group grid overflow-hidden rounded-[14px] bg-white shadow-[0_22px_60px_rgba(24,20,35,0.08)] transition duration-500 hover:-translate-y-1 md:grid-cols-[0.95fr_1.05fr]">
      <div className="relative min-h-[330px] overflow-hidden bg-[var(--slot4-media-bg)] md:min-h-[470px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
        <span className="w-fit rounded-full bg-[#fff1e7] px-4 py-2 text-xs font-bold text-[#24175f]">
          {category(post, 'Featured')}
        </span>
        <h2 className="editable-display mt-6 text-balance text-4xl font-semibold leading-[1.05] text-[#32313a] sm:text-5xl">
          {post.title}
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--slot4-muted-text)]">{excerpt(post, 190)}</p>
      </div>
    </Link>
  )
}

function ImageFirstCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block w-[290px] shrink-0 overflow-hidden rounded-[10px] bg-white shadow-[0_18px_46px_rgba(24,20,35,0.08)] transition duration-500 hover:-translate-y-1 sm:w-[340px]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" />
        <span className="absolute left-4 top-4 rounded-full bg-[var(--slot4-accent)] px-3 py-1 text-[11px] font-bold uppercase text-white">{category(post)}</span>
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">No. {String(index + 1).padStart(2, '0')}</p>
        <h3 className="editable-display mt-2 line-clamp-2 text-2xl font-semibold leading-tight text-[#171423]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{excerpt(post, 110)}</p>
      </div>
    </Link>
  )
}

function CompactCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex items-start gap-4 rounded-[10px] border border-[var(--editable-border)] bg-white p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(24,20,35,0.08)]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-sm font-bold text-[var(--slot4-accent)]">{index + 1}</span>
      <span className="min-w-0">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{category(post)}</span>
        <strong className="editable-display mt-1 block line-clamp-2 text-xl leading-tight text-[#171423]">{post.title}</strong>
        <span className="mt-2 block line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{excerpt(post, 90)}</span>
      </span>
    </Link>
  )
}

function HorizontalCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group grid overflow-hidden rounded-[10px] border border-[var(--editable-border)] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(24,20,35,0.08)] sm:grid-cols-[180px_minmax(0,1fr)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)] sm:aspect-auto">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
      </div>
      <div className="p-5">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{category(post)}</span>
        <h3 className="editable-display mt-2 line-clamp-2 text-2xl font-semibold leading-tight text-[#171423]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{excerpt(post, 120)}</p>
      </div>
    </Link>
  )
}

function EditorialListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex gap-4 border-b border-[var(--editable-border)] py-5">
      <span className="editable-display text-3xl font-semibold text-[var(--slot4-accent)]">{String(index + 1).padStart(2, '0')}</span>
      <span className="min-w-0">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)]">{category(post)}</span>
        <strong className="editable-display mt-1 block line-clamp-2 text-2xl leading-tight text-[#171423] group-hover:text-[var(--slot4-accent)]">{post.title}</strong>
      </span>
    </Link>
  )
}

export function EditableHomeHero({ posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool)

  return (
    <section className="relative overflow-hidden">
      <div className="grid bg-white lg:grid-cols-2 lg:items-stretch">
        <div className="relative min-h-[380px] max-h-[560px] overflow-hidden bg-[var(--slot4-media-bg)] sm:min-h-[520px]">
          <EditableHeroCollage images={heroImages} />
          {!heroImages.length ? <div className="absolute inset-0 bg-[linear-gradient(135deg,#dcd8f7,#ffffff)]" /> : null}
        </div>
        <div className="flex min-h-[520px] max-h-[560px] items-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#fff1e7] px-4 py-2 text-sm font-bold text-[#24175f]">
              {pagesContent.home.hero.badge} <Sparkles className="h-4 w-4 text-[#ff9d4d]" />
            </span>
            <h1 className="editable-display mt-6 text-balance text-5xl font-semibold leading-[1.03] text-[#32313a] sm:text-6xl">
              {pagesContent.home.hero.title.join(' ')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.home.hero.description}</p>
            <form action="/search" className="mt-8 flex w-full max-w-xl overflow-hidden rounded-[10px] border border-[var(--editable-border)] bg-white shadow-[0_18px_48px_rgba(24,20,35,0.08)]">
              <div className="flex min-w-0 flex-1 items-center gap-2.5 px-4">
                <Search className="h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
                <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="min-w-0 flex-1 bg-transparent py-4 text-sm font-semibold outline-none placeholder:text-[var(--slot4-muted-text)]" />
              </div>
              <button className="bg-[var(--slot4-accent)] px-5 text-sm font-bold text-white transition hover:brightness-95 sm:px-7">Search</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  if (!pool.length) return null
  const featured = pool[0]
  const rail = pool.slice(1, 9)
  const doubled = [...rail, ...rail]
  return (
    <section className="bg-[var(--slot4-warm)]">
      <div className={`${container} py-16 sm:py-20`}>
        <div>
          <FeaturedCard post={featured} href={postHref(primaryTask, featured, primaryRoute)} />
        </div>
        {rail.length ? (
          <div className="mt-10 overflow-hidden">
            <div className="editable-auto-slider gap-6 pr-6">
              {doubled.map((post, index) => <ImageFirstCard key={`${post.id || post.slug}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index % rail.length} />)}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const compact = pool.slice(0, 6)
  const horizontal = pool.slice(6, 10)
  const editorial = pool.slice(10, 15)
  if (!pool.length) return null

  return (
    <section className="bg-white">
      <div className={`${container} grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr]`}>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">For quick scanning</p>
          <h2 className="editable-display mt-3 text-4xl font-semibold text-[#171423]">Guides worth reading, businesses worth knowing.</h2>
          <div className="mt-8 grid gap-4">
            {compact.map((post, index) => <CompactCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
          </div>
        </div>
        <div className="grid gap-8">
          <div className="grid gap-5">
            {horizontal.map((post) => <HorizontalCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
          </div>
          {editorial.length ? (
            <div className="rounded-[10px] border border-[var(--editable-border)] bg-[var(--slot4-warm)] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">Editorial list</p>
                  <h3 className="editable-display mt-2 text-3xl font-semibold text-[#171423]">More to compare</h3>
                </div>
                <Stars />
              </div>
              <div className="mt-4">
                {editorial.map((post, index) => <EditorialListCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className="bg-white">
      <div className={`${container} py-16 sm:py-20`}>
        <div className="mx-auto max-w-4xl rounded-[10px] border border-[var(--editable-border)] bg-white px-6 py-12 text-center shadow-[0_22px_58px_rgba(24,20,35,0.06)] sm:px-10">
          <h2 className="editable-display text-4xl font-semibold text-[#171423]">Ready to add something useful?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">
            Share an article or list your business for the {SITE_CONFIG.name} audience.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/create" className="inline-flex items-center gap-2 rounded-[10px] bg-[var(--slot4-accent)] px-7 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5">
              Create a post
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-[10px] border border-[var(--editable-border)] px-7 py-3 text-sm font-bold text-[#171423] transition hover:border-[var(--slot4-accent)]">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
