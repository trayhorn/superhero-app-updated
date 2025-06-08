import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#FFD700",
			contrastText: "#1A1A1A",
		},
		secondary: {
			main: "#FF4500",
		},
		background: {
			default: "#4B4E50",
			paper: "#ffffff",
		},
		text: {
			primary: "#1A1A1A",
			secondary: "#353839",
		},
		success: {
			main: "#28a745",
		},
		error: {
			main: "#dc3545",
		},
	},
	components: {
		MuiInputLabel: {
			styleOverrides: {
				root: {
					"&.Mui-focused": {
						color: "#FFD700",
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					"&:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: "#FFD700",
					},

					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: "#FFD700",
					},
				},
			},
		},
	},
	typography: {
		fontFamily: `'Roboto', 'Montserrat', sans-serif`,
	},
	spacing: 8,
});

export default theme;
