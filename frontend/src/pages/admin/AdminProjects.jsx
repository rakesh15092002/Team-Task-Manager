import { useState } from "react";
import { useAllProjectsAdmin } from "../../hooks/useAdmin";
import { useCreateProject } from "../../hooks/useProjects";
import Spinner from "../../components/ui/Spinner";
import Button from "../../components/ui/Button";
import Avatar from "../../components/ui/Avatar";
import ProjectForm from "../../components/project/ProjectForm";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

export default function AdminProjects() {
  const { data: projects, isLoading } = useAllProjectsAdmin();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">All Projects</h1>
        <Button onClick={() => setShowForm(true)}>+ New Project</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10"><Spinner size="lg" /></div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Project</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Owner</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Members</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Created</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects?.map(project => (
                <tr key={project._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-800">{project.name}</p>
                    <p className="text-xs text-gray-500 truncate max-w-xs">
                      {project.description || "No description"}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={project.owner?.name} size="sm" />
                      <span className="text-sm text-gray-600">{project.owner?.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex -space-x-2">
                      {project.members?.slice(0, 3).map(m => (
                        <Avatar key={m.user._id} name={m.user.name}
                          src={m.user.avatar} size="sm"
                          className="ring-2 ring-white" />
                      ))}
                      {project.members?.length > 3 && (
                        <span className="text-xs text-gray-500 ml-2 self-center">
                          +{project.members.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {formatDate(project.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`/admin/projects/${project._id}`}>
                      <Button size="sm" variant="secondary">Manage</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects?.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-8">No projects yet</p>
          )}
        </div>
      )}

      {showForm && <ProjectForm onClose={() => setShowForm(false)} />}
    </div>
  );
}