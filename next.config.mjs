/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "./dist", // Changes the build output directory to `./dist/`.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/**", // You can customize this path if needed
      },
    ],
  },
};

export default nextConfig;
