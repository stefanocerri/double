import { withAuth } from "next-auth/middleware";

// middleware is applied to all routes, use conditionals to select

const removeTrailingSlash = (url: string) => {
    if (url === '/') return '/'
    return url.at(-1) === '/' ? url.slice(0, -1) : url
}

//Se ti serve non avere determinate pagine sotto l'auth devi scriverle in questo arrey
const publicRoutes = ["/ciao"]

export default withAuth(
    function middleware(req) { },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                // Se le rotte non sono pubbliche manda al login.
                const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);

                if (isPublicRoute) {
                    return true
                } else if(token !== null) {
                    return true
                }

                return false
            }
        },
    }
)