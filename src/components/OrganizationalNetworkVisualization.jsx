import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Layers, ZoomIn, ZoomOut, RefreshCw, Filter } from 'lucide-react';
import { people } from "../data/people";
import { projects } from "../data/projects";
import { roles } from "../data/roles";
import { assignments } from "../data/assignments";
import { getPersonProjects, getProjectPersons, getPersonPeers, getConnections } from '../utils/network';
import { generateNodePositions, generateOrganicPath } from '../utils/layout';
import { useZoomPan } from '../hooks/useZoomPan';
import PersonPanel from './PersonPanel';
import ProjectPanel from './ProjectPanel';
import StatsPanel from './StatsPanel';
import Controls from './Controls';
import NetworkCanvas from './NetworkCanvas';
import RolePanel from './RolePanel';
import AdjacencyMatrix from './AdjacencyMatrix';
import HeatmapMatrix from './HeatmapMatrix';
// Material UI
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

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
  const [selectedProject, setSelectedProject] = useState(projects.length > 0 ? projects[0].id : null); // projectId
  const [draggedNode, setDraggedNode] = useState(null); // {personId, projectId}
  const [nodePositions, setNodePositions] = useState({}); // {projectId: [{...person, x, y}]}
  const [selectedPeople, setSelectedPeople] = useState([]); // for people grid selection
  const [selectedRoles, setSelectedRoles] = useState(roles.map(r => r.id)); // para filtro múltiple de roles
  const [selectedRole, setSelectedRole] = useState(null);
  const [view, setView] = useState('network');
  const [openSidebar, setOpenSidebar] = useState(true);
  const [listRoleFilter, setListRoleFilter] = useState('');
  const [listProjectFilter, setListProjectFilter] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  // Estado de paginación para el listado de personas
  const [personListPage, setPersonListPage] = useState(0);

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
    // Filtro por roles seleccionados (multi)
    if (selectedRoles && selectedRoles.length > 0) {
      ids = ids.filter(pid => assignments.some(a => a.personId === pid && selectedRoles.includes(a.roleId)));
    }
    if (roleFilter) {
      ids = ids.filter(pid => assignments.find(a => a.personId === pid && roles.find(r => r.id === a.roleId).name === roleFilter));
    }
    // Only show selected people
    if (selectedPeople && selectedPeople.length > 0) {
      ids = ids.filter(pid => selectedPeople.includes(pid));
    }
    return ids;
  }, [search, roleFilter, selectedPeople, selectedRoles, assignments, roles, people]);

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
    setOpenSidebar(true);
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
    setOpenSidebar(true);
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
    setOpenSidebar(true);
  }

  // Si no hay nada seleccionado, selecciona el primer proyecto automáticamente
  useEffect(() => {
    if (!selectedPerson && !selectedProject && !selectedRole && projects.length > 0) {
      setSelectedProject(projects[0].id);
    }
  }, [selectedPerson, selectedProject, selectedRole, projects]);

  // Selecciona todos los roles por defecto al cargar/cambiar roles, pero no fuerza si el usuario deselecciona todos
  useEffect(() => {
    if (selectedRoles.length === 0 && roles.length > 0) {
      setSelectedRoles(roles.map(r => r.id));
    }
  }, [roles]);

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', bgcolor: 'background.default', py: { xs: 0, md: 4 }, px: 0 }}>
      <Box sx={{ maxWidth: 'xl', mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, px: { xs: 1, md: 4 } }}>
        <Box sx={{ mb: 2, width: '100%' }}>
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
              selectedRoles={selectedRoles}
              setSelectedRoles={setSelectedRoles}
              scrollToPerson={scrollToPerson}
              openProjectFromControls={openProjectFromPerson}
              open={filtersOpen}
              setOpen={setFiltersOpen}
            />
            <StatsPanel
              people={people}
              projects={projects}
              stats={stats}
              getProjectPersons={getProjectPersons}
              onSelectProject={id => {
                setSelectedProject(id);
                setSelectedPerson(null);
                setSelectedRole(null);
                setOpenSidebar(true);
              }}
            />
          </Box>
        </Box>
        {/* Layout principal: Card gráfico a la izquierda, panel lateral a la derecha */}
        <Box sx={{ display: { xs: 'block', md: 'flex' }, gap: 4, width: '100%', position: 'relative' }}>
          {/* Card contenedor de gráficos (70% o 100% si sidebar cerrado) */}
          <Box sx={{ flex: openSidebar && device === 'desktop' ? 7 : 1, minWidth: 0, transition: 'flex 0.3s' }}>
            <Card sx={{ width: '100%', mb: 2, boxShadow: 3, borderRadius: 4 }}>
              <CardHeader
                title="Visualización de Red"
                action={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Select
                      size="small"
                      value={view}
                      onChange={e => setView(e.target.value)}
                      sx={{ minWidth: 160, fontWeight: 600 }}
                    >
                      <MenuItem value="network">Red</MenuItem>
                      <MenuItem value="adjacency">Matriz de adyacencia</MenuItem>
                      <MenuItem value="list">Lista de personas</MenuItem>
                      <MenuItem value="heatmap">Mapa de calor</MenuItem>
                    </Select>
                    <IconButton onClick={() => setFiltersOpen(true)} sx={{ ml: 1 }}>
                      <Filter size={22} />
                    </IconButton>
                  </Box>
                }
                sx={{ pb: 0, pt: 2, pl: 3, pr: 3 }}
              />
              <CardContent sx={{ pt: 1 }}>
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
                    setSelectedPerson={id => { setSelectedPerson(id); setSelectedProject(null); setOpenSidebar(true); }}
                    setSelectedProject={id => { setSelectedProject(id); setSelectedPerson(null); setOpenSidebar(true); }}
                    handleNodeDrag={handleNodeDrag}
                  />
                )}
                {view === 'adjacency' && (
                  <Box sx={{ maxHeight: 600, overflow: 'auto', width: '100%' }}>
                    <AdjacencyMatrix
                      people={people}
                      assignments={assignments}
                      projects={projects}
                      visiblePeopleIds={visiblePeopleIds}
                      setSelectedPerson={id => { setSelectedPerson(id); setSelectedProject(null); setOpenSidebar(true); }}
                      setSelectedProject={id => { setSelectedProject(id); setSelectedPerson(null); setOpenSidebar(true); }}
                    />
                  </Box>
                )}
                {view === 'list' && (
                  <Box>
                    {/* Paginación: mostrar solo dos filas de personas por página */}
                    {(() => {
                      const peoplePerRow = 4; // 4 cards per row (ajustable)
                      const rowsPerPage = 2;
                      const peoplePerPage = peoplePerRow * rowsPerPage;
                      const filteredPeople = people
                        .filter(p => visiblePeopleIds.includes(p.id))
                        .filter(p => {
                          if (selectedRoles && selectedRoles.length > 0) {
                            return assignments.some(a => a.personId === p.id && selectedRoles.includes(a.roleId));
                          }
                          return true;
                        })
                        .filter(p => {
                          const personProjects = assignments.filter(a => a.personId === p.id).map(a => a.projectId);
                          const visibleProjects = projects.filter(prj => !hiddenProjects.includes(prj.id)).map(prj => prj.id);
                          return personProjects.some(pid => visibleProjects.includes(pid));
                        });
                      const pageCount = Math.ceil(filteredPeople.length / peoplePerPage);
                      const pagedPeople = filteredPeople.slice(personListPage * peoplePerPage, (personListPage + 1) * peoplePerPage);
                      // Si el filtro cambia y la página actual queda fuera de rango, volver a la primera página
                      if (personListPage >= pageCount && pageCount > 0) {
                        setPersonListPage(0);
                      }
                      return (
                        <>
                          <Grid container spacing={2} justifyContent="center" alignItems="stretch">
                            {pagedPeople.map(person => {
                              const personAssignments = assignments.filter(a => a.personId === person.id);
                              const personProjects = personAssignments.map(a => projects.find(pr => pr.id === a.projectId)).filter(Boolean);
                              const personRoles = personAssignments.map(a => roles.find(r => r.id === a.roleId)).filter(Boolean);
                              return (
                                <Grid item key={person.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: 280 }}>
                                  <Card sx={{ width: '100%', height: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, borderRadius: 4 }}>
                                    <Avatar sx={{ bgcolor: person.color || 'primary.main', width: 56, height: 56, fontWeight: 700, fontSize: 24, mb: 1 }}>
                                      {person.name.split(' ').map(w => w[0]).join('')}
                                    </Avatar>
                                    <CardContent sx={{ textAlign: 'center', p: 1, flex: 1, width: '100%', minWidth: 0 }}>
                                      <div style={{ fontWeight: 700, fontSize: 18 }}>{person.name}</div>
                                      <Box sx={{ maxHeight: 48, overflowY: 'auto', width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: 1, mb: 1 }}>
                                        {personRoles.map((role, i) => (
                                          <Chip key={i} label={role.name} size="small" sx={{ bgcolor: role.color, color: '#fff', fontWeight: 600, m: 0.25 }} />
                                        ))}
                                      </Box>
                                      <Box sx={{ maxHeight: 48, overflowY: 'auto', width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                        {personProjects.map((prj, i) => (
                                          <Chip key={i} label={prj.name} size="small" sx={{ bgcolor: prj.color, color: '#fff', fontWeight: 600, m: 0.25 }} />
                                        ))}
                                      </Box>
                                    </CardContent>
                                    <CardActions>
                                      <Button size="small" variant="outlined" onClick={() => { setSelectedPerson(person.id); setSelectedProject(null); setOpenSidebar(true); }}>Ver más</Button>
                                    </CardActions>
                                  </Card>
                                </Grid>
                              );
                            })}
                          </Grid>
                          {/* Controles de paginación */}
                          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, gap: 2 }}>
                            <Button variant="outlined" size="small" disabled={personListPage === 0} onClick={() => setPersonListPage(personListPage - 1)}>Anterior</Button>
                            <span>Página {personListPage + 1} de {pageCount}</span>
                            <Button variant="outlined" size="small" disabled={personListPage + 1 >= pageCount} onClick={() => setPersonListPage(personListPage + 1)}>Siguiente</Button>
                          </Box>
                        </>
                      );
                    })()}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
          {/* Panel lateral fijo */}
          <Box sx={{ flex: openSidebar && device === 'desktop' ? 3 : 0, minWidth: 0, transition: 'flex 0.3s', position: 'relative' }}>
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
            ) : (
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary', px: 2, textAlign: 'center' }}>
                <span>Seleccione una persona, proyecto o rol para ver más datos</span>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
} 