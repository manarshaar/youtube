import React from "react";
import "../styles/App.css";

import Header from "./Header";
import VideoList from "./VideoList";
import VideoDetails from "./VideoDetails";
require("dotenv").config();

class App extends React.Component {

  state = {
    videoList: [],
    selectedVideo: null,
    videoStatistics: {
      likeCount: 0,
      dislikeCount: 0,
      viewCount: 0,
    },
  };

  componentDidMount() {
    this.callAPI("net ninja")
      .then((data) => {
        this.handleVideoList(data);
      })
      .then(() =>
        this.handleVideoStatistics(this.state.selectedVideo.id.videoId)
      )
      .catch((error) => console.log(error));
  }

  callAPI = async (query) => {
    let params = new URLSearchParams({
      part: "snippet",
      maxResults: 10,
      q: query,
      type: "video",
      key: process.env.REACT_APP_API_KEY,
    });

    let url = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;
    let res = await fetch(url, { method: "GET" });
    let data = await res.json();
    
    console.log(data);
    return data;
  };

  handleVideoList = (videosData) => {
    this.setState({
      videoList: videosData,
      selectedVideo: videosData.items[0],
    });
  };

  handleVideoSelect = (video) => {
    this.setState({ ...this.state, selectedVideo: video });
    this.handleVideoStatistics(video.id.videoId);
  };

  handleVideoStatistics = async (videoId) => {
    try {
      let params = new URLSearchParams({
        part: "statistics",
        id: videoId,
        key: process.env.REACT_APP_API_KEY,
      });

      let url = `https://www.googleapis.com/youtube/v3/videos?${params.toString()}`;
      let res = await fetch(url, { method: "GET" });
      let data = await res.json();

      let { likeCount, dislikeCount, viewCount } = data.items[0].statistics;

      function kFormatter(num) {
        return Math.abs(num) > 999
          ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
          : Math.sign(num) * Math.abs(num);
      }
      likeCount = kFormatter(likeCount);
      dislikeCount = kFormatter(dislikeCount);

      this.setState({
        videoStatistics: {
          likeCount: likeCount,
          dislikeCount: dislikeCount,
          viewCount: viewCount,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { videoList, selectedVideo, videoStatistics } = this.state;
    return (
      <div>
        <Header handleVideoList={this.handleVideoList} callAPI={this.callAPI} />
        <div className="main-container">
          <div className="container body-wrapper flex">
            <section className="video-section">
              <VideoDetails
                selectedVideo={selectedVideo}
                videoStatistics={videoStatistics}
              />
            </section>

            <section className="video-list-section">
              <VideoList
                handleVideoSelect={this.handleVideoSelect}
                videoList={videoList}
              />
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
