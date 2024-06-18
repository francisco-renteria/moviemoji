import React, { useEffect, useRef } from "react";
import OPENMOJIJSON from "../data/OpenMoji.json";
import convertCodeToEmoji from "../utils/convertEmojiCode";

const emojis = loadMojis();

function loadMojis() {
  var EMOJI_LIST = OPENMOJIJSON.filter(function (emoji) {
    return (
      emoji._openMoji_skintone[0] === "" &&
      emoji._openMoji_subgroups !== "country-flag"
    );
  });
  return EMOJI_LIST;
}

const Cloud = ({ EMOJI_COUNT }) => {
  const emojiContainerRef = useRef(null);
  const emojiElements1 = useRef([]);
  const emojiElements2 = useRef([]);

  useEffect(() => {
    // Limpia los emojis anteriores
    emojiContainerRef.current.innerHTML = "";
    emojiElements1.current = [];
    emojiElements2.current = [];

    function createEmojiElement1() {
      const emojiElement = document.createElement("div");
      emojiElement.classList.add("emoji");
      emojiElement.innerText = convertCodeToEmoji(
        emojis[Math.floor(Math.random() * emojis.length)]._openMoji_hexcode
      );
      setPosition1(emojiElement);
      emojiContainerRef.current.appendChild(emojiElement);
      return emojiElement;
    }

    function createEmojiElement2() {
      const emojiElement = document.createElement("div");
      emojiElement.classList.add("emoji");
      emojiElement.innerText = convertCodeToEmoji(
        emojis[Math.floor(Math.random() * emojis.length)]._openMoji_hexcode
      );
      setPosition2(emojiElement);
      emojiContainerRef.current.appendChild(emojiElement);
      return emojiElement;
    }

    function setPosition1(element) {
      const x = (Math.random() - 0.5) * 50;
      const y = Math.random() * 100;
      element.style.transform = `translate(${x}vw, ${y}vh)`;

      if (element.getBoundingClientRect().right < 0) {
        element.innerText = convertCodeToEmoji(
          emojis[Math.floor(Math.random() * emojis.length)]._openMoji_hexcode
        );
      }
    }

    function setPosition2(element) {
      const x = (Math.random() - 0.5) * 50 + 90;
      const y = Math.random() * 100;
      element.style.transform = `translate(${x}vw, ${y}vh)`;

      if (
        element.getBoundingClientRect().left >
        emojiContainerRef.current.getBoundingClientRect().right
      ) {
        element.innerText = convertCodeToEmoji(
          emojis[Math.floor(Math.random() * emojis.length)]._openMoji_hexcode
        );
      }
    }

    function updateEmojis() {
      emojiElements1.current.forEach((emojiElement) => {
        setTimeout(() => {
          setPosition1(emojiElement);
        }, Math.random() * 1000);
      });
      emojiElements2.current.forEach((emojiElement) => {
        setTimeout(() => {
          setPosition2(emojiElement);
        }, Math.random() * 1000);
      });
    }

    for (let i = 0; i < EMOJI_COUNT; i++) {
      emojiElements1.current.push(createEmojiElement1());
      emojiElements2.current.push(createEmojiElement2());
    }

    const intervalId = setInterval(updateEmojis, 2000);
    updateEmojis();

    console.log(`Number of emojis: ${EMOJI_COUNT}`);
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [EMOJI_COUNT]);

  return <div id="emoji-container" ref={emojiContainerRef}></div>;
};

export default Cloud;
