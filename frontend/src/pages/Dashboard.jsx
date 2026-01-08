import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [filters, setFilters] = useState({
    topic: "",
    difficulty: "",
  });

  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    difficulty: "Easy",
  });

  const [stats, setStats] = useState({
  total: 0,
  solved: 0,
  inProgress: 0,
  notStarted: 0,
  });


  const fetchProblems = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/problems", {
        params: {
          page,
          limit: 5,
          topic: filters.topic || undefined,
          difficulty: filters.difficulty || undefined,
        },
      });

      const fetchedProblems = res.data.problems;

      setProblems(fetchedProblems);
      setPages(res.data.pages);

      // Compute stats
      const total = fetchedProblems.length;
      const solved = fetchedProblems.filter(p => p.status === "Solved").length;
      const inProgress = fetchedProblems.filter(p => p.status === "In Progress").length;
      const notStarted = fetchedProblems.filter(p => p.status === "Not Started").length;

      setStats({ total, solved, inProgress, notStarted });

    } catch (error) {
      setError("Failed to load problems");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [page, filters]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">My Problems</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-gray-500">Total</h3>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h3 className="text-green-700">Solved</h3>
          <p className="text-2xl font-bold">{stats.solved}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <h3 className="text-yellow-700">In Progress</h3>
          <p className="text-2xl font-bold">{stats.inProgress}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow text-center">
          <h3 className="text-gray-700">Not Started</h3>
          <p className="text-2xl font-bold">{stats.notStarted}</p>
        </div>
      </div>


      {/* Add Problem Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">Add New Problem</h2>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 flex-1"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Topic"
            className="border p-2 flex-1"
            value={formData.topic}
            onChange={(e) =>
              setFormData({ ...formData, topic: e.target.value })
            }
          />

          <select
            className="border p-2"
            value={formData.difficulty}
            onChange={(e) =>
              setFormData({ ...formData, difficulty: e.target.value })
            }
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <button
            onClick={async () => {
              try {
                await API.post("/problems", formData);
                setFormData({ title: "", topic: "", difficulty: "Easy" });
                fetchProblems();
              } catch {
                alert("Failed to add problem");
              }
            }}
            disabled={loading}
            className="bg-blue-600 text-white px-4 rounded disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow mb-6 flex gap-4">
      <input
        type="text"
        placeholder="Filter by topic"
        className="border p-2 flex-1"
        value={filters.topic}
        onChange={(e) =>
          setFilters({ ...filters, topic: e.target.value })
        }
      />

      <select
      className="border p-2"
      value={filters.difficulty}
      onChange={(e) =>
       setFilters({ ...filters, difficulty: e.target.value })
      }
      >
        <option value="">All</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>

      </select>

      <button
        onClick={() => {
          setFilters({ topic: "", difficulty: "" });
          setPage(1);
        }}
        className="bg-gray-300 px-4 rounded"
      >
        Clear
      </button>
      </div>

      {loading && (
      <div className="text-center text-gray-500 py-6">
        Loading problems...
      </div>
      )}

      {error && (
      <div className="text-center text-red-600 py-4">
        {error}
      </div>
      )}


      {/* Problems List */}
      {!loading && problems.length === 0 && (
        <div className="text-center text-gray-500 py-6">
           No problems found. Start by adding one 🚀
        </div>
      )}

      <div className="space-y-3">
        {problems.map((problem) => (
          <div
            key={problem._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{problem.title}</h3>
              <p className="text-sm text-gray-500">
                {problem.topic} • {problem.difficulty}
              </p>
            </div>

            <select 
              value={problem.status}
              onChange={async (e) => {
                await API.put(`/problems/${problem._id}`, {
                  status: e.target.value,
                });
                fetchProblems();
              }}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Solved</option>
            </select>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {pages}
        </span>

        <button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>   
  );
};

export default Dashboard;
