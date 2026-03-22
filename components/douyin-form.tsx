"use client";

import React, { useState } from "react";
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
  X,
  CheckCircle2,
  Check,
} from "lucide-react";
import Image from "next/image";

interface DouyinData {
  title: string;
  imageUrl: string;
  url: string | null;
  music?: string | null;
}

export function DouyinForm() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<DouyinData | null>(null);
  const [error, setError] = useState("");
  const [pasted, setPasted] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  const extractUrl = (text: string): string => {
    const urlMatch = text.match(
      /https?:\/\/(?:www\.)?(?:douyin\.com|v\.douyin\.com)[^\s]*/i
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
      setError("Masukkan URL Douyin");
      return;
    }

    const extractedUrl = extractUrl(url);
    if (
      !extractedUrl.includes("douyin.com") &&
      !extractedUrl.includes("v.douyin")
    ) {
      setError("URL tidak valid. Masukkan URL Douyin yang benar");
      return;
    }

    setIsLoading(true);
    setError("");
    setVideoData(null);

    try {
      const res = await fetch("/api/douyin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: extractedUrl }),
      });

      const json = await res.json();

      if (!res.ok || json.error) {
        setError(json.error || "Gagal mengambil data video. Coba lagi.");
        return;
      }

      setVideoData(json);
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

  const clearResult = () => {
    setVideoData(null);
    setUrl("");
    setError("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="border-2 border-red-200 shadow-lg">
        <CardContent className="p-4 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Paste Button */}
            <Button
              type="button"
              variant="secondary"
              onClick={handlePaste}
              className="w-full md:w-auto bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
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
                <LinkIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError("");
                  }}
                  placeholder="Tempelkan link video Douyin di sini..."
                  className="h-12 pl-10 text-base border-red-200 focus-visible:ring-red-400"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 px-8 text-base font-semibold bg-red-600 hover:bg-red-700 text-white"
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
              <p className="text-sm text-red-600 font-medium">{error}</p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setUrl("https://www.douyin.com/video/7357714141391506688")
          }
          className="rounded-full bg-transparent border-red-200 text-red-600 hover:bg-red-50"
        >
          <LinkIcon className="mr-2 h-4 w-4" />
          Contoh Link
        </Button>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="rounded-full bg-transparent border-red-200 text-red-600 hover:bg-red-50"
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
          className="rounded-full bg-transparent border-red-200 text-red-600 hover:bg-red-50"
        >
          <a href="/faq">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Bantuan
          </a>
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <Card className="border-2 border-red-200">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-red-500" />
              <p className="mt-4 text-gray-500">Sedang memproses video...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Result */}
      {videoData && !isLoading && (
        <Card className="border-2 border-red-200 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 border-b border-red-100">
              <h3 className="text-lg font-bold">Hasil Download</h3>
              <Button variant="ghost" size="icon" onClick={clearResult}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Thumbnail */}
              {videoData.imageUrl && (
                <div className="relative w-full md:w-56 h-72 md:h-auto flex-shrink-0">
                  <Image
                    src={videoData.imageUrl}
                    alt={videoData.title || "Douyin Video"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              {/* Info */}
              <div className="flex-1 p-4">
                <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                  {videoData.title || "Video Douyin"}
                </p>

                <div className="space-y-2">
                  {videoData.url && (
                    <Button
                      onClick={() =>
                        downloadFile(videoData.url!, `douyin_video.mp4`, "video")
                      }
                      disabled={downloading === "video"}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      {downloading === "video" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Video className="mr-2 h-4 w-4" />
                      )}
                      Download Video Tanpa Watermark
                    </Button>
                  )}

                  {videoData.music && (
                    <Button
                      variant="outline"
                      onClick={() =>
                        downloadFile(videoData.music!, `douyin_audio.mp3`, "music")
                      }
                      disabled={downloading === "music"}
                      className="w-full bg-transparent border-red-200 text-red-600 hover:bg-red-50"
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
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
