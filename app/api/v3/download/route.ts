// app/api/v3/download/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

// ── Douyin helpers ────────────────────────────────────────────────────────────
const DOUYIN_BASE = "https://api.seekin.ai/ikool/media/download";
const DOUYIN_SECRET = "3HT8hjE79L";

function sortAndStringify(obj: Record<string, string>): string {
  return Object.keys(obj)
    .sort()
    .map((k) => `${k}=${obj[k]}`)
    .join("&");
}

function generateSign(lang: string, timestamp: string, body: Record<string, string> = {}): string {
  const raw = `${lang}${timestamp}${DOUYIN_SECRET}${sortAndStringify(body)}`;
  return createHash("sha256").update(raw).digest("hex");
}

function buildDouyinHeaders(body: Record<string, string> = {}): Record<string, string> {
  const lang = "en";
  const timestamp = Date.now().toString();
  const sign = generateSign(lang, timestamp, body);
  return {
    accept: "*/*",
    "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/json",
    lang,
    origin: "https://www.seekin.ai",
    referer: "https://www.seekin.ai/",
    "user-agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
    sign,
    timestamp,
  };
}

// ── Main handler ──────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const platform = searchParams.get("platform")?.toLowerCase();
  const url = searchParams.get("url");

  // Validate
  if (!platform || !["tiktok", "douyin"].includes(platform)) {
    return NextResponse.json(
      {
        success: false,
        error: "Parameter 'platform' wajib diisi. Nilai yang valid: tiktok | douyin",
        example: [
          "https://www.snaptok.my.id/api/v3/download?platform=tiktok&url=https://vt.tiktok.com/xxx",
          "https://www.snaptok.my.id/api/v3/download?platform=douyin&url=https://www.douyin.com/video/xxx",
        ],
      },
      { status: 400 }
    );
  }

  if (!url) {
    return NextResponse.json(
      {
        success: false,
        error: "Parameter 'url' wajib diisi.",
        example: `https://www.snaptok.my.id/api/v3/download?platform=${platform}&url=MASUKKAN_URL_DISINI`,
      },
      { status: 400 }
    );
  }

  // ── TikTok ────────────────────────────────────────────────────────────────
  if (platform === "tiktok") {
    const isTiktok =
      url.includes("tiktok.com") ||
      url.includes("vt.tiktok") ||
      url.includes("vm.tiktok");

    if (!isTiktok) {
      return NextResponse.json(
        { success: false, error: "URL bukan URL TikTok yang valid." },
        { status: 400 }
      );
    }

    try {
      const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
      const res = await fetch(apiUrl);
      const json = await res.json();

      if (json.code !== 0 || !json.data) {
        return NextResponse.json(
          { success: false, error: json.msg || "Gagal mengambil data video TikTok." },
          { status: 400 }
        );
      }

      const d = json.data;
      return NextResponse.json({
        success: true,
        platform: "tiktok",
        data: {
          id: d.id,
          title: d.title,
          cover: d.cover,
          duration: d.duration,
          author: {
            nickname: d.author?.nickname,
            unique_id: d.author?.unique_id,
            avatar: d.author?.avatar,
          },
          stats: {
            play_count: d.play_count,
            digg_count: d.digg_count,
            comment_count: d.comment_count,
            share_count: d.share_count,
          },
          download: {
            video_hd: d.hdplay ?? null,
            video_sd: d.play ?? null,
            video_watermark: d.wmplay ?? null,
            audio: d.music ?? null,
            images: d.images ?? null,
          },
        },
      });
    } catch {
      return NextResponse.json(
        { success: false, error: "Terjadi kesalahan server saat mengambil data TikTok." },
        { status: 500 }
      );
    }
  }

  // ── Douyin ────────────────────────────────────────────────────────────────
  if (platform === "douyin") {
    const isDouyin =
      url.includes("douyin.com") || url.includes("v.douyin");

    if (!isDouyin) {
      return NextResponse.json(
        { success: false, error: "URL bukan URL Douyin yang valid." },
        { status: 400 }
      );
    }

    try {
      const body = { url };
      const headers = buildDouyinHeaders(body);

      const res = await fetch(DOUYIN_BASE, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const json = await res.json();
      const { msg, data } = json;

      if (!data) {
        return NextResponse.json(
          { success: false, error: msg || "Gagal mengambil data video Douyin." },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        platform: "douyin",
        data: {
          title: data.title ?? "",
          cover: data.imageUrl ?? "",
          download: {
            video: data.medias?.[0]?.url ?? null,
            audio: data.music ?? null,
          },
        },
      });
    } catch {
      return NextResponse.json(
        { success: false, error: "Terjadi kesalahan server saat mengambil data Douyin." },
        { status: 500 }
      );
    }
  }
}
