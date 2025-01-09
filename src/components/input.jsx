import "./input.css";
import React from "react";
export default function InputBox() {
  const [input, setInput] = React.useState("");
  const handleClick = function (event) {
    setInput(event.target.value);
  };
  console.log(input);
  return (
    <main>
      <section className="header">
        <h1>search lyrics</h1>
        <p>search for your favourite Catholic song lyrics</p>
      </section>
      <section className="search">
        <form className="search-area">
          <input
            type="search"
            id="search-area"
            placeholder="Search for a song"
            value={input}
            onChange={handleClick}
          />
          <button>search</button>
        </form>
      </section>
    </main>
  );
}
