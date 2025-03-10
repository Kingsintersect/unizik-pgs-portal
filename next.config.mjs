/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ['res.cloudinary.com', 'another-domain.com'],
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname: '**',
         },
      ],
   },
   async headers() {
      return [
         {
            // match all api routes
            source: "/api/:path*",
            headers: [
               { key: "Access-Control-Allow-Credentials", value: "true" },
               { key: "Access-Control-Allow-Origin", value: "*" },
               { key: "Access-Control-Allow-Methods", value: "GET, POST, PATCH, PUT, DELETE" },
               { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
         }
      ]
   }
};

export default nextConfig;
