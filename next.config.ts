import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"], // add other domains if needed
  },
};

// module.exports = {
//   experimental: {
//     turbotrace: { memoryLimit: 0 }, // prevents edge WASM import
//     prisma: { ignoreEnvVarErrors: true }, // optional, but recommended
//   },
// };
export default nextConfig;
