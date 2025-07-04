import { User, Layers, X } from 'lucide-react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

export default function PersonPanel({ personId, onClose, getPersonProjects, getPersonPeers, people, setSelectedPerson, setSelectedProject, setSelectedRole }) {
  if (!personId) return null;
  const person = people.find(p => p.id === personId);
  const projectsList = getPersonProjects(person.id);
  const peers = getPersonPeers(person.id);
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4, minHeight: 400, bgcolor: 'background.paper' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Stack direction="row" alignItems="center" gap={1}>
          <User style={{ color: '#3B82F6' }} />
          <Typography variant="h6" fontWeight={700}>{person.name}</Typography>
        </Stack>
      </Stack>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Email: <Box component="span" fontFamily="monospace">{person.name.toLowerCase().replace(/ /g, '.')}@org.com</Box>
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" fontWeight={600} mb={1}>Proyectos y roles:</Typography>
      <Stack spacing={1} mb={2}>
        {projectsList.map(pj => (
          <Stack key={pj.id} direction="row" alignItems="center" gap={1}>
            <Layers style={{ color: pj.color }} size={18} />
            <Chip
              label={pj.name}
              size="small"
              variant="outlined"
              onClick={() => setSelectedProject && setSelectedProject(pj.id)}
              sx={{ cursor: 'pointer', fontWeight: 600 }}
            />
            <Chip label={pj.role.name} size="small" sx={{ bgcolor: pj.role.color, color: '#fff', fontWeight: 600, cursor: 'pointer', opacity: 0.95, ':hover': { opacity: 1, boxShadow: 2 } }} onClick={() => { if (onClose) onClose(); setSelectedRole && setSelectedRole(pj.role.name); }} />
          </Stack>
        ))}
      </Stack>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" fontWeight={600} mb={1}>Colaboradores frecuentes:</Typography>
      <Stack spacing={1} mb={2}>
        {peers.slice(0, 8).map(peer => (
          <Stack key={peer.id} direction="row" alignItems="center" gap={1}>
            <User style={{ color: '#888' }} size={16} />
            <Chip
              label={peer.name}
              size="small"
              variant="outlined"
              onClick={() => setSelectedPerson && setSelectedPerson(peer.id)}
              sx={{ cursor: 'pointer', fontWeight: 500 }}
            />
            <Typography variant="caption" color="text.secondary">({peer.sharedProjects} proyectos)</Typography>
          </Stack>
        ))}
      </Stack>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" fontWeight={600} mb={1}>Jerarquía de roles:</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" mb={2} sx={{ maxWidth: '100%', overflow: 'hidden' }}>
        {[...new Set(projectsList.map(pj => pj.role.name))].map(role => (
          <Chip key={role} label={role} size="small" variant="outlined" sx={{ maxWidth: 120, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} />
        ))}
      </Stack>
    </Paper>
  );
} 