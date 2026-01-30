import "../globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
// import { auth } from "@/config/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();
  // const user = session?.user || null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* <Navbar user={user} /> */}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
