var mainMusic = new Audio("content/sounds/main.mp3");
mainMusic.loop = true;
mainMusic.volume = 0.1;
var isMusicPlaying = false;

function openMenu(menu) {
	var menuname = menu.getElementsByTagName("p")[0].textContent;

	menu.classList.add("cut");
	menu.classList.remove("flex");

	setTimeout(() => {
		menu.classList.add("flex");
		menu.classList.remove("cut");
	}, 2000);

	var cutSound = new Audio("content/sounds/cut.mp3");
	cutSound.play();

	setTimeout(() => {
		if (menuname === "shows" || menuname === "about") {
			var pageSound = new Audio("content/sounds/page.mp3");
			pageSound.play();
		}
		if (menuname === "shop") {
			var pageSound = new Audio("content/sounds/wistle.mp3");
			pageSound.play();
		}
		fetch(menuname.toLowerCase() + ".html")
			.then((response) => response.text())
			.then((html) => {
				const parser = new DOMParser();
				const doc = parser.parseFromString(html, "text/html");
				const newPageContent = doc.querySelector("page");
				const currentPage = document.querySelector("page");

				if (newPageContent && currentPage) {
					currentPage.append(...newPageContent.childNodes);
				}
			});
	}, 500);
}

function backToMenu(menuButton) {
	var menu = menuButton.parentElement;
	menu.classList.add("closed");
	setTimeout(() => {
		menu.remove();
	}, 2000);
}

(function () {
	let initializedSeats = new WeakSet();

	function initTheaterSeats(container, options = {}) {
		if (!container || initializedSeats.has(container)) return;

		initializedSeats.add(container);

		const totalSeats = options.totalSeats || 56;
		const occupiedSeats = options.occupiedSeats || [];

		container.innerHTML = "";

		for (let i = 0; i < totalSeats; i++) {
			const seat = document.createElement("div");
			seat.className = "seat";
			seat.dataset.index = i;

			if (occupiedSeats.includes(i)) {
				seat.classList.add("occupied");
			}

			seat.addEventListener("click", function () {
				if (seat.classList.contains("occupied")) return;
				seat.classList.toggle("selected");
				var fillsound = new Audio("content/sounds/fill.mp3");
				fillsound.play();

				updateSeatTotal(container, 5);
			});

			container.appendChild(seat);
		}

		updateSeatTotal(container, 5);
	}

	function generateRandomOccupiedSeats(total, count) {
		const occupied = new Set();
		while (occupied.size < count) {
			occupied.add(Math.floor(Math.random() * total));
		}
		return [...occupied];
	}

	function scan() {
		document.querySelectorAll("#seats").forEach((seats) => {
			initTheaterSeats(seats, {
				totalSeats: 98,
				occupiedSeats: generateRandomOccupiedSeats(98, 26),
			});
		});
	}

	const observer = new MutationObserver(scan);
	observer.observe(document.body, { childList: true, subtree: true });

	scan(); // initial pass
})();

function updateSeatTotal(seatsContainer, pricePerSeat = 5) {
	if (!seatsContainer || !document.body.contains(seatsContainer)) return;

	const totalEl = document.getElementById("total");
	if (!totalEl) return;

	const selectedSeats = seatsContainer.querySelectorAll(".seat.selected");
	const totalPrice = selectedSeats.length * pricePerSeat;

	totalEl.textContent = "Total: $" + totalPrice;
}

function clicked(element) {
	element.classList.add("clicked");
	if (element.tagName == "SIGN") {
		var signSound = new Audio("content/sounds/sign.mp3");
		var buySound = new Audio("content/sounds/buy.mp3");
		var winSound = new Audio("content/sounds/win.mp3");
		signSound.play();
		setTimeout(() => {
			buySound.play();
			setTimeout(() => {
				winSound.play();
			}, 2000);
		}, 1400);
	} else if (element.id == "music") {
		if (!isMusicPlaying) {
			isMusicPlaying = true;
			mainMusic.play().catch(() => {});
		} else {
			isMusicPlaying = false;
			mainMusic.pause();
		}
	}
}
let currentTotal = 0;
let itemCount = 0;

function updateShop(element) {
	const priceSpan = element.querySelector("span").innerText;
	const price = parseFloat(priceSpan.replace("$", ""));
	currentTotal += price;
	itemCount += 1;

	renderTotal();
}

function renderTotal() {
	const totalDisplay = document.querySelector("#total");
	if (totalDisplay) {
		totalDisplay.innerText = `Total: $${currentTotal}`;
	} else {
		console.warn("Element with ID #total not found on page.");
	}
}
