// export default function TimeAgo(timestamp) {
//   const now = new Date();
//   const date = new Date(timestamp);
//   const diff = (now - date) / 1000; // difference in seconds



//   if (diff < 60) {
//     return "just now";
//   } else if (diff < 3600) {
//     const minutes = Math.floor(diff / 60);
//     return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
//   } else if (diff < 86400) {
//     const hours = Math.floor(diff / 3600);
//     return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
//   } else if (diff < 2592000) {
//     const days = Math.floor(diff / 86400);
//     return `${days} day${days !== 1 ? "s" : ""} ago`;
//   } else if (diff < 31536000) {
//     const months = Math.floor(diff / 2592000);
//     return `${months} month${months !== 1 ? "s" : ""} ago`;
//   } else {
//     const years = Math.floor(diff / 31536000);
//     return `${years} year${years !== 1 ? "s" : ""} ago`;
//   }
// }

// Example usage:
// console.log(TimeAgo(timestamp));
// export default TimeAgo;




import { useEffect, useState } from "react";

interface TimeAgoProps {
  timestamp: string | number | Date;
}

export default function TimeAgo({ timestamp }: TimeAgoProps) {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = (now.getTime() - date.getTime()) / 1000;

    let formatted = "";
    if (diff < 60) {
      formatted = "just now";
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      formatted = `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      formatted = `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else if (diff < 2592000) {
      const days = Math.floor(diff / 86400);
      formatted = `${days} day${days !== 1 ? "s" : ""} ago`;
    } else if (diff < 31536000) {
      const months = Math.floor(diff / 2592000);
      formatted = `${months} month${months !== 1 ? "s" : ""} ago`;
    } else {
      const years = Math.floor(diff / 31536000);
      formatted = `${years} year${years !== 1 ? "s" : ""} ago`;
    }

    setText(formatted);
  }, [timestamp]);

  return <span>{text}</span>;
}
