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

export default function Controls({ search, setSearch, roleFilter, setRoleFilter, hiddenProjects, setHiddenProjects, projects: projectsProp, roles: rolesProp, setZoom, reset, visiblePeopleIds, device, selectedPeople, setSelectedPeople, scrollToPerson, openProjectFromControls }) {
  const [open, setOpen] = useState(false);
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
      {/* Botón flotante para abrir menú de filtros */}
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          top: 120,
          left: 24,
          zIndex: 2000,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: 2,
          '&:hover': { bgcolor: 'grey.100' },
        }}
      >
        <Filter size={22} />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: 320, maxWidth: '90vw', p: 2 } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={700} flex={1}>Filtros</Typography>
          <IconButton onClick={() => setOpen(false)}><ChevronLeftIcon /></IconButton>
        </Box>
        <Stack spacing={3}>
          {/* Selección múltiple de personas */}
          <Box>
            <Typography fontWeight={600} mb={1} variant="subtitle2">Personas visibles</Typography>
            <Stack spacing={1} maxHeight={180} sx={{ overflowY: 'auto' }}>
              {people.map(p => {
                const isSelected = selectedPeople.includes(p.id);
                return (
                  <Chip
                    key={p.id}
                    label={p.name}
                    color={isSelected ? 'primary' : 'default'}
                    variant={isSelected ? 'filled' : 'outlined'}
                    onClick={() => setSelectedPeople(isSelected ? selectedPeople.filter(id => id !== p.id) : [...selectedPeople, p.id])}
                    sx={{ fontWeight: 600, cursor: 'pointer', bgcolor: isSelected ? p.color : undefined, color: isSelected ? '#fff' : undefined, mb: 0.5 }}
                  />
                );
              })}
            </Stack>
          </Box>
          {/* Filtro de proyectos */}
          <Box>
            <Typography fontWeight={600} mb={1} variant="subtitle2">Proyectos</Typography>
            <Stack spacing={1} maxHeight={120} sx={{ overflowY: 'auto' }}>
              {projectsProp.map(p => (
                <Chip
                  key={p.id}
                  label={p.name}
                  color={hiddenProjects.includes(p.id) ? 'default' : 'primary'}
                  variant={hiddenProjects.includes(p.id) ? 'outlined' : 'filled'}
                  onClick={() => setHiddenProjects(hp => hp.includes(p.id) ? hp.filter(id => id !== p.id) : [...hp, p.id])}
                  sx={{ fontWeight: 600, cursor: 'pointer', bgcolor: hiddenProjects.includes(p.id) ? undefined : p.color, color: hiddenProjects.includes(p.id) ? undefined : '#fff' }}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </Drawer>
    </>
  );
} 