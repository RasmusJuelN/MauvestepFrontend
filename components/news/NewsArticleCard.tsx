import Image from "next/image";
import defaultNewsImage from "@/assets/images/news-image.png";

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
    <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-600/40 rounded-lg p-6 transition-all duration-300">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-4">

        <div className="flex-1">
          <h3 className="text-2xl text-indigo-300 font-semibold mb-2">{title}</h3>
          <p className="text-xs text-indigo-400 mb-3">By {username}</p>
          <p className="text-sm text-indigo-200 mb-4">{formattedDate}</p>
        </div>

        <div className="flex justify-center sm:flex-shrink-0">
          <div className="rounded-lg overflow-hidden border border-indigo-600/40 bg-indigo-900/50 ">
            <Image
              src={imageUrl ? imageUrl : defaultNewsImage}
              alt={title}
              width={300}
              height={250}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <p className="text-indigo-100 text-sm leading-relaxed">{content}</p>
    </div>
  );
}