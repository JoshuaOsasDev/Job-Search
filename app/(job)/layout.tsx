import Navbar from "../_components/Navbar";

export default function JobLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 text-2xl">{children}</div>
    </>
  );
}
