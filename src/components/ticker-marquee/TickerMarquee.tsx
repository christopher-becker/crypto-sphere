import "./ticker-marquee.css";
import { Link } from "react-router-dom";
import { getNewsList } from "../../api/newsAPI";
import { NewsList } from "../../core/types/news.type";
import { useEffect, useState } from "react";

export default function TickerMarquee() {
  const [list, setList] = useState<NewsList | undefined>();

  useEffect(() => {
    async function fetchNews() {
      const newsList: NewsList = await getNewsList();
      setList(newsList);
    }
    fetchNews();
  }, []);

  if (!list) return null;

  const style = {
    "--quantity": list.stories.length,
  } as React.CSSProperties;

  const marqueeCoinList = list.stories.map((story) => (
    <li key={story.id} className="pl-6 border-l border-gray-500">
      <Link to={story.url} target="_blank" className="flex gap-2 items-center">
        <span>{story.title}</span>
      </Link>
    </li>
  ));

  return (
    <div className="fixed left-0 bottom-0 w-full text-gray-50">
      <div className="ticker-marquee" style={style}>
        <ul>{marqueeCoinList}</ul>
        <ul aria-hidden="true">{marqueeCoinList}</ul>
      </div>
    </div>
  );
}
