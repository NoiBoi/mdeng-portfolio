const skillClusters = [
  "Mechanical Design",
  "CAD/CAM",
  "Additive Manufacturing",
  "CNC & Manual Machining",
  "Composites",
  "Robotics",
  "Materials Processing",
  "MATLAB / Python"
];

export function TechnicalGrid() {
  return (
    <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
      {skillClusters.map((skill) => (
        <div
          key={skill}
          className="bg-graphite-900 px-4 py-5 font-mono text-[0.68rem] font-bold uppercase text-muted"
        >
          {skill}
        </div>
      ))}
    </div>
  );
}
