import "./results.css";

export default function Result({ title, lyrics }) {
  const lines = lyrics.split("\n");
  return (
    <section className="lyrics">
      <h2>{title}</h2>
      {lines.map((line) => {
        return <p>{line}</p>;
      })}
    </section>
  );
}
