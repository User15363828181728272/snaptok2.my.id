"use client";

import React from "react"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Download,
  Link as LinkIcon,
  Clipboard,
  Loader2,
  Video,
  Music,
  ImageIcon,
  X,
  CheckCircle2,
  Play,
  Heart,
  MessageCircle,
  Share2,
  Check,
} from "lucide-react";
import Image from "next/image";

interface VideoData {
  id: string;
  title: string;
  cover: string;
  origin_cover: string;
  duration: number;
  play: string;
  wmplay: string;
  hdplay: string;
  music: string;
  music_info: {
    title: string;
    author: string;
    cover: string;
  };
  play_count: number;
  digg_count: number;
  comment_count: number;
  share_count: number;
  author: {
    id: string;
    unique_id: string;
    nickname: string;
    avatar: string;
  };
  images?: string[];
}

export function DownloadForm() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [error, setError] = useState("");
  const [pasted, setPasted] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  const extractUrl = (text: string): string => {
    const urlMatch = text.match(
      /https?:\/\/(?:www\.)?(?:tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com)[^\s]*/i
    );
    return urlMatch ? urlMatch[0] : text.trim();
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const extractedUrl = extractUrl(text);
      setUrl(extractedUrl);
      setPasted(true);
      setError("");
      setTimeout(() => setPasted(false), 2000);
    } catch {
      setError("Tidak dapat mengakses clipboard");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Masukkan URL TikTok");
      return;
    }

    const extractedUrl = extractUrl(url);
    if (
      !extractedUrl.includes("tiktok.com") &&
      !extractedUrl.includes("vt.tiktok")
    ) {
      setError("URL tidak valid. Masukkan URL TikTok yang benar");
      return;
    }

    setIsLoading(true);
    setError("");
    setVideoData(null);

    try {
      const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(
        extractedUrl
      )}&hd=1`;

      const response = await fetch(apiUrl);
      const result = await response.json();

      if (result.code === 0 && result.data) {
        setVideoData(result.data);
      } else {
        setError(result.msg || "Gagal mengambil data video. Coba lagi.");
      }
    } catch {
      setError("Terjadi kesalahan. Pastikan URL valid dan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFile = async (
    downloadUrl: string,
    filename: string,
    type: string
  ) => {
    setDownloading(type);
    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch {
      setError("Gagal mengunduh file. Coba lagi.");
    } finally {
      setDownloading(null);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const clearResult = () => {
    setVideoData(null);
    setUrl("");
    setError("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="border-2 border-border shadow-lg">
        <CardContent className="p-4 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Paste Button */}
            <Button
              type="button"
              variant="secondary"
              onClick={handlePaste}
              className="w-full md:w-auto"
            >
              {pasted ? (
                <>
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Berhasil Ditempel!
                </>
              ) : (
                <>
                  <Clipboard className="mr-2 h-4 w-4" />
                  Tempel dari Clipboard
                </>
              )}
            </Button>

            {/* Input */}
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError("");
                  }}
                  placeholder="Tempelkan link video TikTok di sini..."
                  className="h-12 pl-10 text-base"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 px-8 text-base font-semibold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Unduh Sekarang
                  </>
                )}
              </Button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-destructive font-medium">{error}</p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setUrl("https://vt.tiktok.com/ZSYxX1X1X/")}
          className="rounded-full bg-transparent"
        >
          <LinkIcon className="mr-2 h-4 w-4" />
          Contoh Link
        </Button>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="rounded-full bg-transparent"
        >
          <a href="/guide">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Cara Kerja
          </a>
        </Button>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="rounded-full bg-transparent"
        >
          <a href="/faq">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Bantuan
          </a>
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <Card className="border-2 border-border">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">
                Sedang memproses video...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Result */}
      {videoData && !isLoading && (
        <Card className="border-2 border-border shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-bold">Hasil Download</h3>
              <Button variant="ghost" size="icon" onClick={clearResult}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Thumbnail */}
              <div className="relative w-full md:w-56 h-72 md:h-auto flex-shrink-0">
                <Image
                  src={videoData.cover || "/placeholder.svg"}
                  alt={videoData.title || "TikTok Video"}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {videoData.duration > 0 && (
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                    {Math.floor(videoData.duration / 60)}:
                    {(videoData.duration % 60).toString().padStart(2, "0")}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 p-4">
                {/* Author */}
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src={videoData.author.avatar || "/placeholder.svg"}
                    alt={videoData.author.nickname}
                    width={44}
                    height={44}
                    className="rounded-full"
                    unoptimized
                  />
                  <div>
                    <p className="font-semibold text-foreground">
                      {videoData.author.nickname}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      @{videoData.author.unique_id}
                    </p>
                  </div>
                </div>

                {/* Title */}
                <p className="text-sm text-foreground line-clamp-2 mb-3">
                  {videoData.title || "Video TikTok"}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Play className="h-4 w-4" />
                    {formatNumber(videoData.play_count || 0)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {formatNumber(videoData.digg_count || 0)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {formatNumber(videoData.comment_count || 0)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    {formatNumber(videoData.share_count || 0)}
                  </span>
                </div>

{/* Download Buttons */}
<div className="space-y-2">
{videoData.images && videoData.images.length > 0 ? (
  <div className="space-y-2">
    <p className="text-sm font-medium text-muted-foreground">
      Slideshow terdeteksi ({videoData.images.length} gambar)
    </p>
    
    {/* Container untuk Grid Gambar dengan Scroll */}
    <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto p-2 border rounded-md bg-muted/20 custom-scrollbar">
      {videoData.images.map((img, index) => (
        <button
          key={index}
          onClick={() => downloadFile(img, `tiktok_slide_${index + 1}.jpg`, `image-${index}`)}
          disabled={downloading === `image-${index}`}
          className="group relative aspect-square overflow-hidden rounded-md border border-border hover:ring-2 hover:ring-primary transition-all"
        >
          {/* Menampilkan Gambar */}
          <Image
            src={img}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover"
            unoptimized
          />
          
          {/* Overlay saat loading atau hover */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            {downloading === `image-${index}` ? (
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            ) : (
              <Download className="h-6 w-6 text-white" />
            )}
          </div>
        </button>
      ))}
    </div>
  </div>
) : (
    // Video
    <div className="flex flex-col sm:flex-row gap-2">
      {videoData.play && (
        <Button
          variant="secondary"
          onClick={() =>
            downloadFile(
              videoData.play,
              `tiktok_${videoData.id}.mp4`,
              "sd"
            )
          }
          disabled={downloading === "sd"}
          className="flex-1"
        >
          {downloading === "sd" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Video className="mr-2 h-4 w-4" />
          )}
          HD Tanpa Watermark
        </Button>
      )}
    </div>
  )}

  {/* With Watermark Option */}
  {videoData.wmplay && (
    <Button
      variant="outline"
      onClick={() =>
        downloadFile(
          videoData.wmplay,
          `tiktok_${videoData.id}_wm.mp4`,
          "wm"
        )
      }
      disabled={downloading === "wm"}
      className="w-full bg-transparent"
    >
      {downloading === "wm" ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Video className="mr-2 h-4 w-4" />
      )}
      Download dengan Watermark
    </Button>
  )}

  {/* Music Download */}
  {videoData.music && (
    <Button
      variant="outline"
      onClick={() =>
        downloadFile(
          videoData.music,
          `tiktok_${videoData.id}_audio.mp3`,
          "music"
        )
      }
      disabled={downloading === "music"}
      className="w-full bg-transparent"
    >
      {downloading === "music" ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Music className="mr-2 h-4 w-4" />
      )}
      Download Audio/Musik
    </Button>
  )}
</div>

                {/* Music Info */}
                {videoData.music_info && (
                  <div className="mt-3 p-2 bg-muted rounded-lg flex items-center gap-2">
                    <Music className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs text-muted-foreground truncate">
                      {videoData.music_info.title} -{" "}
                      {videoData.music_info.author}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
