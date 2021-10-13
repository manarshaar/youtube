import React from "react";
import VideoItem from "./VideoItem";
import BeatLoader from "react-spinners/BeatLoader";

const VideoList = ({ videoList, handleVideoSelect }) => {
  let loading = (
    <div className="flex center-loading">
      <BeatLoader size={12} color="rgba(255, 255, 255, 0.671)" />
    </div>
  );

  return (
    <div className="video-item-list">
      {videoList.items && videoList.items.length
        ? videoList.items.map((video) => (
            <VideoItem
              key={video.id.videoId}
              video={video}
              handleVideoSelect={handleVideoSelect}
            />
          ))
        : loading}
    </div>
  );
};
export default VideoList;
