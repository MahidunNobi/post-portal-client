import axios from "axios";

export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
    formData
  );

  return data.data.display_url;
};

export function timeElapsed(postedTimestamp) {
  const now = Date.now();
  const elapsedMilliseconds = now - postedTimestamp;

  const seconds = Math.floor(elapsedMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days + (days === 1 ? " day" : " days") + " ago";
  } else if (hours > 0) {
    return hours + (hours === 1 ? " hour" : " hours") + " ago";
  } else if (minutes > 0) {
    return minutes + (minutes === 1 ? " minute" : " minutes") + " ago";
  } else {
    return seconds + (seconds === 1 ? " second" : " seconds") + " ago";
  }
}

export function formatDateAndTime(postedTimestamp) {
  const date = new Date(postedTimestamp);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
}
