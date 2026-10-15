import React from "react";
import Head from "@docusaurus/Head";
import { ConfigDemo } from "../component/sections/config";
import { ConnectIntro } from "../component/sections/connect";
import { Footer } from "../component/sections/footer";
import { Header } from "../component/sections/header";
import { ConnectScenario } from "../component/sections/scenario";

const title = "RabbyKit - A Real Web3 Way to connect all wallets for all Dapp developers";

export default function Home() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={title} />
        <meta property="og:url" content="https://rabbykit.rabby.io" />
        <meta name="twitter:description" content={title} />
        <meta name="twitter:image" content="https://rabbykit.rabby.io/logo-twitter.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="apple-mobile-web-app-title" content="RabbyKit" />
      </Head>
      <main className="rabby-home">
        <Header />
        <ConnectIntro />
        <ConfigDemo />
        <ConnectScenario />
        <Footer />
      </main>
    </>
  );
}
