export default function Tooltip() {
  return (
		<div className="absolute top-10 right-0 px-1 w-fit h-fit pointer-events-none bg-header-bg dark:bg-dark-header-bg transition-all delay-500 duration-150 ease-in-out text-xs opacity-0 group-hover/delete:opacity-100">
			<span className="text-cta-text">Delete</span>
		</div>
	);
}