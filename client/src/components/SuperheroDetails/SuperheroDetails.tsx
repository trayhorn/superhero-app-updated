import type { superHero } from "../../types/types";
import { Link } from "react-router-dom";
import styles from './SuperheroDetails.module.css';
import { BASE_URL } from "../../api";
import { useEffect, useState } from "react";
import { editHeroRequest } from "../../api";
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
	});
	const [newFiles, setNewFiles] = useState<FileList | null>(null);
	const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

	useEffect(() => {
		if (heroDetails) {
			const {
				nickname,
				real_name,
				origin_description,
				superpowers,
				catch_phrase,
				images,
			} = heroDetails;

			setFormData({
				nickname,
				real_name,
				origin_description,
				superpowers,
				catch_phrase,
				images,
			});
		}
	}, [heroDetails]);

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

		const {data} = await editHeroRequest(id, formDataToSend);
		getUpdatedHeroDetails(data);
		setIsEditing(false);
		setImagesToDelete([]);
		setNewFiles(null);
	};

	if (!heroDetails) {
		return <div>Loading...</div>;
	}

	const handleEditHeroCancel = () => {
		setIsEditing(false);
		setFormData({
			nickname: heroDetails.nickname,
			real_name: heroDetails.real_name,
			origin_description: heroDetails.origin_description,
			superpowers: heroDetails.superpowers,
			catch_phrase: heroDetails.catch_phrase,
			images: heroDetails.images,
		});
		setNewFiles(null);
		setImagesToDelete([]);
	};

	return (
		<div className={styles.detailsContainer}>
			<div className={styles.buttonsContainer}>
				<Link className={styles.detailsContainerBtn} to="/superheroes">
					Back
				</Link>

				{isEditing ? (
					<div>
						<button
							className={styles.detailsContainerBtn}
							onClick={() => {
								if (heroDetails._id) {
									handleEditHeroSave(heroDetails._id, formData);
								}
							}}
						>
							Save
						</button>
						<button
							className={styles.detailsContainerBtn}
							onClick={handleEditHeroCancel}>
							Cancel
						</button>
					</div>
				) : (
					<button className={styles.detailsContainerBtn} onClick={handleEdit}>
						Edit Superhero
					</button>
				)}
			</div>
			<div className={styles.wrapper}>
				<div className={styles.avatarWrapper}>
					<img
						className={styles.avatar}
						src={`${BASE_URL}/${formData.images[0]}`}
						alt="Superhero avatar"
					/>
				</div>
				<div className={styles.heroDetailsWrapper}>
					{isEditing ? (
						<input
							className={styles.detailsText}
							type="text"
							name="nickname"
							value={formData.nickname}
							onChange={(e) =>
								setFormData((prev) => {
									return { ...prev, nickname: e.target.value };
								})
							}
						/>
					) : (
						<h3 className={styles.detailsText}>{formData.nickname}</h3>
					)}
					{isEditing ? (
						<input
							className={styles.detailsText}
							type="text"
							name="real_name"
							value={formData.real_name}
							onChange={(e) =>
								setFormData((prev) => {
									return { ...prev, real_name: e.target.value };
								})
							}
						/>
					) : (
						<h4 className={styles.detailsText}>{formData.real_name}</h4>
					)}
					{isEditing ? (
						<textarea
							className={styles.detailsText}
							name="origin_description"
							value={formData.origin_description}
							onChange={(e) =>
								setFormData((prev) => {
									return { ...prev, origin_description: e.target.value };
								})
							}
						/>
					) : (
						<p className={styles.detailsText}>{formData.origin_description}</p>
					)}
					{isEditing ? (
						<textarea
							className={styles.detailsText}
							name="superpowers"
							value={formData.superpowers}
							onChange={(e) =>
								setFormData((prev) => {
									return { ...prev, superpowers: e.target.value };
								})
							}
						/>
					) : (
						<p className={styles.detailsText}>{formData.superpowers}</p>
					)}
					{isEditing ? (
						<textarea
							className={styles.detailsText}
							name="catch_phrase"
							value={formData.catch_phrase}
							onChange={(e) =>
								setFormData((prev) => {
									return { ...prev, catch_phrase: e.target.value };
								})
							}
						/>
					) : (
						<p className={styles.detailsText}>{formData.catch_phrase}</p>
					)}
				</div>
			</div>
			<ul className={styles.imagesList}>
				{isEditing && (
					<li className={styles.uploadImagesWrapper}>
						<label htmlFor="images">Upload new images</label>
						<input
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
				{formData.images.map((image) => (
					<li key={image}>
						<img
							style={
								imagesToDelete.includes(image)
									? { border: "1px solid red" }
									: {}
							}
							className={styles.image}
							src={`${BASE_URL}/${image}`}
							alt="Superhero"
							onClick={(e) => {
								console.log({
									target: e.target,
									currentTarget: e.currentTarget,
								});
							}}
						/>
						{isEditing && (
							<MdDelete
								className={styles.deleteIcon}
								onClick={() => handleImageDelete(image)}
							/>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}