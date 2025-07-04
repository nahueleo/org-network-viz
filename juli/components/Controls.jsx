import { Filter, ZoomIn, ZoomOut, RefreshCw, Eye } from 'lucide-react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useMemo, useEffect } from 'react';
import { people } from '../data/people';
import { assignments } from '../data/assignments';
import { projects } from '../data/projects';
import { roles } from '../data/roles';
import Chip from '@mui/material/Chip';
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';

export default function Controls({ search, setSearch, roleFilter, setRoleFilter, hiddenProjects, setHiddenProjects, projects: projectsProp, roles: rolesProp, setZoom, reset, visiblePeopleIds, device, selectedPeople, setSelectedPeople, scrollToPerson, openProjectFromControls }) {
  // State for accordion
  const [peopleOpen, setPeopleOpen] = useState(true);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [internalSearch, setInternalSearch] = useState('');

  // Filtered people for grid
  const filteredPeople = useMemo(() => {
    let arr = [...people];
    if (internalSearch) {
      arr = arr.filter(p => p.name.toLowerCase().includes(internalSearch.toLowerCase()));
    }
    if (roleFilter) {
      arr = arr.filter(p => assignments.some(a => a.personId === p.id && roles.find(r => r.id === a.roleId).name === roleFilter));
    }
    return arr;
  }, [internalSearch, roleFilter]);

  // All visible people selected by default ONLY on first load
  useEffect(() => {
    if (selectedPeople.length === 0 && filteredPeople.length > 0) {
      setSelectedPeople(filteredPeople.map(p => p.id));
    }
    // eslint-disable-next-line
  }, []);

  // DataGrid rows
  const rows = filteredPeople.map(p => {
    const personAssignments = assignments.filter(a => a.personId === p.id);
    const personProjects = personAssignments.map(a => projects.find(pr => pr.id === a.projectId));
    const personRoles = personAssignments.map(a => roles.find(r => r.id === a.roleId));
    return {
      id: p.id,
      name: p.name,
      projects: personProjects,
      roles: personRoles
    };
  });

  const columns = [
    { field: 'name', headerName: 'Nombre', flex: 1, minWidth: 120 },
    {
      field: 'projects',
      headerName: 'Proyectos',
      flex: 2,
      minWidth: 180,
      renderCell: params => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Stack direction="row" spacing={0.5} flexWrap="wrap">
            {params.value.map(pj => (
              <Chip key={pj.id} label={pj.name} size="small" sx={{ bgcolor: pj.color, color: '#fff', fontWeight: 600 }} />
            ))}
          </Stack>
        </Box>
      )
    },
    {
      field: 'roles',
      headerName: 'Roles',
      flex: 1.5,
      minWidth: 120,
      renderCell: params => {
        // Show each role only once
        const uniqueRoles = [];
        const seen = new Set();
        params.value.forEach(role => {
          if (!seen.has(role.name)) {
            uniqueRoles.push(role);
            seen.add(role.name);
          }
        });
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Stack direction="row" spacing={0.5} flexWrap="wrap">
              {uniqueRoles.map((role, i) => (
                <Chip key={i} label={role.name} size="small" sx={{ bgcolor: role.color, color: '#fff', fontWeight: 600 }} />
              ))}
            </Stack>
          </Box>
        );
      }
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      filterable: false,
      width: 60,
      align: 'center',
      headerAlign: 'center',
      renderCell: params => (
        <Tooltip title="Ver más" arrow>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <IconButton
              size="small"
              onClick={() => scrollToPerson && scrollToPerson(params.row.id)}
              sx={{ m: 0, p: 0.5 }}
            >
              <Eye size={20} />
            </IconButton>
          </Box>
        </Tooltip>
      )
    }
  ];

  return (
    <Stack spacing={2}>
      {/* Collapsible people grid with search inside */}
      <Accordion expanded={peopleOpen} onChange={() => setPeopleOpen(o => !o)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Personas (selección múltiple)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Stack direction={device === 'mobile' ? 'column' : 'row'} spacing={2} alignItems="center" flexWrap="wrap">
              <TextField
                size="small"
                variant="outlined"
                label="Buscar persona"
                value={internalSearch}
                onChange={e => setInternalSearch(e.target.value)}
                sx={{ minWidth: 180, bgcolor: 'white', borderRadius: 1 }}
              />
              <Box minWidth={160}>
                <Select
                  size="small"
                  value={roleFilter}
                  displayEmpty
                  onChange={e => setRoleFilter(e.target.value)}
                  startAdornment={<Filter style={{ marginRight: 8, color: '#888' }} size={18} />}
                  sx={{ bgcolor: 'white', borderRadius: 1, width: '100%' }}
                >
                  <MenuItem value=""><em>Todos los roles</em></MenuItem>
                  {rolesProp.map(r => <MenuItem key={r.id} value={r.name}>{r.name}</MenuItem>)}
                </Select>
              </Box>
            </Stack>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
                rowsPerPageOptions={[5, 10, 20, 50]}
                pagination
                selectionModel={selectedPeople}
                onSelectionModelChange={ids => setSelectedPeople(ids)}
                sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
                getRowHeight={() => 48}
              />
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>
      {/* Collapsible project filter */}
      <Accordion expanded={projectsOpen} onChange={() => setProjectsOpen(o => !o)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Proyectos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {projectsProp.map(p => (
              <Stack key={p.id} direction="row" alignItems="center" spacing={1} mb={1} mt={0.5}>
                <Button
                  size="small"
                  variant={hiddenProjects.includes(p.id) ? 'outlined' : 'contained'}
                  style={{ borderColor: p.color, color: hiddenProjects.includes(p.id) ? p.color : '#fff', background: hiddenProjects.includes(p.id) ? '#fff' : p.color, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}
                  onClick={() => setHiddenProjects(hp => hp.includes(p.id) ? hp.filter(id => id !== p.id) : [...hp, p.id])}
                >
                  {p.name}
                </Button>
                <IconButton size="small" onClick={e => { e.stopPropagation(); openProjectFromControls && openProjectFromControls(p.id); }} sx={{ ml: 0.5, p: 0.5 }}>
                  <Eye size={18} />
                </IconButton>
              </Stack>
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
} 