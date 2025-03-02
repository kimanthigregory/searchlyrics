import "./input.css";
import logo from "../assets/lyric_logo.webp";
import { useEffect, useState, useMemo } from "react";
import Result from "./result";
import { createContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const SongContext = createContext();

export default function InputBox() {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const handleClick = function (event) {
    setInput(event.target.value);
  };

  const [data, setData] = useState({ songs: [] });
  const [suggestionsOn, setSuggestionsOn] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [error, setError] = useState(null);
  const removeSuggestions = function () {
    setSuggestionsOn(false);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data.json`);
        if (!response.ok) throw new Error("Failed to fetch songs");
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (input.length > 1) {
      setSuggestionsOn(true);
      setSubmit(false);
      const songs = data.songs.filter((song) =>
        song.title.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSongs(songs);
    } else {
      setSuggestionsOn(false);
      setFilteredSongs([]);
    }
  }, [input, data.songs]);

  const handleSubmit = function (event) {
    event.preventDefault();

    if (filteredSongs.length > 0) {
      navigate(`/song/${filteredSongs[0].id}`);
    } else {
      navigate(`/}`);
    }
  };
  const addInput = function (event) {
    const selectedSongTitle = event.target?.innerText?.toLowerCase();
    if (!selectedSongTitle) return;

    const filtered = data.songs.filter(
      (song) => song.title.toLowerCase() === selectedSongTitle
    );

    if (filtered.length > 0) {
      const songId = filtered[0].id;
      navigate(`/song/${songId}`);
      setSuggestionsOn(false); // Hide suggestions
      // setInput(selectedSongTitle);
      // setFilteredSongs(filtered);
    } else {
      console.warn("Selected song not found!");
    }
  };
  return (
    <main onClick={removeSuggestions}>
      <section className="nav"></section>
      <section className="header">
        <img src={logo} alt="" className="logo" />
        <h1>Discover Catholic Song Lyrics</h1>
        <p>
          Effortlessly find lyrics to your favorite Catholic hymns and songs
        </p>
      </section>
      <section className="search">
        <form
          className="search-area"
          onSubmit={handleSubmit}
          autoComplete="off"
          style={{
            borderRadius: !suggestionsOn ? "8px" : "8px 8px 0 0",
          }}
        >
          <input
            type="search"
            id="search-area"
            placeholder="Search for a song"
            value={input}
            onChange={handleClick}
          />
          <button type="submit">search</button>
        </form>
        {suggestionsOn && (
          <div
            className="auto-complete"
            style={{
              height:
                filteredSongs.length == 0 || filteredSongs.length == 1
                  ? "50px"
                  : "200px",
            }}
          >
            {filteredSongs.length == 0 ? (
              <p className="suggestion">No results found</p>
            ) : (
              filteredSongs.map((song) => (
                <p
                  onClick={addInput}
                  className="suggestion"
                  key={song.id}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  {song.title.toLowerCase()}
                </p>
              ))
            )}
          </div>
        )}
      </section>
      <section className="song">
        <SongContext.Provider value={{ submit, filteredSongs }}>
          <Outlet />
        </SongContext.Provider>
      </section>
      <footer>
        <p class="footer-disclaimer">
          Disclaimer: Lyrics are limited to songs sung at St. Mary's Catholic
          Kiserian.
        </p>
      </footer>
    </main>
  );
}
