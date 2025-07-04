import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { superHero } from "../types/types";
import { editHeroRequest, getHeroByIdRequest } from "../api";
import { MdDelete } from "react-icons/md";

type SuperheroDetails = {
	heroDetails: superHero | null;
	getUpdatedHeroDetails: (updatedHeroDetails: superHero) => void;
};

export default function SuperheroDetails({
	heroDetails,
	getUpdatedHeroDetails,
}: SuperheroDetails) {
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState<superHero>({
		nickname: "",
		real_name: "",
		origin_description: "",
		superpowers: "",
		catch_phrase: "",
		images: [],
		urls: [],
	});
	const [newFiles, setNewFiles] = useState<FileList | null>(null);
	const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

	useEffect(() => {
		if (heroDetails) {
			setFormData(heroDetails);
		}
	}, [heroDetails]);

	const renderField = (
		name: keyof typeof formData,
		Tag: "h3" | "h4" | "p",
		type: "input" | "textarea"
	) => {
		const commonProps = {
			className: "detailsText",
			name,
			value: formData[name],
			onChange: (
				e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			) => setFormData((prev) => ({ ...prev, [name]: e.target.value })),
		};

		if (isEditing) {
			return type === "input" ? (
				<input type="text" {...commonProps} />
			) : (
				<textarea {...commonProps} />
			);
		} else {
			return <Tag className="detailsText">{formData[name]}</Tag>;
		}
	};

	const handleEdit = () => {
		setIsEditing((prev) => !prev);
	};

	const handleImageDelete = (imagePath: string) => {
		setImagesToDelete((prev) => {
			if (prev.includes(imagePath)) {
				return prev.filter((image) => image !== imagePath);
			} else {
				return [...prev, imagePath];
			}
		});
	};

	const handleEditHeroSave = async (id: string, formData: superHero) => {
		const updatedImages = formData.images.filter(
			(image) => !imagesToDelete.includes(image)
		);

		const updatedFormData = {
			...formData,
			images: updatedImages,
		};

		const formDataToSend = new FormData();

		Object.entries(updatedFormData).forEach(([key, value]) => {
			if (key !== "images") {
				if (typeof value === "string") {
					formDataToSend.append(key, value);
				} else {
					formDataToSend.append(key, JSON.stringify(value));
				}
			} else {
				formDataToSend.append("images", JSON.stringify(updatedFormData.images));
			}
		});

		if (newFiles) {
			for (const file of newFiles) {
				formDataToSend.append("newImages", file);
			}
		}

		await editHeroRequest(id, formDataToSend);
		const { data } = await getHeroByIdRequest(id);
		getUpdatedHeroDetails(data);
		setIsEditing(false);
		setImagesToDelete([]);
		setNewFiles(null);
	};

	if (!heroDetails) return;

	const handleEditHeroCancel = () => {
		setIsEditing(false);
		setFormData({
			nickname: heroDetails.nickname,
			real_name: heroDetails.real_name,
			origin_description: heroDetails.origin_description,
			superpowers: heroDetails.superpowers,
			catch_phrase: heroDetails.catch_phrase,
			images: heroDetails.images,
			urls: heroDetails.urls,
		});
		setNewFiles(null);
		setImagesToDelete([]);
	};

	const heroAvatarSrc =
		formData.urls && formData.urls.length > 0
			? formData.urls?.[0]
			: "/images/no-image.jpg";

	return (
		<div className="p-4 bg-gallery-bg dark:bg-dark-gallery-bg">
			<div className="flex justify-between">
				<Link className="detailsContainerBtn" to="/superheroes">
					Back
				</Link>

				{isEditing ? (
					<div>
						<button
							className="detailsContainerBtn"
							onClick={() => {
								if (heroDetails._id) {
									handleEditHeroSave(heroDetails._id, formData);
								}
							}}
						>
							Save
						</button>
						<button
							className="detailsContainerBtn"
							onClick={handleEditHeroCancel}
						>
							Cancel
						</button>
					</div>
				) : (
					<button className="detailsContainerBtn" onClick={handleEdit}>
						Edit Superhero
					</button>
				)}
			</div>
			<div className="flex gap-6 mt-4">
				<div className="max-w-[400px] max-h-[600px]">
					<img
						className="block w-full h-full object-cover"
						src={heroAvatarSrc}
						alt={`${formData.nickname} avatar`}
					/>
				</div>
				<div className="flex flex-col gap-4 flex-1">
					{renderField("nickname", "h3", "input")}
					{renderField("real_name", "h4", "input")}
					{renderField("origin_description", "p", "textarea")}
					{renderField("superpowers", "p", "textarea")}
					{renderField("catch_phrase", "p", "textarea")}
				</div>
			</div>
			<ul className="grid grid-cols-5 gap-[10px] list-none p-0 mx-0 my-md">
				{isEditing && (
					<li className="relative flex flex-col justify-center items-center gap-2 p-md bg-card-bg dark:bg-dark-card-bg border-2 border-accent text-text-primary dark:text-dark-text-primary">
						<label htmlFor="images">Upload new images</label>
						<input
							className="w-full"
							type="file"
							name="newImages"
							multiple
							id="images"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								if (e.currentTarget.files) {
									setNewFiles(e.currentTarget.files);
								}
							}}
						/>
					</li>
				)}
				{formData.images.map((image, index) => (
					<li key={image} className="relative">
						<img
							style={
								imagesToDelete.includes(image)
									? { border: "1px solid red" }
									: {}
							}
							src={formData.urls?.[index]}
							alt="Superhero"
						/>
						{isEditing && (
							<MdDelete
								className="absolute top-[5px] right-[5px] w-5 h-5 cursor-pointer text-white"
								onClick={() => handleImageDelete(image)}
							/>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}