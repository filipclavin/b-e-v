import React, { useState, useEffect } from "react";


const words = [
 "Full digital overview is the best means to combat these new modern issues and optimize your company for the future."];

export default function TypeWriter() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  // typeWriter
  useEffect(() => {
    if (index === words.length) return;

    if ( subIndex === words[index].length + 1 && 
        index !== words.length - 1 && !reverse ) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => prev + 1);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 20 : subIndex === words[index].length ? 10 :
                90, parseInt(Math.random() * 5)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  // blinker
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 2000);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <>
      <h1 style=
      {{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "5rem",
        }}>
         {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
      </h1>
    </>
  );
}
