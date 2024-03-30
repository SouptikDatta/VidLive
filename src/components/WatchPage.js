import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function WatchPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    dispatch(closeMenu());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Initialize the YouTube player when component mounts
    window.onYouTubeIframeAPIReady = () => {
      console.log('YouTube iframe API is ready');
      playerRef.current = new window.YT.Player('youtube-player', {
        events: {
          onReady: () => {
            console.log('Player ready');
          },
        },
      });
    };

    return () => {
      // Cleanup function
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  useEffect(() => {
    const videoId = searchParams.get('v');
    const urlWithTimestamp = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
    iframeRef.current.src = urlWithTimestamp;
  }, [searchParams]);

  const handleSubtitleClick = (timestamp) => {
    if (playerRef.current) {
      playerRef.current.seekTo(timestamp, true);
      playerRef.current.playVideo();
      toast(`Video will start playing from: ${formatTime(timestamp)}`, {
        position: "top-center",
        className: "toast-message",
      });      
    } else {
      // Handle the case when the player is not initialized
      console.error('YouTube player is not yet initialized');
      // You can display a message to the user or handle it in any appropriate way
      // For example:
      toast.error('YouTube player is not yet initialized', {
        position: "top-center",
        className: "toast-message",
      });
    }
  };
  

  const subtitles = [
    { timestamp: 120, text: 'Subtitle 1 : Introduction - 2 Min' },
    { timestamp: 240, text: 'Subtitle 2 : Explainations - 4 Min' },
    { timestamp: 360, text: 'Subtitle 3 : Live Feed - 6 Min' },
    { timestamp: 600, text: 'Subtitle 4 : FAQs - 10 Min' },
    { timestamp: 720, text: 'Subtitle 5 : Conclusion - 12 Min' },
  ];

  return (
    <div className="flex flex-col w-full">
      <ToastContainer />
      <div className="bg-gray-900 rounded-lg overflow-hidden p-6 flex flex-col md:flex-row md:gap-6">
        <div className="border border-slate-300 md:w-3/4">
          <iframe
            ref={iframeRef}
            id="youtube-player"
            width="100%"
            height="600"
            title="title"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="mx-auto md:w-1/4">
          <h4 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-5xl">Subtitles</h4>
          <ul className="list-none">
            {subtitles.map((subtitle, index) => (
              <li key={index} onClick={() => handleSubtitleClick(subtitle.timestamp)} className="mb-4 py-3 px-6 text-white bg-gray-800 hover:bg-gray-700 rounded cursor-pointer">
                {subtitle.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:gap-6 p-5">
        <div className="flex-grow">
          <LiveChat />
        </div>
        <div className="flex-grow">
          <CommentsContainer />
        </div>
      </div>
    </div>
  );
}

function formatTime(timestamp) {
  const minutes = Math.floor(timestamp / 60);
  const seconds = timestamp % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
