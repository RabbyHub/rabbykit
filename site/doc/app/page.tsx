import { ConfigDemo } from "../src/component/sections/config";
import { ConnectIntro } from "../src/component/sections/connect";
import { Footer } from "../src/component/sections/footer";
import { Header } from "../src/component/sections/header";
import { ConnectScenario } from "../src/component/sections/scenario";

export default function Page() {
  return (
    <>
      <Header />
      <ConnectIntro />
      <ConfigDemo />
      <ConnectScenario />
      <Footer />
    </>
  );
}
