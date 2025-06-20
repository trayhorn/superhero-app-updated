interface FormValues {
	nickname: string;
	real_name: string;
	origin_description: string;
	superpowers: string;
	catch_phrase: string;
	images: FileList | null;
}

export default function constructFormData(data: FormValues) {
	const formData = new FormData();

	Object.entries(data).forEach(([key, value]) => {
		if (key !== "images") {
			if (typeof value === "string") {
				formData.append(key, value);
			} else {
				formData.append(key, JSON.stringify(value));
			}
		} else {
			if (value && value.length > 0) {
				for (const file of value) {
					formData.append(key, file);
				}
			}
		}
	});

	return formData;
}