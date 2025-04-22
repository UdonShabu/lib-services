"use client";

import { useState } from "react";

export default function SocialShare() {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const message = "Check this out!"; // Customize message

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      currentUrl
    )}&text=${encodeURIComponent(message)}`;
    window.open(twitterUrl, "_blank");
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(facebookUrl, "_blank");
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
      currentUrl
    )}&title=${encodeURIComponent(message)}`;
    window.open(linkedInUrl, "_blank");
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg flex items-center space-x-4">
      <button
        onClick={shareOnTwitter}
        className="p-2 bg-blue-500 text-white rounded-lg"
      >
        Share on Twitter
      </button>
      <button
        onClick={shareOnFacebook}
        className="p-2 bg-blue-700 text-white rounded-lg"
      >
        Share on Facebook
      </button>
      <button
        onClick={shareOnLinkedIn}
        className="p-2 bg-blue-800 text-white rounded-lg"
      >
        Share on LinkedIn
      </button>
    </div>
  );
}
