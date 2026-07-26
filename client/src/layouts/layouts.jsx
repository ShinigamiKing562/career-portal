import Navbar from "@/navigation/Navbar";
import Footer from "@/navigation/Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
