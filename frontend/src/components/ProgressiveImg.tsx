import { useState, useEffect } from "react";

interface ProgressiveImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderSrc: string;
  src: string;
}

export const ProgressiveImg: React.FC<ProgressiveImgProps> = ({ placeholderSrc, src, ...props }) => {
  const [imgSrc, setImgSrc] = useState<string>(placeholderSrc || src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  const loading = placeholderSrc && imgSrc === placeholderSrc
  const customClass = loading ? "blur-sm [clip-path:inset(0)] shadow-inner-lg" : "blur-none transition";

  return (
    <img
      {...{ src: imgSrc, ...props }}
      alt={props.alt || ""}
      className={`${props.className} ${customClass}`}
    />
  );
};
