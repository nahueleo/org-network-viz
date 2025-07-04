import { Layers, X, Users, Star, Eye, User } from 'lucide-react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { roles } from '../data/roles';

export default function ProjectPanel({ projectId, onClose, getProjectPersons, stats, projects, setSelectedPerson, scrollToProject, setSelectedRole }) {
  if (!projectId) return null;
  const project = projects.find(p => p.id === projectId);
  const team = getProjectPersons(project.id);
  const byLevel = [1, 2, 3].map(level => ({
    level,
    members: team.filter(m => m.role.level === level)
  }));
  const extConnections = stats.externalConnections.find(e => e.projectId === project.id)?.external || 0;
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, minHeight: 400, bgcolor: 'background.paper' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Layers style={{ color: project.color }} />
          <Typography variant="h6" fontWeight={700}>{project.name}</Typography>
        </Stack>
        <IconButton onClick={onClose} size="small"><X /></IconButton>
      </Stack>
      <Typography variant="body2" color="text.secondary" mb={2}>{project.description}</Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" fontWeight={600} mb={1}>Equipo por jerarquía:</Typography>
      <Stack spacing={2} mb={2}>
        {byLevel.map(lvl => (
          <Box key={lvl.level} mb={1.5}>
            <Typography variant="caption" color="text.secondary">Nivel {lvl.level}:</Typography>
            <Stack direction="column" spacing={1} mt={0.5}>
              {lvl.members.map(m => {
                const roleColor = roles.find(r => r.name === m.role.name)?.color || '#888';
                return (
                  <Stack direction="row" alignItems="center" spacing={1} key={m.id}>
                    <User size={16} style={{ color: '#888' }} />
                    <Chip
                      label={m.name}
                      size="small"
                      variant="outlined"
                      clickable
                      onClick={() => setSelectedPerson(m.id)}
                      sx={{ fontWeight: 500, maxWidth: 160, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', justifyContent: 'flex-start', textAlign: 'left' }}
                    />
                    <Chip
                      label={m.role.name}
                      size="small"
                      onClick={() => {
                        if (onClose) onClose();
                        setSelectedRole && setSelectedRole(m.role.name);
                      }}
                      sx={{
                        bgcolor: roleColor,
                        color: '#fff',
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        ml: 1,
                        textTransform: 'uppercase',
                        maxWidth: 120,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        opacity: 0.95,
                        ':hover': { opacity: 1, boxShadow: 2 },
                      }}
                    />
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        ))}
      </Stack>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" fontWeight={600} mb={1}>Estadísticas:</Typography>
      <Stack spacing={1} mb={2} alignItems="flex-start" sx={{ width: '100%' }}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Users style={{ color: '#3B82F6' }} size={18} />
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1 }}>{team.length} miembros</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <Star style={{ color: '#F59E0B' }} size={18} />
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1 }}>{extConnections} conexiones externas</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
} 