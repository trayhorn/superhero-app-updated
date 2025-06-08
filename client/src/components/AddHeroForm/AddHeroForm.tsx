import type { superHero } from "../../types/types";
import styles from "./AddHeroForm.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { addHeroRequest } from "../../api";

type Form = {
	handleHeroAdd: (newHero: superHero) => void;
	closeModal: () => void;
};

const validationSchema = Yup.object({
	nickname: Yup.string().required("Nickname is required"),
	real_name: Yup.string().required("Real name is required"),
	origin_description: Yup.string().required("Origin description is required"),
	superpowers: Yup.string().required("Superpowers are required"),
	catch_phrase: Yup.string().required("Catch phrase is required"),
	images: Yup.mixed().test(
		"is-empty",
		"At least one image is required",
		(value) => {
			if (!value) return false;
			if (value instanceof FileList) {
				return value.length > 0;
			}
			if (Array.isArray(value)) {
				return value.length > 0;
			}
			return false;
		}
	),
});

export default function AddHeroForm({ handleHeroAdd, closeModal }: Form) {
	return (
		<Formik
			initialValues={{
				nickname: "",
				real_name: "",
				origin_description: "",
				superpowers: "",
				catch_phrase: "",
				images: [],
			}}
			validationSchema={validationSchema}
			onSubmit={async (values, actions) => {
				const formData = new FormData();

				formData.append("nickname", values.nickname);
				formData.append("real_name", values.real_name);
				formData.append("origin_description", values.origin_description);
				formData.append("superpowers", values.superpowers);
				formData.append("catch_phrase", values.catch_phrase);

				if (values.images && values.images.length > 0) {
					for (let i = 0; i < values.images.length; i++) {
						formData.append("images", values.images[i]);
					}
				}

				const { data } = await addHeroRequest(formData);
				handleHeroAdd(data);

				closeModal();
				actions.resetForm();
			}}
		>
			{({
				setFieldValue,
				values,
				touched,
				errors,
				handleBlur,
				handleChange,
			}) => (
				<Form className={styles.addHeroForm}>
					<TextField
						fullWidth
						margin="normal"
						id="nickname"
						name="nickname"
						label="Nickname"
						value={values.nickname}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.nickname && Boolean(errors.nickname)}
						helperText={touched.nickname && errors.nickname}
					/>

					<TextField
						fullWidth
						margin="normal"
						id="real_name"
						name="real_name"
						label="Real name"
						value={values.real_name}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.real_name && Boolean(errors.real_name)}
						helperText={touched.real_name && errors.real_name}
					/>

					<TextField
						fullWidth
						margin="normal"
						id="origin_description"
						name="origin_description"
						label="Origin description"
						multiline
						rows={4}
						value={values.origin_description}
						onChange={handleChange}
						onBlur={handleBlur}
						error={
							touched.origin_description && Boolean(errors.origin_description)
						}
						helperText={touched.origin_description && errors.origin_description}
					/>

					<TextField
						fullWidth
						margin="normal"
						id="superpowers"
						name="superpowers"
						label="Superpowers"
						multiline
						rows={4}
						value={values.superpowers}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.superpowers && Boolean(errors.superpowers)}
						helperText={touched.superpowers && errors.superpowers}
					/>

					<TextField
						fullWidth
						margin="normal"
						id="catch_phrase"
						name="catch_phrase"
						label="Catch phrase"
						multiline
						rows={4}
						value={values.catch_phrase}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.catch_phrase && Boolean(errors.catch_phrase)}
						helperText={touched.catch_phrase && errors.catch_phrase}
					/>

					<input
						accept="image/*"
						id="images"
						multiple
						type="file"
						style={{ marginTop: 16, marginBottom: 8 }}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							if (e.currentTarget.files) {
								setFieldValue("images", e.currentTarget.files);
							}
						}}
					/>

					<Button
						variant="contained"
						color="primary"
						type="submit"
						fullWidth
						sx={{ marginTop: 2 }}
					>
						Submit
					</Button>
				</Form>
			)}
		</Formik>
	);
}

