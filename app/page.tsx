import { authOptions } from "@/config/auth.config";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'


export default async function Home() {
  const session = await getServerSession(authOptions);

  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: {
          Authorization: `Bearer ${session.accessToken}`
      },
  })
  const playlists = await response.json()

  if (!session || !session.user ) return <>non loggato</>
  return  <>
  {session.accessToken}<br/>
  {JSON.stringify(playlists.items)}
  </>
}
