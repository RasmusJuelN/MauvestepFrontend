'use client';
import { useState, useEffect } from "react";
import { NewsArticle } from "@/lib/types";
import { NewsArticleService } from "@/lib/services/NewsArticleService";
import NewsArticleCard from "../news/NewsArticleCard";
import Separator from "../shared/Separator";
import { getErrorMessage } from "@/lib/utilities/errorhandling/errorHandler";
import PageHeader from "../shared/PageHeader";

export default function NewsContainer() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch news articles on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const articles = await NewsArticleService.getAll();
        setNews(articles);
      } catch (err) {
        setError(getErrorMessage(err, "Failed to load news. Please try again later."));
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="px-2 space-y-10">
      <PageHeader title="What's new?" />
      
      {loading && (
        <p className="text-center text-gray-400">Loading news...</p>
      )}

      {error && (
        <p className="text-center text-red-400">Error: {error}</p>
      )}

      {!loading && !error && news.length === 0 && (
        <p className="text-center text-gray-400">No news articles available.</p>
      )}

      {!loading && !error && news.length > 0 && (
        <div>
          {news.map((article) => (
            <div key={article.id}>
              <NewsArticleCard
                title={article.title}
                createdAt={article.createdAt}
                content={article.content}
                imageUrl={article.imageUrl}
                username={article.username}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}