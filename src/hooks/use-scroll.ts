import { useEffect, useState } from "react";

export const useScroll = () => {
  const [scrollYPos, setSetscrollYPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => setSetscrollYPos(window.scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollYPos;
};
