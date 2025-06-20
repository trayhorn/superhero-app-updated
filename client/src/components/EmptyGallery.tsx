export default function EmptyGallery() {
	return (
		<div className="flex flex-col items-center justify-center h-full p-5 text-center">
			<h2 className="text-2xl text-text-primary dark:text-dark-text-primary mb-2.5">
				No Heroes Found
			</h2>
			<p className="text-xl text-text-primary dark:text-dark-text-primary mb-5">
				Start by adding your favorite superheroes!
			</p>
		</div>
	);
}
