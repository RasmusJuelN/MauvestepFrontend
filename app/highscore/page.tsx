"use client";

import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { BiCrown } from 'react-icons/bi';
import { HighscoreService } from "@/lib/services/highscoreService";
import { HighscoreDto } from "@/lib/types";
import { useEffect, useState } from "react";
import { getErrorMessage } from "@/lib/utilities/errorhandling/errorHandler";

export default function HighscorePage() {
  const [highscores, setHighscores] = useState<HighscoreDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHighscores = async () => {
      try {
        setLoading(true);
        const data = await HighscoreService.getAllHighscores();
        setHighscores(data);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err, "Failed to load highscores. Please try again."));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHighscores();
  }, []);

  // Get the crown icon color based on the rank (1-3)
  const getCrown = (rank: number) => {
    const colors = ["text-yellow-400", "text-gray-300", "text-orange-400"];
    return <BiCrown className={`w-6 h-6 ${colors[rank]}`} />;
  };

  return (
    <PageContainer>
      <PageHeader title="Highscore Leaderboard" />

      <div className="bg-indigo-900/20 border-2 border-indigo-900/80 rounded-lg px-4 lg-custom:px-6 max-w-6xl mx-auto pb-4">
        <div className="grid grid-cols-3 lg-custom:grid-cols-4 gap-2 lg-custom:gap-4 px-4 py-3 border-b-2 border-indigo-700/50 text-indigo-400 font-semibold text-xs lg-custom:text-base">
          <span className="text-left">Player</span>
          <span className="text-center">Boss</span>
          <span className="text-center">Score</span>
          <span className="hidden lg-custom:block text-center">Date</span>
        </div>

        <div className="">
          {loading && (
            <div className="px-4 py-8 text-center text-indigo-300 text-sm lg-custom:text-base">
              Loading highscores...
            </div>
          )}


          {!loading && !error && highscores.map((highscore, index) => {
            // for top 3 ranks adding underline colors that match crown colors
            const rank = index + 1;
            const underlineColors = [
              "border-yellow-400/70",
              "border-gray-300/70",
              "border-orange-400/70"
            ];
            const isTopThree = rank <= 3;

            return (
              <div
                key={highscore.id}
                className={`grid grid-cols-3 lg-custom:grid-cols-4 gap-2 lg-custom:gap-4 px-4 py-3 rounded transition-colors hover:bg-indigo-900/30 text-xs lg-custom:text-base ${
                  isTopThree
                    ? `border-b-2 ${underlineColors[index]}`
                    : "border-b border-indigo-800/30"
                }`}
              >
                {/* if top 3 ranks, show crown icon, if not show hashtag as rank*/}
                <div className="flex items-center gap-2 lg-custom:gap-3 text-left text-indigo-200">
                  {isTopThree && getCrown(index)}
                  {!isTopThree && <span className="text-indigo-500 font-semibold">#{rank}</span>}
                  <span className="font-semibold truncate">{highscore.username}</span>
                </div>
                <span className="text-center text-indigo-300 truncate">{highscore.bossName}</span>
                <span className="text-center text-indigo-200 font-semibold">{highscore.score.toLocaleString()}</span>
                  {/*hide data on small screen cus there was no space*/}
                <span className="hidden lg-custom:block text-center text-indigo-400 text-sm">
                  {new Date(highscore.createdAt).toLocaleDateString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}