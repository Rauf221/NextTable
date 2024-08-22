"use client";
import { useState } from "react";
import { useDeleteProject, useRequest } from "../http/axiosFetcher";
import { mutate } from "swr";
import { Project, ProjectRow } from "./ProjectRow";

const PAGE_SIZE = 7;

const ProjectTable = () => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const toggleDropdown = (projectId: string) => {
    setOpenDropdownId(openDropdownId === projectId ? null : projectId);
  };

  const { trigger: DeleteData } = useDeleteProject();

  const handleDelete = async (projectId: string) => {
    try {
        await DeleteData({ dynamicValue: projectId }); // Ensure dynamicValue matches your API needs
        mutate("/projects"); // Ensure this key is correct
    } catch (err) {
        console.error("Failed to delete project:", err);
    }
};


  const { data } = useRequest("ProjectGet", { method: "GET", module: "devApi" });

  if (!data)
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        role="status"
      >
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );

  const uniqueData = Array.from(new Map(data.map((project: Project) => [project.id, project])).values());

  const filteredData = uniqueData.filter((project: Project) =>
    project?.projectName.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a: Project, b: Project) => {
    if (sortOption === "A - Z") {
      return a.projectName.localeCompare(b.projectName);
    } else if (sortOption === "Date Added") {
      return (
        new Date(b.assignedDate).getTime() - new Date(a.assignedDate).getTime()
      );
    } else if (sortOption === "Newest") {
      return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    } else if (sortOption === "Type") {
      return a.priority.localeCompare(b.priority);
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);
  const paginatedData = sortedData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="shadow-xl rounded-lg overflow-hidden bg-white">
      <div className="flex justify-between p-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md px-2 py-1"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded-md px-2 py-1"
        >
          <option value="">Sort By</option>
          <option value="A - Z">A - Z</option>
          <option value="Date Added">Date Added</option>
          <option value="Newest">Newest</option>
          <option value="Type">Type</option>
        </select>
      </div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b-2 text-left text-[14px] font-normal">Project Name</th>
            <th className="px-4 py-2 border-b-2 text-left text-[14px] font-normal">Description</th>
            <th className="px-4 py-2 border-b-2 text-left text-[14px] font-normal">Team</th>
            <th className="px-4 py-2 border-b-2 text-left text-[14px] font-normal">Assigned Date</th>
            <th className="px-4 py-2 border-b-2 text-left text-[14px] font-normal">Due Date</th>
            <th className="px-4 py-2 border-b-2 text-left text-[14px] font-normal">Status</th>
            <th className="px-4 py-2 border-b-2 text-left text-[14px] font-normal">Priority</th>
            <th className="px-4 py-2 border-b-2 text-left text-[14px] font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData?.map((project) => (
            <ProjectRow
              key={project?.id}
              project={project}
              onToggleDropdown={() => toggleDropdown(project?.id)}
              isOpen={openDropdownId === project?.id}
              onDelete={() => handleDelete(project?.id)}
            />
          ))}
        </tbody>
      </table>
      <div className="flex justify-end gap-10 p-2">
        <button
          onClick={() => setCurrentPage(Math?.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-600 rounded-md px-3 py-2"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(Math?.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-blue-600 rounded-md px-4 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectTable;
