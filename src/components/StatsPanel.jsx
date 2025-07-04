import { Star, Users, Layers, BarChart2 } from 'lucide-react';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export default function StatsPanel({ people, projects, stats, getProjectPersons }) {
  return (
    <Accordion defaultExpanded sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction="row" alignItems="center" gap={1}>
          <BarChart2 style={{ color: '#3B82F6' }} size={20} />
          <Typography fontWeight={700} fontSize={16}>Estadísticas Organizacionales</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Users style={{ color: '#6366F1' }} size={18} />
              <Typography variant="body2"><b>{people.length}</b> personas</Typography>
              <Layers style={{ color: '#F59E0B' }} size={18} />
              <Typography variant="body2"><b>{projects.length}</b> proyectos</Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Star style={{ color: '#F59E0B' }} size={18} />
              <Typography variant="body2"><b>{stats.multiProject}</b> personas en múltiples proyectos</Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2">Distribución por nivel:</Typography>
              <Box sx={{ fontFamily: 'monospace', bgcolor: '#F3F4F6', px: 1, borderRadius: 1 }}>{stats.byLevel.join(' / ')}</Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2">Promedio de equipo:</Typography>
              <Box sx={{ fontFamily: 'monospace', bgcolor: '#F3F4F6', px: 1, borderRadius: 1 }}>{stats.avgTeam}</Box>
            </Stack>
            <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
              {projects.map(p => (
                <Paper key={p.id} sx={{ px: 1.5, py: 0.5, borderRadius: 1, bgcolor: p.color, color: '#fff', fontSize: 13, display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  {p.name} <span style={{ background: '#fff', color: '#222', borderRadius: 4, padding: '0 6px', marginLeft: 6 }}>{getProjectPersons(p.id).length}</span>
                </Paper>
              ))}
            </Stack>
          </Stack>
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
} 