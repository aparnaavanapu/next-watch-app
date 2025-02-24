import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="flex justify-center">
      <ReactPlayer url={videoUrl} controls  width="100%"  height="400px" />
    </div>
  );
};

export default VideoPlayer;
