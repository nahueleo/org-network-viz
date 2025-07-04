import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Layers, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';
import { people } from './data/people';
import { projects } from './data/projects';
import { roles } from './data/roles';
import { assignments } from './data/assignments';
import { getPersonProjects, getProjectPersons, getPersonPeers, getConnections } from './utils/network';
import { generateNodePositions, generateOrganicPath } from './utils/layout';
import { useZoomPan } from './hooks/useZoomPan';
import PersonPanel from './components/PersonPanel';
import ProjectPanel from './components/ProjectPanel';
import StatsPanel from './components/StatsPanel';
import Controls from './components/Controls';
import NetworkCanvas from './components/NetworkCanvas';
import RolePanel from './components/RolePanel';
// Material UI
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const CANVAS_HEIGHTS = {
  desktop: 900,
  tablet: 700,
  mobile: 500,
};

function getDeviceType() {
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 768) return 'mobile';
    if (window.innerWidth < 1024) return 'tablet';
  }
  return 'desktop';
}

export default function OrganizationalNetworkVisualization() {
  // Responsive
  const [device, setDevice] = useState(getDeviceType());
  useEffect(() => {
    const onResize = () => setDevice(getDeviceType());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const canvasHeight = CANVAS_HEIGHTS[device];
  const canvasWidth = device === 'mobile' ? 360 : device === 'tablet' ? 700 : 1200;

  // Estado de UI
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [hiddenProjects, setHiddenProjects] = useState([]); // projectId[]
  const [selectedPerson, setSelectedPerson] = useState(null); // personId
  const [selectedProject, setSelectedProject] = useState(null); // projectId
  const [draggedNode, setDraggedNode] = useState(null); // {personId, projectId}
  const [nodePositions, setNodePositions] = useState({}); // {projectId: [{...person, x, y}]}
  const [selectedPeople, setSelectedPeople] = useState([]); // for people grid selection
  const [selectedRole, setSelectedRole] = useState(null);
  const [view, setView] = useState('network');

  // Zoom y pan
  const canvasRef = useRef();
  const { zoom, setZoom, offset, setOffset, reset } = useZoomPan(canvasRef, canvasWidth, canvasHeight);

  // Calcular posiciones de nodos por proyecto
  useEffect(() => {
    const pos = {};
    projects.forEach(proj => {
      if (hiddenProjects.includes(proj.id)) return;
      const persons = getProjectPersons(proj.id);
      pos[proj.id] = generateNodePositions(canvasWidth, canvasHeight, proj.id, persons);
    });
    setNodePositions(pos);
  }, [canvasWidth, canvasHeight, hiddenProjects, roleFilter, search]);

  // Filtrado de personas
  const visiblePeopleIds = useMemo(() => {
    let ids = people.map(p => p.id);
    if (search) {
      ids = ids.filter(pid => people.find(p => p.id === pid).name.toLowerCase().includes(search.toLowerCase()));
    }
    if (roleFilter) {
      ids = ids.filter(pid => assignments.find(a => a.personId === pid && roles.find(r => r.id === a.roleId).name === roleFilter));
    }
    // Only show selected people
    if (selectedPeople && selectedPeople.length > 0) {
      ids = ids.filter(pid => selectedPeople.includes(pid));
    }
    return ids;
  }, [search, roleFilter, selectedPeople]);

  // Estadísticas
  const stats = useMemo(() => {
    const multiProject = people.filter(p => getPersonProjects(p.id).length > 1).length;
    const byLevel = [1, 2, 3].map(level =>
      assignments.filter(a => roles.find(r => r.id === a.roleId).level === level).length
    );
    const avgTeam = (projects.reduce((sum, p) => sum + getProjectPersons(p.id).length, 0) / projects.length).toFixed(1);
    const externalConnections = projects.map(p => {
      const team = getProjectPersons(p.id).map(p => p.id);
      const ext = getProjectPersons(p.id).filter(person => getPersonProjects(person.id).length > 1).length;
      return { projectId: p.id, external: ext };
    });
    return { multiProject, byLevel, avgTeam, externalConnections };
  }, []);

  // Conexiones entre personas
  const connections = useMemo(() => getConnections(), []);

  // Drag individual de nodos
  const handleNodeDrag = (personId, projectId, e) => {
    e.stopPropagation();
    setDraggedNode({ personId, projectId });
  };
  const handleNodeDragMove = (e) => {
    if (!draggedNode) return;
    const { personId, projectId } = draggedNode;
    setNodePositions(prev => {
      const copy = { ...prev };
      copy[projectId] = copy[projectId].map(n =>
        n.id === personId ? { ...n, x: n.x + e.movementX / zoom, y: n.y + e.movementY / zoom } : n
      );
      return copy;
    });
  };
  const handleNodeDragEnd = () => setDraggedNode(null);
  useEffect(() => {
    if (!draggedNode) return;
    window.addEventListener('mousemove', handleNodeDragMove);
    window.addEventListener('mouseup', handleNodeDragEnd);
    return () => {
      window.removeEventListener('mousemove', handleNodeDragMove);
      window.removeEventListener('mouseup', handleNodeDragEnd);
    };
  }, [draggedNode, zoom]);

  // Scroll to person in network
  function scrollToPerson(personId) {
    setSelectedPerson(personId);
    setSelectedProject(null);
    setTimeout(() => {
      const el = document.getElementById(`person-node-${personId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        el.classList.add('highlight-person');
        setTimeout(() => el.classList.remove('highlight-person'), 1200);
      }
    }, 100); // wait for panel to open and DOM to update
  }

  // Scroll to project in network
  function scrollToProject(projectId) {
    setSelectedProject(projectId);
    setSelectedPerson(null);
    setTimeout(() => {
      const el = document.getElementById(`project-area-${projectId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        el.classList.add('highlight-project');
        setTimeout(() => el.classList.remove('highlight-project'), 1200);
      }
    }, 100);
  }

  // Helper to open a project and close person panel
  function openProjectFromPerson(projectId) {
    setSelectedProject(projectId);
    setSelectedPerson(null);
  }

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', bgcolor: 'background.default', py: { xs: 0, md: 4 }, px: 0 }}>
      <Container maxWidth="xl" disableGutters sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <Paper elevation={4} sx={{ width: '100%', maxWidth: '100%', borderRadius: 4, p: { xs: 1, md: 4 }, bgcolor: 'white', mb: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Layers style={{ fontSize: 36, color: '#F43F5E' }} />
              <Box component="h1" sx={{ fontWeight: 700, fontSize: { xs: 28, md: 36 }, color: 'text.primary', letterSpacing: -1 }}>
                Red Organizacional
              </Box>
            </Box>
            {/* Controles, proyectos y estadísticas en cards separadas, uno abajo del otro */}
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Controls
                search={search}
                setSearch={setSearch}
                roleFilter={roleFilter}
                setRoleFilter={setRoleFilter}
                hiddenProjects={hiddenProjects}
                setHiddenProjects={setHiddenProjects}
                projects={projects}
                roles={roles}
                setZoom={setZoom}
                reset={reset}
                visiblePeopleIds={visiblePeopleIds}
                device={device}
                selectedPeople={selectedPeople}
                setSelectedPeople={setSelectedPeople}
                scrollToPerson={scrollToPerson}
                openProjectFromControls={openProjectFromPerson}
              />
              <StatsPanel
                people={people}
                projects={projects}
                stats={stats}
                getProjectPersons={getProjectPersons}
              />
            </Box>
          </Box>
          {/* Layout principal */}
          <Box sx={{ display: { xs: 'block', md: 'flex' }, gap: 4, width: '100%' }}>
            <Box flex={1} position="relative">
              {/* Floating zoom controls + view selector */}
              <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10, display: 'flex', flexDirection: 'row', gap: 1, bgcolor: 'rgba(255,255,255,0.85)', borderRadius: 2, boxShadow: 2, p: 0.5, alignItems: 'center' }}>
                <IconButton onClick={() => setZoom(z => Math.min(z * 1.2, 2.5))} color="primary" size="small"><ZoomIn size={20} /></IconButton>
                <IconButton onClick={() => setZoom(z => Math.max(z * 0.8, 0.3))} color="primary" size="small"><ZoomOut size={20} /></IconButton>
                <IconButton onClick={reset} color="primary" size="small"><RefreshCw size={20} /></IconButton>
                <Select
                  size="small"
                  value={view}
                  onChange={e => setView(e.target.value)}
                  sx={{ ml: 1, minWidth: 120, fontWeight: 600 }}
                >
                  <MenuItem value="network">Red</MenuItem>
                  <MenuItem value="adjacency">Matriz de adyacencia</MenuItem>
                  <MenuItem value="list">Lista de personas</MenuItem>
                  <MenuItem value="heatmap">Mapa de calor</MenuItem>
                </Select>
              </Box>
              {view === 'network' && (
                <NetworkCanvas
                  canvasRef={canvasRef}
                  canvasWidth={canvasWidth}
                  canvasHeight={canvasHeight}
                  offset={offset}
                  zoom={zoom}
                  draggedNode={draggedNode}
                  nodePositions={nodePositions}
                  projects={projects}
                  hiddenProjects={hiddenProjects}
                  visiblePeopleIds={visiblePeopleIds}
                  generateOrganicPath={generateOrganicPath}
                  getPersonProjects={getPersonProjects}
                  connections={connections}
                  setSelectedPerson={setSelectedPerson}
                  setSelectedProject={setSelectedProject}
                  handleNodeDrag={handleNodeDrag}
                />
              )}
              {view === 'adjacency' && (
                <Box sx={{ p: 4, textAlign: 'center', color: '#888' }}>Matriz de adyacencia (próximamente)</Box>
              )}
              {view === 'list' && (
                <Box sx={{ p: 4, textAlign: 'center', color: '#888' }}>Lista de personas con mini-grafos (próximamente)</Box>
              )}
              {view === 'heatmap' && (
                <Box sx={{ p: 4, textAlign: 'center', color: '#888' }}>Mapa de calor de colaboración (próximamente)</Box>
              )}
            </Box>
            {/* Panel lateral */}
            {device === 'desktop' && (
              <Box sx={{ width: 350, minWidth: 300, maxWidth: 400, ml: 2 }}>
                {selectedPerson ? (
                  <PersonPanel
                    personId={selectedPerson}
                    onClose={() => setSelectedPerson(null)}
                    getPersonProjects={getPersonProjects}
                    getPersonPeers={getPersonPeers}
                    people={people}
                    setSelectedPerson={setSelectedPerson}
                    setSelectedProject={openProjectFromPerson}
                    setSelectedRole={setSelectedRole}
                  />
                ) : selectedProject ? (
                  <ProjectPanel
                    projectId={selectedProject}
                    onClose={() => setSelectedProject(null)}
                    getProjectPersons={getProjectPersons}
                    stats={stats}
                    projects={projects}
                    setSelectedPerson={setSelectedPerson}
                    scrollToProject={scrollToProject}
                    setSelectedRole={setSelectedRole}
                  />
                ) : selectedRole ? (
                  <RolePanel
                    roleName={selectedRole}
                    onClose={() => setSelectedRole(null)}
                    people={people}
                    projects={projects}
                    assignments={assignments}
                    roles={roles}
                    setSelectedPerson={setSelectedPerson}
                    setSelectedProject={setSelectedProject}
                  />
                ) : null}
              </Box>
            )}
          </Box>
          {/* Panel detalles en tablet/mobile */}
          {device !== 'desktop' && (
            <Box width="100%" mt={2}>
              {selectedPerson ? (
                <PersonPanel
                  personId={selectedPerson}
                  onClose={() => setSelectedPerson(null)}
                  getPersonProjects={getPersonProjects}
                  getPersonPeers={getPersonPeers}
                  people={people}
                  setSelectedPerson={setSelectedPerson}
                  setSelectedProject={setSelectedProject}
                  setSelectedRole={setSelectedRole}
                />
              ) : selectedProject ? (
                <ProjectPanel
                  projectId={selectedProject}
                  onClose={() => setSelectedProject(null)}
                  getProjectPersons={getProjectPersons}
                  stats={stats}
                  projects={projects}
                  setSelectedPerson={setSelectedPerson}
                  scrollToProject={scrollToProject}
                  setSelectedRole={setSelectedRole}
                />
              ) : selectedRole ? (
                <RolePanel
                  roleName={selectedRole}
                  onClose={() => setSelectedRole(null)}
                  people={people}
                  projects={projects}
                  assignments={assignments}
                  roles={roles}
                  setSelectedPerson={setSelectedPerson}
                  setSelectedProject={setSelectedProject}
                />
              ) : null}
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
} 