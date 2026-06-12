// Avatar — user avatar with image or initials fallback

import React from "react";

export interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = "md", className = "" }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`avatar avatar-${size} ${className}`} title={name}>
      {src ? (
        <img src={src} alt={name} className="avatar-image" />
      ) : (
        <span className="avatar-initials">{initials}</span>
      )}
    </div>
  );
};
