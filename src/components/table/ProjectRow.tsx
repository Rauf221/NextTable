import { BsThreeDotsVertical } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";
import { getPriorityColor } from "../helpers/helper";

export interface Project {
  id: string;
  projectName: string;
  desc: string;
  assignedDate: string;
  dueDate: string;
  status: number;
  priority: string;
  completedTask: number;
  totalTask: number;
  team: string[];
}

interface ProjectRowProps {
  project: Project;
  onToggleDropdown: () => void;
  isOpen: boolean;
  onDelete: () => void;
}

const ProjectRow = ({ project, onToggleDropdown, isOpen, onDelete }: ProjectRowProps) => {
  return (
    <tr>
      <td className="px-4 py-3 border-b flex items-center gap-2">
        <div className="bg-[#E6F6FD] w-fit rounded-full p-1">
          <img
            className="w-[30px]"
            src="https://spruko.com/demo/xintra/dist/assets/images/company-logos/1.png"
            alt="Project Logo"
          />
        </div>
        <div className="w-[57%]">
          <p className="text-[14px] overflow-hidden text-ellipsis whitespace-nowrap">
            {project?.projectName}
          </p>
          <span className="text-xs text-[#7184A1]">
            Total <span className="text-black"> {project.completedTask}/{project.totalTask} </span> tasks completed
          </span>
        </div>
      </td>
      <td className="px-4 py-3 border-b text-[12px] w-[350px] text-[#7184A1]">
        {project?.desc}
      </td>
      <td className="px-4 py-3 border-b">
        <div className="flex items-center">
          {project?.team?.slice(0, 3).map((member, index) => (
            <Image
              key={index}
              src={`https://spruko.com/demo/xintra/dist/assets/images/faces/${index + 1}.jpg`}
              alt={`Team Member ${index + 1}`}
              width={25}
              height={25}
              className="rounded-full me-[-0.20rem] hover:z-[1] hover:scale-110 hover:border-white transition"
            />
          ))}
          {project?.team?.length > 3 && (
            <div className="rounded-full w-[25px] h-[25px] text-white text-xs flex items-center justify-center cursor-default me-[-0.20rem] hover:z-[1] hover:scale-110 hover:border-white transition bg-main_color">
              +{project?.team?.length - 3}
            </div>
          )}
        </div>
      </td>
      <td className="px-4 py-3 border-b text-[12px]">{project.assignedDate}</td>
      <td className="px-4 py-3 border-b text-[12px]">{project.dueDate}</td>
      <td className="px-4 py-3 border-b text-[12px]">
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div
            className="bg-blue-600 h-1 rounded-full"
            style={{ width: `${project.status}%` }}
          ></div>
        </div>
        <div className="text-[13px] flex items-center gap-1">
          <span className="text-main_color">{project.status}%</span> <span>Completed</span>
        </div>
      </td>
      <td className="px-4 py-3 border-b text-[12px]">
        <div
          className={`px-2 py-1 rounded-md text-xs font-semibold w-fit ${getPriorityColor(project.priority)}`}
        >
          {project.priority}
        </div>
      </td>
      <td className="px-4 py-3 border-b">
        <button
          onClick={onToggleDropdown}
          className="bg-gray-100 rounded-sm p-1 text-gray-500"
        >
          <BsThreeDotsVertical />
        </button>
        {isOpen && (
          <div className="absolute z-10 bg-white divide-y divide-gray-100 translate-x-[-50px] rounded-md shadow w-32">
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <button className="px-4 py-2 w-full hover:bg-main_color/10 hover:text-main_color flex items-center gap-1">
                  <IoEyeOutline />
                  View
                </button>
              </li>
              <li>
                <button className="flex px-4 py-2 w-full hover:bg-main_color/10 hover:text-main_color items-center gap-1">
                  <LuPencilLine />
                  Edit
                </button>
              </li>
              <li>
                <button
                  onClick={onDelete}
                  className="flex px-4 py-2 w-full hover:bg-main_color/10 hover:text-main_color items-center gap-1"
                >
                  <FaRegTrashAlt />
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </td>
    </tr>
  );
};

export { ProjectRow };
