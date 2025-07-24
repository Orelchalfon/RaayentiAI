import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'he'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/(he|en)/:path*'
  ]
};