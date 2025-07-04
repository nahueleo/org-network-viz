// @ts-ignore
import OrganizationalNetworkVisualization from '../OrganizationalNetworkVisualization';
// import './App.css';

function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-sky-100 to-pink-100 flex items-center justify-center p-0 md:p-6">
      <div className="w-full max-w-7xl rounded-2xl shadow-2xl bg-white/80 backdrop-blur-md border border-white/60 p-0 md:p-4">
        <OrganizationalNetworkVisualization />
      </div>
    </div>
  );
}

export default App;
