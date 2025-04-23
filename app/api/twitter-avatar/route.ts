// /app/api/twitter-avatar/route.ts

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return new NextResponse('Missing username', { status: 400 });
  }

  const twitterAvatarUrl = `https://twitter.com/${username}/profile_image?size=original`;

  try {
    const response = await fetch(twitterAvatarUrl, {
      redirect: 'follow',
    });

    if (!response.ok || !response.body) {
      return new NextResponse('Failed to fetch avatar', { status: 500 });
    }

    return new NextResponse(response.body, {
      headers: {
        'Content-Type': response.headers.get('content-type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400', // cache 1 hari
      },
    });
} catch (error) {
  console.error('Error fetching avatar:', error);
  return new NextResponse('Error fetching avatar', { status: 500 });
}

}
