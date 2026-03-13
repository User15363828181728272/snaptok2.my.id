const stats = [
  { value: "100%", label: "Gratis" },
  { value: "No", label: "Watermark" },
  { value: "HD", label: "Quality" },
  { value: "Fast", label: "Process" },
];

export function Stats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-primary">
            {stat.value}
          </div>
          <div className="text-sm md:text-base text-muted-foreground font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
