import "./results.css";
import { useContext } from "react";
import { SongContext } from "./input";

export default function Result() {
  const { submit, filteredSongs } = useContext(SongContext);
  console.log(filteredSongs);
  if (!submit || filteredSongs.length == 0) {
    return null;
  }
  return (
    <>
      {filteredSongs.map((song) => {
        const lines = song.lyrics.split("\n");

        return (
          submit && (
            <section className="lyrics" key={song.id}>
              <h2>{song.title}</h2>
              {lines.map((line, index) => {
                return <p key={index}>{line}</p>;
              })}
            </section>
          )
        );
      })}
    </>
  );
}
