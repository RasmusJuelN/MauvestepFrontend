export default function NewsArticleCard({
  title,
  createdAt,
  content,
  imageUrl,
  username,
}: {
  title: string;
  createdAt: string;
  content: string;
  imageUrl?: string;
  username: string;
}) {
  // Format date for display
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="rounded-md">
      <div className="flex justify-between border-b items-center gap-4">
        <h3 className="text-xl text-indigo-400 font-semibold">{title}</h3>
        <p className="text-sm text-indigo-100 whitespace-nowrap">{formattedDate}</p>
      </div>

      <p className="text-xs text-indigo-300 mt-2">By {username}</p>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto mt-4 rounded-md"
        />
      )}
      <p className="mt-4 text-indigo-100">{content}</p>
    </div>
  );
}