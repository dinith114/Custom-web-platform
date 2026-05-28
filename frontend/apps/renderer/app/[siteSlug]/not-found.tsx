// Custom 404 for site scope — page not found within a valid site
export default function SiteNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center"><h1 className="text-4xl font-bold text-gray-300">404</h1><p className="mt-2 text-gray-500">Page not found</p></div>
    </div>
  );
}
