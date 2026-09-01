export default function Marquee() {
  const items = [
    'Video Editing', 'Cinematic Reels', 'Bus Edits', 'Vehicle Videos',
    'Housewarming', 'Events', 'Poojas', 'Transitions', 'Color Grading',
    'Storytelling', 'Music Sync', 'Visual Art', 'Udupi', 'Karnataka',
  ]

  // Duplicate for seamless loop
  const doubled = [...items, ...items]

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div className="marquee-item" key={i}>
            {item}
            <span className="marquee-sep" />
          </div>
        ))}
      </div>
    </div>
  )
}
