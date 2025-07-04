import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';

// Utilidad para interpolar color (de gris claro a rojo intenso)
function getHeatColor(value, max) {
  if (value === 0) return '#f5f5f5';
  // Interpola de gris claro (#f5f5f5) a rojo (#d32f2f)
  const percent = max > 0 ? value / max : 0;
  const r = Math.round(245 + percent * (211 - 245));
  const g = Math.round(245 + percent * (47 - 245));
  const b = Math.round(245 + percent * (47 - 245));
  return `rgb(${r},${g},${b})`;
}

export default function HeatmapMatrix({ people, assignments, projects, visiblePeopleIds }) {
  const theme = useTheme();
  const visiblePeople = people.filter(p => visiblePeopleIds.includes(p.id));

  // Para cada persona y proyecto, cuenta cuántos roles tiene en ese proyecto
  const personProjectRoles = {};
  let maxRoles = 0;
  visiblePeople.forEach(person => {
    personProjectRoles[person.id] = {};
    projects.forEach(project => {
      const roles = assignments.filter(a => a.personId === person.id && a.projectId === project.id);
      personProjectRoles[person.id][project.id] = roles;
      if (roles.length > maxRoles) maxRoles = roles.length;
    });
  });

  return (
    <Box sx={{ overflowX: 'auto', maxHeight: 600, width: '100%' }}>
      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {projects.map(project => (
                <TableCell key={project.id} align="center" sx={{ fontWeight: 700 }}>{project.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visiblePeople.map(person => (
              <TableRow key={person.id} hover>
                <TableCell component="th" scope="row" sx={{ fontWeight: 700 }}>{person.name}</TableCell>
                {projects.map(project => {
                  const roles = personProjectRoles[person.id][project.id];
                  const count = roles.length;
                  return (
                    <TableCell
                      key={project.id}
                      align="center"
                      sx={{ bgcolor: getHeatColor(count, maxRoles), fontWeight: count > 0 ? 700 : 400, color: count > 0 ? '#fff' : theme.palette.text.secondary, transition: 'background 0.2s' }}
                    >
                      {count > 0 ? (
                        <Tooltip
                          title={
                            <Box>
                              {roles.map((a, i) => (
                                <Box key={i}>{a.roleName || a.roleId}</Box>
                              ))}
                            </Box>
                          }
                          arrow
                        >
                          <span>{count > 1 ? count : <CheckCircleIcon fontSize="small" sx={{ color: '#fff', verticalAlign: 'middle' }} />}</span>
                        </Tooltip>
                      ) : ''}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 