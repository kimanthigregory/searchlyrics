import "./results.css";
import { useContext } from "react";
import { SongContext } from "./input";

// {submit &&
//   filteredSongs.map((song) => (
//     <Result key={song.id} title={song.title} lyrics={song.lyrics} />
//   ))}

export default function Result() {
  const { submit, filteredSongs } = useContext(SongContext);
  const lyrics = filteredSongs.lyrics;
  const title = filteredSongs.title;
  console.log(data);
  const lines = lyrics.split("\n");
  return (
    <>
      {submit && (
        <section className="lyrics">
          <h2>{title}</h2>
          {lines.map((line) => {
            return <p>{line}</p>;
          })}
        </section>
      )}
    </>
  );
}
