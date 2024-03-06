const getStoredTheme = () => localStorage.getItem("theme");
const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

const getPreferredTheme = () => {
	const storedTheme = getStoredTheme();
	if (storedTheme) {
		return storedTheme;
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const setTheme = (theme) => {
	if (theme === "auto") {
		let defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
		if (defaultTheme) {
			document.querySelector("#theme1").classList.add("d-none");
			document.querySelector("#theme2").classList.remove("d-none");
		} else {
			document.querySelector("#theme1").classList.remove("d-none");
			document.querySelector("#theme2").classList.add("d-none");
		}
		document.documentElement.setAttribute("data-bs-theme", defaultTheme ? "dark" : "light");
	} else {
		if (theme == "dark") {
			document.querySelector("#theme1").classList.add("d-none");
			document.querySelector("#theme2").classList.remove("d-none");
		} else {
			document.querySelector("#theme1").classList.remove("d-none");
			document.querySelector("#theme2").classList.add("d-none");
		}
		document.documentElement.setAttribute("data-bs-theme", theme);
	}
};

setTheme(getPreferredTheme());

document.querySelector("#themeswitch").onclick = () => {
	let active = getStoredTheme();
	let newActive = active == "dark" ? "light" : "dark";
	setTheme(newActive);
	setStoredTheme(newActive);
};

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
	const storedTheme = getStoredTheme();
	if (storedTheme !== "light" && storedTheme !== "dark") {
		setTheme(getPreferredTheme());
	}
});

window.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
		toggle.addEventListener("click", () => {
			const theme = toggle.getAttribute("data-bs-theme-value");
			setStoredTheme(theme);
			setTheme(theme);
			showActiveTheme(theme, true);
		});
	});
});

document.addEventListener("scroll", (e) => {
	if(window.scrollY > 200) {
		document.querySelector(".floating").classList.remove("d-none")
	} else {
		document.querySelector(".floating").classList.add("d-none")
	}
});
