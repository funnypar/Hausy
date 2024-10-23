/** @type {import('next').NextConfig} */
const nextConfig = {
    // next.config.js
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                pathname: "**",
            },
        ],
        domains: ["juyibhfuuvdjptkpenxp.supabase.co"],
    },
};

export default nextConfig;
