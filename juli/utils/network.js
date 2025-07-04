import { people } from '../data/people';
import { projects } from '../data/projects';
import { roles } from '../data/roles';
import { assignments } from '../data/assignments';

export const getPersonProjects = (personId) => {
  return assignments
    .filter(a => a.personId === personId)
    .map(a => ({
      ...projects.find(p => p.id === a.projectId),
      role: roles.find(r => r.id === a.roleId)
    }));
};

export const getProjectPersons = (projectId) => {
  return assignments
    .filter(a => a.projectId === projectId)
    .map(a => ({
      ...people.find(p => p.id === a.personId),
      role: roles.find(r => r.id === a.roleId)
    }));
};

export const getPersonPeers = (personId) => {
  const myProjects = assignments.filter(a => a.personId === personId).map(a => a.projectId);
  const peers = assignments.filter(a => myProjects.includes(a.projectId) && a.personId !== personId)
    .map(a => a.personId);
  const peerCounts = {};
  peers.forEach(pid => { peerCounts[pid] = (peerCounts[pid] || 0) + 1; });
  return Object.entries(peerCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([pid, count]) => ({
      ...people.find(p => p.id === Number(pid)),
      sharedProjects: count
    }));
};

export const getConnections = () => {
  const connections = [];
  for (let i = 0; i < people.length; i++) {
    for (let j = i + 1; j < people.length; j++) {
      const p1 = people[i].id, p2 = people[j].id;
      const p1Projects = assignments.filter(a => a.personId === p1).map(a => a.projectId);
      const p2Projects = assignments.filter(a => a.personId === p2).map(a => a.projectId);
      const shared = p1Projects.filter(pid => p2Projects.includes(pid));
      if (shared.length > 0) {
        connections.push({ source: p1, target: p2, projects: shared });
      }
    }
  }
  return connections;
}; 