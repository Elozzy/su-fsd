import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface DropDownProps {
  onSelect: (sortType: string) => void;
  currentSort: string;
}

const DropDown: React.FC<DropDownProps> = ({ onSelect, currentSort}) => {
  const options = [
    { label: "Sort by created at", value: "createdAt" },
    { label: "Sort by filename (asc)", value: "filenameAsc" },
    { label: "Sort by filename (desc)", value: "filenameDesc" },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left w-[14rem]">
    <div>
      <MenuButton className="inline-flex w-full space-between justify-left gap-x-1.5 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
        {options.find((option) => option.value === currentSort)?.label || "Options"}
        <ChevronDownIcon
          aria-hidden="true"
          className="mx-2 size-5 text-gray-400"
        />
      </MenuButton>
    </div>

    <MenuItems
      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden"
    >
      <div className="py-1">
        {options.map((option) => (
          <MenuItem key={option.value}>
            <button
              onClick={() => onSelect(option.value)}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              {option.label}
            </button>
          </MenuItem>
        ))}
      </div>
    </MenuItems>
  </Menu>
  );
};

export default DropDown;
