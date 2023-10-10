import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
    // Ensure that locale specific sign-in pages are public
    publicRoutes: ['/', '/:locale/sign-in', '/api/webhooks/user'],
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
