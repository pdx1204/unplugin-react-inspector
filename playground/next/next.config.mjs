import { webpackPlugin } from "unplugin-react-inspector";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.plugins.push(
      webpackPlugin({ enabled: true, injectClientEntryFile: "src/app/layout.tsx" })
    );
    return config;
  },
};

export default nextConfig;
