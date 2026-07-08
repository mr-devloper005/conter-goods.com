import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Conter Goods articles and business listings',
      description: 'Explore practical articles, professional resources, and business listings through a calm discovery experience.',
      openGraphTitle: 'Conter Goods articles and business listings',
      openGraphDescription: 'Discover useful articles, professional resources, and business listings through a refined public directory.',
      keywords: ['business listings', 'articles', 'professional resources', 'company directory'],
    },
    hero: {
      badge: 'Conter Goods',
      title: ['Useful reads, reliable listings,', 'and room to compare.'],
      description: 'In-depth articles and verified business listings in one clear, easy-to-search place.',
      primaryCta: { label: 'Read latest stories', href: '/article' },
      secondaryCta: { label: 'Explore listings', href: '/listing' },
      searchPlaceholder: 'Search articles, companies, services, and topics',
      focusLabel: 'Focus',
      featureCardBadge: 'latest cover rotation',
      featureCardTitle: 'Latest posts shape the visual identity of the homepage.',
      featureCardDescription: 'Recent images and stories stay at the center of the experience without changing any core platform behavior.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for readers, professionals, businesses, and customers.',
      paragraphs: [
        'Conter Goods brings article-style research and structured business discovery into one place.',
        'Readers can move from practical guidance to relevant listings without losing context.',
        'Businesses, startups, professionals, customers, students, and researchers can all browse at their own pace.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Reading-first homepage with stronger emphasis on stories and imagery.',
        'Connected sections for in-depth articles and verified business listings.',
        'Cleaner browsing rhythm designed to make exploration feel easier.',
        'Lightweight interactions that keep the experience fast and readable.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See business listings', href: '/listing' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Explore articles and business listings through one connected experience.',
      description: 'Move between practical reads, company profiles, services, and resources through one clearer visual system.',
      primaryCta: { label: 'Browse Articles', href: '/article' },
      secondaryCta: { label: 'Contact Sales', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A calmer, clearer way to explore content.',
    description: `${slot4BrandConfig.siteName} is built to make long-form reading, visual discovery, and supporting resources feel like one unified experience.`,
    paragraphs: [
      'Instead of splitting everything into disconnected pages, the platform keeps related content easy to move through and easy to understand.',
      'Whether someone starts with an article, listing, image post, or resource page, they can continue exploring without losing context.',
    ],
    values: [
      {
        title: 'Reading-first experience',
        description: 'We prioritize clarity, pacing, and structure so people can read, browse, and discover without noise.',
      },
      {
        title: 'Connected content surfaces',
        description: 'Articles, visual posts, listings, resources, and profiles stay connected so discovery feels natural across the site.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'We focus on clean navigation and clear page structure to help visitors find useful content faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'A support page that matches the product, not a generic contact form.',
    description: 'Tell us what you are trying to publish, fix, or launch. We will route it through the right lane instead of forcing every request into the same support bucket.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search articles, business listings, categories, and resources across Conter Goods.',
    },
    hero: {
      badge: 'Search Conter Goods',
      title: 'Find articles, businesses, services, and resources faster.',
      description: 'Use keywords, categories, and content types to discover useful posts from every active section.',
      placeholder: 'Search by company, topic, service, category, or title',
    },
    resultsTitle: 'Latest articles and listings',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for every active section.',
      description: 'Choose the content type, add details, and prepare a clean post with images, links, summary, and body content.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your publishing space.',
      description: 'Login to continue browsing, managing submissions, and creating new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
