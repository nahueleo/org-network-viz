import { Filter, Eye } from 'lucide-react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState, useMemo, useEffect } from 'react';
import { people } from '../data/people';
import { assignments } from '../data/assignments';
import { projects } from '../data/projects';
import { roles } from '../data/roles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';

export default function Controls({ search, setSearch, roleFilter, setRoleFilter, hiddenProjects, setHiddenProjects, projects: projectsProp, roles: rolesProp, setZoom, reset, visiblePeopleIds, device, selectedPeople, setSelectedPeople, selectedRoles, setSelectedRoles, scrollToPerson, openProjectFromControls, open: openProp, setOpen: setOpenProp }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = typeof openProp === 'boolean' ? openProp : internalOpen;
  const setOpen = setOpenProp || setInternalOpen;
  const [internalSearch, setInternalSearch] = useState('');
  const theme = useTheme();

  // Selecciona todos por defecto al abrir/cambiar filtro, pero no fuerza si el usuario deselecciona todos
  useEffect(() => {
    if (selectedPeople.length === 0 && visiblePeopleIds.length > 0) {
      setSelectedPeople(visiblePeopleIds);
    }
  }, [visiblePeopleIds]);

  return (
    <>
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: 320, maxWidth: '90vw', p: 2, height: '100vh', display: 'flex', flexDirection: 'column' } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={700} flex={1}>Filtros</Typography>
          <IconButton onClick={() => setOpen(false)}><ChevronLeftIcon /></IconButton>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, minHeight: 0 }}>
          {/* Selección múltiple de personas */}
          <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography fontWeight={600} variant="subtitle2" flex={1}>Personas visibles</Typography>
              <Button size="small" variant="text" onClick={() => setSelectedPeople(selectedPeople.length === people.length ? [] : people.map(p => p.id))} sx={{ minWidth: 0, px: 1 }}>
                {selectedPeople.length === people.length ? 'Ninguno' : 'Todos'}
              </Button>
            </Box>
            <Box display="flex" flexWrap="wrap" width="100%" sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
              {people.map(p => {
                const isSelected = selectedPeople.includes(p.id);
                return (
                  <Chip
                    key={p.id}
                    label={p.name}
                    color={isSelected ? 'primary' : 'default'}
                    variant={isSelected ? 'filled' : 'outlined'}
                    onClick={() => setSelectedPeople(isSelected ? selectedPeople.filter(id => id !== p.id) : [...selectedPeople, p.id])}
                    sx={{
                      fontWeight: 600,
                      cursor: 'pointer',
                      bgcolor: isSelected ? p.color : undefined,
                      color: isSelected ? '#fff' : undefined,
                      mb: 0.5,
                      mr: 0.5,
                      flex: '1 1 100%',
                      minWidth: 0,
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                    }}
                  />
                );
              })}
            </Box>
          </Box>
          {/* Filtro de roles */}
          <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography fontWeight={600} variant="subtitle2" flex={1}>Roles</Typography>
              <Button size="small" variant="text" onClick={() => setSelectedRoles(selectedRoles.length === roles.length ? [] : roles.map(r => r.id))} sx={{ minWidth: 0, px: 1 }}>
                {selectedRoles.length === roles.length ? 'Ninguno' : 'Todos'}
              </Button>
            </Box>
            <Box display="flex" flexWrap="wrap" width="100%" sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
              {roles.map(r => {
                const safeSelectedRoles = Array.isArray(selectedRoles) ? selectedRoles : [];
                const isSelected = safeSelectedRoles.includes(r.id);
                return (
                  <Chip
                    key={r.id}
                    label={r.name}
                    color={isSelected ? 'primary' : 'default'}
                    variant={isSelected ? 'filled' : 'outlined'}
                    onClick={() => setSelectedRoles(isSelected ? safeSelectedRoles.filter(id => id !== r.id) : [...safeSelectedRoles, r.id])}
                    sx={{
                      fontWeight: 600,
                      cursor: 'pointer',
                      bgcolor: isSelected ? r.color : undefined,
                      color: isSelected ? '#fff' : undefined,
                      mb: 0.5,
                      mr: 0.5,
                      flex: '1 1 100%',
                      minWidth: 0,
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                    }}
                  />
                );
              })}
            </Box>
          </Box>
          {/* Filtro de proyectos */}
          <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography fontWeight={600} variant="subtitle2" flex={1}>Proyectos</Typography>
              <Button size="small" variant="text" onClick={() => setHiddenProjects(hiddenProjects.length === 0 ? projectsProp.map(p => p.id) : [])} sx={{ minWidth: 0, px: 1 }}>
                {hiddenProjects.length === 0 ? 'Ninguno' : 'Todos'}
              </Button>
            </Box>
            <Box display="flex" flexWrap="wrap" width="100%" sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
              {projectsProp.map(p => (
                <Chip
                  key={p.id}
                  label={p.name}
                  color={hiddenProjects.includes(p.id) ? 'default' : 'primary'}
                  variant={hiddenProjects.includes(p.id) ? 'outlined' : 'filled'}
                  onClick={() => setHiddenProjects(hp => hp.includes(p.id) ? hp.filter(id => id !== p.id) : [...hp, p.id])}
                  sx={{
                    fontWeight: 600,
                    cursor: 'pointer',
                    bgcolor: hiddenProjects.includes(p.id) ? undefined : p.color,
                    color: hiddenProjects.includes(p.id) ? undefined : '#fff',
                    mb: 0.5,
                    mr: 0.5,
                    flex: '1 1 100%',
                    minWidth: 0,
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
} 