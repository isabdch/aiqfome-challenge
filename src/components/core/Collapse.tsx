type CollapseProps = {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
};

export default function Collapse({
  title = "Clique para expandir",
  children,
  isOpen,
  onToggle,
}: CollapseProps) {
  return (
    <div className="border-b-4 border-neutral-100 last-of-type:border-b-0">
      <button
        onClick={onToggle}
        className="w-full px-md py-3sm my-4xs flex justify-between items-center"
      >
        {typeof title === "string" ? <span>{title}</span> : title}
      </button>

      {children && (
        <div
          className={`px-md overflow-hidden transition-max-height duration-500 ${
            isOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="pb-md pt-sm mb-4xs">{children}</div>
        </div>
      )}
    </div>
  );
}
