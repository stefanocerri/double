import { AuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify"
import 'next-auth';


type Token = {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
}



const scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-currently-playing",
    "user-modify-playback-state",
    "user-top-read",
    "user-read-recently-played",
].join(",")

const params = {
    scope: scopes
}

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + new URLSearchParams(params).toString();


async function refreshAccessToken(token:Token) {
    const params = new URLSearchParams()
    params.append("grant_type", "refresh_token")
    params.append("refresh_token", token.refreshToken)
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_SECRET).toString('base64'))
        },
        body: params
    })
    const data = await response.json()
    return {
        ...token,
        accessToken: data.access_token,
        refreshToken: data.refresh_token ?? token.refreshToken,
        accessTokenExpires: Date.now() + data.expires_in * 1000
    }
}

export const authOptions: AuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.AUTH_SPOTIFY_ID as string,
            clientSecret: process.env.AUTH_SPOTIFY_SECRET as string,
            authorization: LOGIN_URL
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //     signIn:"/login"
    // },
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
                token.accessTokenExpires = account.expires_at
                return token
            }
            // access token has not expired
            if (token.accessTokenExpires && typeof token.accessTokenExpires === 'number' && Date.now() < token.accessTokenExpires * 1000) {
                return token;
            }

            // access token has expired
            return await refreshAccessToken(token as Token)
        },

        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            //@ts-ignore
            session.accessToken = token.accessToken
            return session
        }
    },
    debug: true,
};