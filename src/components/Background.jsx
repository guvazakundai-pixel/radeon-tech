const dustParticles = Array.from({ length: 12 }).map(() => ({
  left: `${15 + Math.random() * 70}%`,
  delay: `${Math.random() * 20}s`,
  duration: `${18 + Math.random() * 15}s`,
  size: 1 + Math.random() * 2,
}));

export default function Background() {
  return (
    <div className="bg-godrays" aria-hidden="true">
      <div className="ray-1" />
      <div className="ray-2" />
      <div className="ray-3" />
      <div className="haze" />
      <div className="arch-line" />
      <div className="arch-line" />
      <div className="arch-line" />
      {dustParticles.map((p, i) => (
        <div
          key={i}
          className="dust"
          style={{
            left: p.left,
            bottom: "-5%",
            width: p.size,
            height: p.size,
            "--dust-delay": p.delay,
            "--dust-duration": p.duration,
          }}
        />
      ))}
    </div>
  );
}
