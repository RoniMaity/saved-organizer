import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/jwt';
import prisma from '@/lib/prisma';
import * as cheerio from 'cheerio';
import { categorize } from '@/lib/ai';

// In-memory rate limiter (max 10 requests per minute per IP)
const rateLimit = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const limit = 10;
  const windowMs = 60 * 1000;
  
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }
  
  const data = rateLimit.get(ip);
  if (now > data.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }
  
  if (data.count >= limit) {
    return true;
  }
  
  data.count += 1;
  return false;
}

export async function GET(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const user = verifyJWT(token);
  if (!user) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  try {
    const items = await prisma.item.findMany({
      where: { userId: user.userId },
      include: { tags: true },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json({ posts: items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  
  if (checkRateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded. Try again in a minute." }, { status: 429 });
  }

  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const user = verifyJWT(token);
  if (!user) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  try {
    const body = await req.json();
    let type = body.type;
    let content = body.content || body.inputUrl;
    
    if (!type) {
       type = (content.startsWith("http://") || content.startsWith("https://")) ? "URL" : "TEXT";
    }
    
    let title = null;
    let description = null;
    let imageUrl = null;
    
    let dataForGrok = content;

    if (type === "URL") {
       try {
         const response = await fetch(content, { headers: { 'User-Agent': 'Unidrop-Bot/1.0' } });
         const html = await response.text();
         const $ = cheerio.load(html);
         
         title = $('title').text() || $('meta[property="og:title"]').attr('content') || null;
         description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || null;
         imageUrl = $('meta[property="og:image"]').attr('content') || null;
         
         dataForGrok = `URL: ${content}\nTitle: ${title}\nDescription: ${description}`;
       } catch (err) {
         console.warn("Failed to scrape URL:", err);
       }
    }
    
    // Call AI
    const aiResultRaw = await categorize(dataForGrok);
    let summary = null;
    let tags = [];
    
    try {
      // Expecting JSON { "summary": "...", "tags": ["a", "b"] }
      const parsed = JSON.parse(aiResultRaw);
      summary = parsed.summary;
      tags = parsed.tags || [];
    } catch (e) {
      console.warn("AI didn't return valid JSON", aiResultRaw);
      // Fallback
      tags = [aiResultRaw.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()];
    }

    // Prisma Transaction to save and upsert tags
    const newItem = await prisma.item.create({
      data: {
        userId: user.userId,
        type: type,
        content: content,
        title: title,
        description: description,
        summary: summary,
        imageUrl: imageUrl,
        tags: {
          connectOrCreate: tags.map(t => ({
             where: { name: t.toLowerCase() },
             create: { name: t.toLowerCase() }
          }))
        }
      },
      include: { tags: true }
    });

    return NextResponse.json({ item: newItem }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
