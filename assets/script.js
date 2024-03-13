// Theme function
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
const changeToActiveTheme = () => {
	document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
		toggle.addEventListener("click", () => {
			const theme = toggle.getAttribute("data-bs-theme-value");
			setStoredTheme(theme);
			setTheme(theme);
			showActiveTheme(theme, true);
		});
	});
};

// Scroll up function
document.addEventListener("scroll", (e) => {
	if (window.scrollY > 200) {
		document.querySelector(".floating").classList.remove("d-none");
	} else {
		document.querySelector(".floating").classList.add("d-none");
	}
});

// URI function
function parse_query_string(e) {
	let t = e.split("&"),
		i = {};
	for (let l = 0; l < t.length; l++) {
		let s = t[l].split("="),
			n = decodeURIComponent(s.shift()),
			r = decodeURIComponent(s.join("="));
		if (void 0 === i[n]) i[n] = r;
		else if ("string" == typeof i[n]) {
			let f = [i[n], r];
			i[n] = f;
		} else i[n].push(r);
	}
	return i;
}
const googleFormInit = async () => {
	await fetch("/config.json")
		.then((e) => e.json())
		.then((data) => {
			if (!data) return;
			let formParent = document.querySelector("#paymentForm");
			let formBuktiParent = document.querySelector("#paymentForm2");
			if (formParent) {
				formParent.innerHTML = `<iframe
				src="${data.formPendaftaran}"
				class="col-12 rounded-3 overflow-hidden shadow"
				frameborder="0"
				marginheight="0"
				marginwidth="0"
				>Memuat…</iframe
			>`;
			}
			if (formBuktiParent) {
				formBuktiParent.innerHTML = `<a id="buktiButton" target="_blank" href="${data.formBukti}" class="btn btn-success rounded-2 px-md-5 py-md-4 btn-lg" type="button">Kirim Bukti!</a>`;
			}
		});
};
if (document.querySelector("#amount")) {
	let query = window.location.search.substring(1);
	let qs = parse_query_string(query);
	if (qs?.opsi == "2") {
		document.querySelector("#amount").textContent = "Rp. 124,000";
		googleFormInit();
	} else if (qs?.opsi == "1") {
		document.querySelector("#amount").textContent = "Rp. 99,000";
		googleFormInit();
	} else {
		window.location.replace("index.html");
	}
}

// Smooth scrolling for anchor links in navbar
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		window.location.replace(this.getAttribute("href"));
		const targetId = this.getAttribute("href").substring(1);
		const targetElement = document.getElementById(targetId);
		let offset = 70 + parseInt(window.getComputedStyle(targetElement).marginTop);
		window.scrollTo({
			top: targetElement.offsetTop - offset,
			behavior: "smooth",
		});
	});
});

// GSAP
const GSAPfunction = () => {
	gsap.registerPlugin(ScrollTrigger);
	gsap.from("#hero-line", {
		y: 100,
		opacity: 0,
	});
	gsap.from("#sub-hero-line", {
		y: 100,
		opacity: 0,
		delay: 0.2,
	});
	gsap.from(".nodding", {
		delay: 0.4,
		y: 200,
		opacity: 0,
		yoyo: false,
		onComplete: () => {
			gsap.to(".nodding", {
				y: 20,
				yoyo: true,
				repeat: -1,
			});
		},
	});
	gsap.to(".total-cust", {
		scale: 1.5,
		y: -20,
		scrollTrigger: {
			trigger: ".total-cust",
			start: "top center+=200px",
			once: true,
		},
		onUpdate: (e) => {
			let target = document.querySelector(".total-cust");
			target.textContent = `+0${parseInt(target.textContent) + Math.round((1000 * 1) / (65 * 1))}`;
		},
		onComplete: () => {
			document.querySelector(".total-cust").textContent = "+1000";
		},
		duration: 1,
	});
	document.querySelectorAll(".scaling").forEach((e) => {
		gsap.to(e, {
			scale: e.dataset?.scale ?? 1.2,
			opacity: 0.5,
			yoyo: true,
			repeat: -1,
		});
	});
	document.querySelectorAll(".go-daftar, #after-hero-1 > *, #after-hero-2 > *, #servicecard > *, .trigger-1").forEach((e) => {
		gsap.from(e, {
			y: 100,
			opacity: 0,
			delay: e.dataset?.delay ?? 0,
			scrollTrigger: { trigger: e, start: "top center+=200px", once: true },
		});
	});
};
const splideImages = [
	"./images/testimoni-1.jpeg",
	// "./images/testimoni-2.jpg",
	"./images/testimoni-3.png",
	"./images/testimoni-4.jpeg",
];
const splides = () => {
	var splide = new Splide(".splide", {
		type: "loop",
		drag: "free",
		lazyLoad: "nearby",
		autoWidth: true,
		focus: "center",
		heightRatio: 0.6,
		gap: 5,
		snap: true,
		autoPlay: true,
		breakpoints: {
			640: {
				heightRatio: 1,
			},
		},
	});

	splide.mount();
	let container = document.querySelector("ul.splide__list");
	if (container) {
		splideImages.forEach((e) => {
			splide.add(`<li class="splide__slide"><img src="${e}" alt="testimonial" /></li>`);
		});
	}
	setTimeout(() => {
		splide.go("<");
	}, 100);
};

// bundler
document.addEventListener("DOMContentLoaded", (event) => {
	changeToActiveTheme();
	if (window.location.pathname.endsWith("/") || window.location.pathname.endsWith("/index.html")) {
		GSAPfunction();
		splides();
		const sectionArray = document.querySelectorAll(".content");
		const sectionPosition = {};
		const offset = document.querySelector(".navbar").offsetHeight;
		sectionArray.forEach((section) => (sectionPosition[section.id] = section.offsetTop));

		window.onscroll = () => {
			let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
			for (id in sectionPosition) {
				if (sectionPosition[id] - offset * 3 <= scrollPosition) {
					console.log(sectionPosition[id] - offset, scrollPosition);
					document.querySelectorAll("a.nav-link").forEach((e) => {
						e.classList.remove("active")
					});
					document.querySelectorAll(`a.nav-link[href='#${id}']`).forEach((e) => {
						e.classList.add("active")
					});
				}
			}
		};
	}
});
