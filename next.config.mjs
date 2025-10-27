

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false, // set to true if this is a permanent redirect
      },
    ];
  },
};

export default nextConfig;
