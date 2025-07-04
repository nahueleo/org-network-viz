// Visualización SVG de la red organizacional
import { useState } from 'react';

export default function NetworkCanvas({
  canvasRef,
  canvasWidth,
  canvasHeight,
  offset,
  zoom,
  draggedNode,
  nodePositions,
  projects,
  hiddenProjects,
  visiblePeopleIds,
  generateOrganicPath,
  getPersonProjects,
  connections,
  setSelectedPerson,
  setSelectedProject,
  handleNodeDrag
}) {
  const [hovered, setHovered] = useState(null); // {x, y, name, role}

  return (
    <svg
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      className="bg-gray-50 rounded shadow border cursor-grab select-none"
      style={{ touchAction: 'none', display: 'block' }}
    >
      <g
        style={{
          transform: `translate(${offset.x}px,${offset.y}px) scale(${zoom})`,
          transition: draggedNode ? 'none' : 'transform 0.2s',
        }}
      >
        {/* Áreas orgánicas por proyecto */}
        {projects.filter(p => !hiddenProjects.includes(p.id)).map(project => {
          const nodes = (nodePositions[project.id] || []).filter(n => visiblePeopleIds.includes(n.id));
          if (nodes.length < 3) return null;
          const path = generateOrganicPath(nodes);
          return (
            <g key={project.id} id={`project-area-${project.id}`}>
              <path
                d={path}
                fill={project.color}
                fillOpacity={0.13}
                stroke={project.color}
                strokeWidth={2}
                onClick={e => { e.stopPropagation(); setSelectedProject(project.id); setSelectedPerson(null); }}
                className="cursor-pointer hover:fill-opacity-30 transition-all"
              />
              {/* Etiqueta del proyecto */}
              <text
                x={nodes[0].x}
                y={nodes[0].y - 30}
                fontSize={16}
                fontWeight="bold"
                fill={project.color}
                style={{ pointerEvents: 'none', textShadow: '1px 1px 2px #fff' }}
              >
                {project.name} ({nodes.length})
              </text>
            </g>
          );
        })}

        {/* Conexiones entre personas (dotted) */}
        {/*
        {connections.map((conn, i) => {
          const p1 = Object.values(nodePositions).flat().find(n => n && n.id === conn.source);
          const p2 = Object.values(nodePositions).flat().find(n => n && n.id === conn.target);
          if (!p1 || !p2) return null;
          return (
            <line
              key={i}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#888"
              strokeDasharray="4 4"
              strokeWidth={conn.projects.length > 1 ? 2.5 : 1.2}
              opacity={0.25 + 0.15 * Math.min(conn.projects.length, 3)}
              pointerEvents="none"
            />
          );
        })}
        */}

        {/* Nodos de personas */}
        {projects.filter(p => !hiddenProjects.includes(p.id)).map(project => (
          <g key={project.id}>
            {(nodePositions[project.id] || []).filter(n => visiblePeopleIds.includes(n.id)).map(node => {
              const r = 22 - 3 * (node.level - 1);
              const roleColor = node.role.color;
              const multi = getPersonProjects(node.id).length > 1;
              // Avatar initials
              const initials = node.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
              return (
                <g
                  key={node.id}
                  id={`person-node-${node.id}`}
                  tabIndex={0}
                  aria-label={node.name}
                  className="focus:outline-none"
                  onClick={e => { e.stopPropagation(); setSelectedPerson(node.id); setSelectedProject(null); }}
                  onMouseDown={e => handleNodeDrag(node.id, project.id, e)}
                  onMouseEnter={e => {
                    setHovered({
                      x: node.x,
                      y: node.y,
                      name: node.name,
                      role: node.role.name,
                      color: roleColor
                    });
                  }}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Avatar circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={r}
                    fill="#fff"
                    stroke={roleColor}
                    strokeWidth={multi ? 4 : 2}
                    className={multi ? 'shadow-lg' : ''}
                  />
                  {/* Initials */}
                  <text
                    x={node.x}
                    y={node.y + 5}
                    fontSize={r}
                    textAnchor="middle"
                    fill="#444"
                    style={{ pointerEvents: 'none', fontWeight: 600, fontFamily: 'inherit' }}
                  >
                    {initials}
                  </text>
                  {multi && (
                    <circle
                      cx={node.x + r * 0.7}
                      cy={node.y - r * 0.7}
                      r={5}
                      fill="#fff"
                      stroke="#F59E0B"
                      strokeWidth={2}
                    />
                  )}
                </g>
              );
            })}
          </g>
        ))}
        {/* Custom HTML tooltip */}
        {hovered && (
          <foreignObject x={hovered.x + 24} y={hovered.y - 10} width="180" height="48" style={{ pointerEvents: 'none' }}>
            <div style={{
              background: '#fff',
              border: `2px solid ${hovered.color}`,
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              padding: '6px 14px',
              fontSize: 15,
              color: '#222',
              fontWeight: 600,
              pointerEvents: 'none',
              minWidth: 80,
              maxWidth: 170,
              whiteSpace: 'nowrap',
              zIndex: 1000
            }}>
              {hovered.name}<br />
              <span style={{ color: hovered.color, fontWeight: 700, fontSize: 13 }}>{hovered.role}</span>
            </div>
          </foreignObject>
        )}
      </g>
    </svg>
  );
} 