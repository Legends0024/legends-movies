import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#141414]">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-neutral-300 mb-8">Page Not Found</p>
      <Link to="/" className="px-6 py-3 bg-white text-black font-semibold rounded-sm hover:bg-neutral-200 transition-colors">
        Go Home
      </Link>
    </div>
  );
}
