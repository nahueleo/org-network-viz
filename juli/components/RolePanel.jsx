import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { X, User, Layers } from 'lucide-react';

export default function RolePanel({ roleName, onClose, people, projects, assignments, roles, setSelectedPerson, setSelectedProject }) {
  if (!roleName) return null;
  const role = roles.find(r => r.name === roleName);
  const peopleWithRole = people.filter(p => assignments.some(a => a.personId === p.id && roles.find(r => r.id === a.roleId)?.name === roleName));
  const projectsWithRole = projects.filter(prj => assignments.some(a => a.projectId === prj.id && roles.find(r => r.id === a.roleId)?.name === roleName));
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, minHeight: 300, bgcolor: 'background.paper' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Chip label={role.name} size="medium" sx={{ bgcolor: role.color, color: '#fff', fontWeight: 700, fontSize: 16, textTransform: 'uppercase', px: 2, py: 1 }} />
        </Stack>
        <IconButton onClick={onClose} size="small"><X /></IconButton>
      </Stack>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" fontWeight={600} mb={1}>Personas con este rol:</Typography>
      <Stack spacing={1} mb={2}>
        {peopleWithRole.length === 0 && <Typography variant="body2" color="text.secondary">Ninguna persona con este rol.</Typography>}
        {peopleWithRole.map(p => (
          <Stack key={p.id} direction="row" alignItems="center" gap={1}>
            <User size={16} style={{ color: '#888' }} />
            <Chip
              label={p.name}
              size="small"
              variant="outlined"
              clickable
              onClick={() => setSelectedPerson && setSelectedPerson(p.id)}
              sx={{ fontWeight: 500, maxWidth: 160, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', justifyContent: 'flex-start', textAlign: 'left' }}
            />
          </Stack>
        ))}
      </Stack>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" fontWeight={600} mb={1}>Proyectos con este rol:</Typography>
      <Stack spacing={1} mb={2}>
        {projectsWithRole.length === 0 && <Typography variant="body2" color="text.secondary">Ningún proyecto con este rol.</Typography>}
        {projectsWithRole.map(prj => (
          <Stack key={prj.id} direction="row" alignItems="center" gap={1}>
            <Layers style={{ color: prj.color }} size={16} />
            <Chip
              label={prj.name}
              size="small"
              variant="outlined"
              clickable
              onClick={() => setSelectedProject && setSelectedProject(prj.id)}
              sx={{ fontWeight: 600, maxWidth: 180, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', justifyContent: 'flex-start', textAlign: 'left' }}
            />
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
} 