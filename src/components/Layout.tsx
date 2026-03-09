import TopBar from "./TopBar";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <TopBar />
    <Navbar />
    <main>{children}</main>
    <FooterSection />
  </>
);

export default Layout;
