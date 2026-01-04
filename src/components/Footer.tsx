import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f5] py-8">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Link
          href="mailto:theoffice@oklahomabillionaire.com"
          className="text-sm text-[#3949AB] hover:underline"
        >
          theoffice@oklahomabillionaire.com
        </Link>
        <p className="text-xs text-gray-400 mt-3">
          &copy; {new Date().getFullYear()} The Office of the Oklahoma Billionaire
        </p>
      </div>
    </footer>
  );
}
