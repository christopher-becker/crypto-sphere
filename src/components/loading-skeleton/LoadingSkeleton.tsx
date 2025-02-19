export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 animate-pulse">
          <div className="h-6 w-6 bg-gray-800 rounded-3xl"></div>
          <div className="h-4 w-16 bg-gray-800 rounded"></div>
          <div className="h-4 w-12 bg-gray-800 rounded"></div>
        </div>
      ))}
    </div>
  );
}
