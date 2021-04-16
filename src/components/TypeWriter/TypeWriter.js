import React, { useState, useEffect } from "react";
import styled from 'styled-components'



const Type = styled.h1`

position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, 0);
        font-size: 5rem;

        @media (max-width: 1100px) {
          max-width: 100%; 
          display: flex;
          align-items: center;
          font-size: 3rem;
        }


@media (max-width: 768px) {
  max-width: 100%; 
  display: flex;
  align-items: center;
  font-size: 2rem;
}
`


const words = [
 "Welcome Tobias, Kristian and Class FE20. . .","Full digital overview is the best means to combat these new modern issues we face today", "Our goal is to help you optimize your company and team for the future."];

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
                120, parseInt(Math.random() * 3)));

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
      <Type>
         {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
      </Type>
    </>
  );
}
