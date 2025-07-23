import type { superHero } from "../types/types";
import { Formik, Form } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { addHeroRequest, getAllHerousRequest } from "../api";
import constructFormData from "../helpers/constructFormData";
import FormikField from "./FormikField";

export type HeroFormValues = {
	nickname: string;
	real_name: string;
	origin_description: string;
	superpowers: string;
	catch_phrase: string;
	images: FileList | null;
}

type Form = {
	handleHeroesUpdate: (allHeroes: superHero[]) => void;
	closeModal: () => void;
};

const validationSchema = Yup.object({
	nickname: Yup.string().required("Nickname is required"),
	real_name: Yup.string().required("Real name is required"),
	origin_description: Yup.string().required("Origin description is required"),
	superpowers: Yup.string().required("Superpowers are required"),
	catch_phrase: Yup.string().required("Catch phrase is required"),
});

export default function AddHeroForm({
  handleHeroesUpdate,
  closeModal
}: Form) {
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: FormikHelpers<HeroFormValues>["setFieldValue"]
  ) => {
    const files = e.currentTarget.files;
    if (files) {
      const acceptedFormats = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
      ];

      for (const file of files) {
        if (!acceptedFormats.includes(file.type)) {
          alert(
            "The uploaded file format is not supported. Please upload images in PNG, JPEG, JPG, or WEBP format."
          );
          return;
        }
      }

      setFieldValue("images", files);
    }
	};
	
	const handleFormSubmit = async (
		values: HeroFormValues,
		actions: FormikHelpers<HeroFormValues>
	) => {
		const formData = constructFormData(values);

		try {
			await addHeroRequest(formData);
			const { data } = await getAllHerousRequest(1);
			handleHeroesUpdate(data.superheroes);
			closeModal();
			actions.resetForm();
		} catch (error) {
			const err = error as AxiosError<{ message: string }>;
			alert(err.response?.data?.message || "Error adding hero");
		}
	};

  return (
		<Formik<HeroFormValues>
			initialValues={{
				nickname: "",
				real_name: "",
				origin_description: "",
				superpowers: "",
				catch_phrase: "",
				images: null,
			}}
			validationSchema={validationSchema}
			onSubmit={handleFormSubmit}
		>
			{({ setFieldValue }) => (
				<Form className="flex flex-col min-w-[350px] text-text-primary">
					<FormikField type="input" name="nickname" />
					<FormikField type="input" name="real_name" />
					<FormikField type="textarea" name="origin_description" />
					<FormikField type="textarea" name="superpowers" />
					<FormikField type="textarea" name="catch_phrase" />

					<input
						accept="image/png,image/jpeg,image/jpg,image/webp"
						id="images"
						multiple
						type="file"
						className="mt-2 mb-4 px-2 py-3 file:bg-cta-bg file:cursor-pointer file:p-3 file:rounded-md file:text-cta-text file:hover:bg-cta-hover border-1 border-text-primary"
						onChange={(e) => handleFileChange(e, setFieldValue)}
					/>

					<button
						type="submit"
						className="bg-cta-bg text-cta-text px-2 py-3 hover:bg-cta-hover"
					>
						Submit
					</button>
				</Form>
			)}
		</Formik>
	);
}