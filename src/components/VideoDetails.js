import React from "react";
import Moment from "moment";
import "../styles/VideoDetails.css";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import NumberFormat from "react-number-format";
import BeatLoader from "react-spinners/BeatLoader";

class VideoDetails extends React.Component {
  constructor(props) {
    super(props); //selectedVideo,videoStatistics
    this.state = {
      like: false,
      dislike: false,
    };
  }

  toggleAction = (e) => {
    let enot = e === "like" ? "dislike" : "like";
    this.setState({
      [e]: true,
      [enot]: false,
    });
  };

  handleDate = (dt) => {
    Moment.locale("en");
    return (
      <div className="video-date"> {Moment(dt).format("MMM d, yyyy")} </div>
    );
  };

  render() {
    let { selectedVideo, videoStatistics } = this.props;
    if (!selectedVideo) {
      return (
        <div className="flex center-loading">
          <BeatLoader size={24} color="rgba(255, 255, 255, 0.671)" />
        </div>
      );
    }

    let {
      id: { videoId },
      snippet: { title, description, channelTitle, publishedAt },
    } = selectedVideo;
    let { likeCount, dislikeCount, viewCount } = videoStatistics;
    let videoSrc = `https://www.youtube.com/embed/${videoId}`;
    let { like, dislike } = this.state;

    return (
      <div className="selected-video">
        <div className="video-play">
          <iframe
            src={videoSrc}
            allowFullScreen
            className="video-player"
            frameBorder="0"
            title="video-player"
          />
        </div>
        <div className="video-details">
          <div>
            <h2 className="video-title">{title}</h2>
            <div className="flex">
              <NumberFormat
                thousandsGroupStyle="thousand"
                value={viewCount}
                suffix=" views"
                decimalSeparator="."
                displayType="text"
                className="video-views"
                thousandSeparator={true}
              />
              <span className="seperator">&#8901;</span>
              {this.handleDate(publishedAt)}
            </div>

            <div className="video-reactions flex">
              <div className="video-likes">
                <AiOutlineLike
                  size="25px"
                  className={like ? "like-icon blue" : "like-icon"}
                  onClick={() => this.toggleAction("like")}
                  name="like"
                />
                {likeCount}
              </div>
              <div className="video-dislikes">
                <AiOutlineDislike
                  size="25px"
                  className={dislike ? "dislike-icon blue" : "dislike-icon"}
                  onClick={() => this.toggleAction("dislike")}
                  name="dislike"
                />
                {dislikeCount}
              </div>
            </div>
          </div>

          <div>
            <div className="video-channel flex">
              <div className="channel-pp">
                <BsCircleFill size={50} color="white" />
              </div>
              <div className="channel-title">{channelTitle}</div>
            </div>
            <br />
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoDetails;
