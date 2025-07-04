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
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';

export default function AdjacencyMatrix({ people, assignments, projects, visiblePeopleIds, setSelectedPerson, setSelectedProject }) {
  const theme = useTheme();
  // Solo personas visibles
  const visiblePeople = people.filter(p => visiblePeopleIds.includes(p.id));

  // Mapa de persona a proyectos
  const personProjects = Object.fromEntries(
    visiblePeople.map(p => [p.id, assignments.filter(a => a.personId === p.id).map(a => a.projectId)])
  );

  // Calcula la matriz y los proyectos compartidos
  const getSharedProjects = (id1, id2) => {
    if (id1 === id2) return [];
    const set1 = new Set(personProjects[id1]);
    const set2 = new Set(personProjects[id2]);
    return projects.filter(prj => set1.has(prj.id) && set2.has(prj.id));
  };

  return (
    <Box sx={{ overflowX: 'auto', maxHeight: 600, width: '100%', pr: { md: 40, xs: 0 } }}>
      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  position: 'sticky',
                  left: 0,
                  top: 0,
                  zIndex: 4,
                  bgcolor: theme.palette.background.paper,
                  minWidth: 140,
                  boxShadow: '2px 0 4px -2px rgba(0,0,0,0.04)',
                }}
              ></TableCell>
              {visiblePeople.map(p => {
                const initials = p.name.split(' ').map(w => w[0]).join('');
                return (
                  <TableCell
                    key={p.id}
                    align="center"
                    sx={{
                      position: 'sticky',
                      top: 0,
                      zIndex: 3,
                      bgcolor: theme.palette.background.paper,
                      fontWeight: 700,
                    }}
                  >
                    <Tooltip title={p.name} arrow>
                      <Box
                        component="span"
                        onClick={() => setSelectedPerson && setSelectedPerson(p.id)}
                        sx={{
                          fontWeight: 700,
                          fontSize: 13,
                          color: theme.palette.text.primary,
                          cursor: 'pointer',
                          borderRadius: 1,
                          px: 0.5,
                          transition: 'background 0.2s, color 0.2s',
                          '&:hover': {
                            bgcolor: theme.palette.action.hover,
                            color: theme.palette.text.secondary,
                          },
                          userSelect: 'none',
                        }}
                      >
                        {initials}
                      </Box>
                    </Tooltip>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {visiblePeople.map((row, rowIdx) => (
              <TableRow key={row.id} hover>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    position: 'sticky',
                    left: 0,
                    zIndex: 2,
                    bgcolor: theme.palette.background.paper,
                    fontWeight: 700,
                    minWidth: 140,
                    boxShadow: '2px 0 4px -2px rgba(0,0,0,0.04)',
                  }}
                >
                  <Tooltip title={row.name} arrow>
                    <Box
                      component="span"
                      onClick={() => setSelectedPerson && setSelectedPerson(row.id)}
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        cursor: 'pointer',
                        borderRadius: 1,
                        px: 0.5,
                        transition: 'background 0.2s, color 0.2s',
                        '&:hover': {
                          bgcolor: theme.palette.action.hover,
                          color: theme.palette.text.secondary,
                        },
                        userSelect: 'none',
                      }}
                    >
                      {row.name}
                    </Box>
                  </Tooltip>
                </TableCell>
                {visiblePeople.map(col => {
                  const sharedProjects = getSharedProjects(row.id, col.id);
                  return (
                    <TableCell key={col.id} align="center" sx={{ bgcolor: sharedProjects.length > 0 ? theme.palette.action.selected : undefined }}>
                      {sharedProjects.length > 0 && <CheckCircleIcon color="success" fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />}
                      {sharedProjects.length > 0 ? (
                        <Tooltip
                          title={
                            <Box>
                              {sharedProjects.map(prj => (
                                <Link
                                  key={prj.id}
                                  underline="hover"
                                  sx={{ cursor: 'pointer', color: theme.palette.text.primary, fontWeight: 600, display: 'block', '&:hover': { color: theme.palette.text.secondary } }}
                                  onClick={e => { e.stopPropagation(); setSelectedProject && setSelectedProject(prj.id); }}
                                >
                                  {prj.name}
                                </Link>
                              ))}
                            </Box>
                          }
                          arrow
                        >
                          <b style={{ cursor: 'pointer', color: theme.palette.text.primary }}>{sharedProjects.length}</b>
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