import axios from "axios";
import Api from "../Api";
const videoUrl = "/video";
class VideoService {
  shareVideo(video) {
    return Api.post(videoUrl, video);
  }
  async youtubeParse(link) {
    try {
      const regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = link.match(regExp);
      const youtubeId = match && match[7].length === 11 ? match[7] : "";
      const youtubeInformation = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos",
        {
          params: {
            part: "snippet",
            id: youtubeId,
            key: process.env.REACT_APP_YOUTUBE_KEY,
          },
        }
      );

      return {youtubeInformation, youtubeId};
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getVideo() {
    return Api.get(videoUrl)
  }
}

const instanceVideoService = new VideoService();

export default instanceVideoService;
