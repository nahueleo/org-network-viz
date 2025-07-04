// Algoritmos de layout y paths para la red organizacional
export const generateNodePositions = (width, height, projectId, persons) => {
  const cx = width / 2, cy = height / 2;
  const r0 = 120 + 30 * (projectId % 3);
  const sorted = [...persons].sort((a, b) => a.role.level - b.role.level);
  const n = sorted.length;
  return sorted.map((person, i) => {
    const angle = (2 * Math.PI * i) / n;
    const level = person.role.level;
    const r = r0 + (level - 1) * 60;
    return {
      ...person,
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      angle,
      level
    };
  });
};

export const generateOrganicPath = (nodes) => {
  if (nodes.length < 3) return '';
  const points = nodes.map(n => [n.x, n.y]);
  const closed = [...points, points[0], points[1], points[2]];
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length + 1; i++) {
    const p0 = closed[i - 1], p1 = closed[i], p2 = closed[i + 1], p3 = closed[i + 2];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
  }
  d += 'Z';
  return d;
}; 