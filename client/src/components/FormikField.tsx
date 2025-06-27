import { Field, ErrorMessage, useFormikContext } from "formik";
import type { HeroFormValues } from "./AddHeroForm";

type FormikFieldProps = {
  type: "input" | "textarea";
  name: keyof HeroFormValues;
};

export default function FormikField({ type, name }: FormikFieldProps) {
	const formattedName = name
		.replace(/_/g, " ")
		.replace(/\b\w/g, (char) => char.toUpperCase());

	const { errors, touched } = useFormikContext<HeroFormValues>();

	return (
		<div className="flex flex-col mb-3">
			<Field
				placeholder={formattedName}
				id={name}
				name={name}
				className={`formInput ${
					errors[name] && touched[name] ? "formInput-invalid" : ""
				}`}
				as={type === "textarea" ? "textarea" : "input"}
				rows={type === "textarea" ? 4 : undefined}
				autoComplete="off"
				type={type === "input" ? "text" : undefined}
			/>
			<ErrorMessage component="span" className="mt-1 text-xs pl-[15px] text-cta-bg" name={name} />
		</div>
	);
}
