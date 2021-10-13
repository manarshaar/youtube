import React from 'react';
import '../styles/VideoItem.css';

const VideoItem = ({video , handleVideoSelect}) => {
    return (
        <div onClick={() => handleVideoSelect(video)} className='video-item flex'>
            <img className='image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            <div className='content'>
                <div className='header'>{video.snippet.title}</div>
                <small>{video.snippet.channelTitle}</small>
            </div>
        </div>
    )
};
export default VideoItem;