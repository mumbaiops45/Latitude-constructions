// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // Emit contact/index.html rather than contact.html, and point links at
  // /contact/. Without this the exported links (/contact) 404 on a plain static
  // host, because only /contact.html exists on disk.
  trailingSlash: true,

  images: {
    // A static export has no server to run the Image Optimization API.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'ui-avatars.com',   // 👈 add this
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;