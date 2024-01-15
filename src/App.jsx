/* Advice # "" */

import { useEffect, useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState([]);
  const [error, setError] = useState("");

  async function fetchAdvice() {
    try {
      setIsLoading(true);

      const res = await fetch(`https://api.adviceslip.com/advice`);
      const data = await res.json();

      setAdvice(data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setError("");
      setIsLoading(false);
    }
  }

  useEffect(function () {
    fetchAdvice();
  }, []);

  return (
    <div className="wrapper">
      {error && <Error />}
      {isLoading && <Loader />}
      {!isLoading && advice && (
        <>
          <p className="advice__number">Advice &#35;{advice?.slip?.id}</p>
          <p className="advice__text">“{advice?.slip?.advice}”</p>
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
      <button onClick={fetchAdvice} className="dice__box">
        <img src="../public/images/icon-dice.svg" alt="dice" className="dice" />
      </button>
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function Error() {
  return <p className="loader">Upps..</p>;
}
