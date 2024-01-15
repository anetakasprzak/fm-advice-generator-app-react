/* Advice # "" */

import { useEffect, useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState([]);

  useEffect(function () {
    async function fetchAdvice() {
      try {
        setIsLoading(true);

        const res = await fetch(`https://api.adviceslip.com/advice`);
        const data = await res.json();
        console.log(data);

        setAdvice(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAdvice();
  }, []);

  console.log(advice);

  return (
    <div className="wrapper">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <p className="advice__number">Advice &#35;{advice.slip.id}</p>
          <p className="advice__text">“{advice.slip.advice}”</p>
        </>
      )}

      <picture className="img">
        <source
          srcSet="../public/images/pattern-divider-desktop.svg"
          media="(min-width: 90rem)"
        />
        <source srcSet="../public/images/pattern-divider-mobile.svg" />
        <img
          src="../public/images/pattern-divider-mobile.svg"
          alt="background"
        />
      </picture>
      <button onClick={() => setAdvice()} className="dice__box">
        <img src="../public/images/icon-dice.svg" alt="dice" className="dice" />
      </button>
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}
