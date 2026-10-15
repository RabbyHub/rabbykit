import { ConfigDemo } from "./component/sections/config";
import { ConnectIntro } from "./component/sections/connect";
import { Footer } from "./component/sections/footer";
import { Header } from "./component/sections/header";
import { ConnectScenario } from "./component/sections/scenario";

export default function Page() {
  return (
    <main className="rabby-home">
      <Header />
      <ConnectIntro />
      <ConfigDemo />
      <ConnectScenario />
      <Footer />
    </main>
  );
}
