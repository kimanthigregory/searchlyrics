import "./results.css";
import { useContext } from "react";
import { SongContext } from "./input";
import { useParams } from "react-router-dom";

export default function Result() {
  const { songId } = useParams();
  const { submit, filteredSongs } = useContext(SongContext);

  const song = filteredSongs.find((song) => song.id.toString() === songId);

  if (!song) {
    return null;
  }
  const lines = song.lyrics.split("\n");
  return (
    <>
      <section className="lyrics" key={song.id}>
        <h2>{song.title}</h2>
        {lines.map((line, index) => {
          return <p key={index}>{line}</p>;
        })}
      </section>
    </>
  );
}
