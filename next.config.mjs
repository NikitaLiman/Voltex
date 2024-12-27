/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'my-apple.com.ua',
      'prod-api.mediaexpert.pl',
      'scdn.comfy.ua',
      'cdn.comfy.ua',
      'content.rozetka.com.ua',
      'content2.rozetka.com.ua',
      'content1.rozetka.com.ua',
    ],
  },
};

export default nextConfig;
