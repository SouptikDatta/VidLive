import { useEffect, useState } from 'react';
import { YOUTUBE_API } from '../utils/constants';
import { Link } from 'react-router-dom';

export default function VideoContainer() {
  const [videos, setVideos] = useState([]);

  async function getVideos() {
    const data = await fetch(YOUTUBE_API);
    const json = await data.json();
    setVideos(json.items);
  }

  useEffect(() => {
    getVideos();
  }, []);

  if (videos.length === 0) {
    return <>Loading...</>;
  }

  return (
    <div className='p-5 pt-2 flex flex-wrap gap-6 dark:bg-gray-900'>
      <div className="border border-slate-500 dark:border-gray-600 dark:bg-gray-800 w-64">
        <h4 className="flex justify-center border border-yellow-500 dark:border-yellow-300 dark:text-white">Watch Ad</h4>
        <div className="flex-grow flex flex-col">
          <VideoCard info={videos[5]} isAd dark />
        </div>
      </div>
      {videos.map(video => (
        <Link to={"/watch?v=" + video.id} key={video.id} className="w-64">
          <div className="border border-slate-500 dark:border-gray-600 dark:bg-gray-800 w-64 flex flex-col">
            <VideoCard info={video} dark />
          </div>
        </Link>
      ))}
    </div>
  );
}

function VideoCard({ info, isAd, dark }) {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  const { viewCount } = statistics;

  return (
    <div className={`flex flex-col ${dark ? 'dark:text-white dark:bg-gray-800' : ''} flex-grow`}>
      {isAd && (
        <img
          className="rounded-lg w-full"
          alt="ad-thumbnail"
          src={thumbnails.high.url} // or use appropriate ad thumbnail URL
        />
      )}
      {!isAd && (
        <img
          className="rounded-lg w-full"
          alt="channel-thumbnail"
          src={thumbnails.medium.url}
        />
      )}
      <ul className="p-4 flex flex-col">
        <li>{title}</li>
        <li>{channelTitle}</li>
        <li className="bg-blue-900 flex justify-center">{viewCount} views</li>
      </ul>
    </div>
  );
}
