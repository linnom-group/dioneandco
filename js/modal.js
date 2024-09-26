const images = document.querySelectorAll("#image");
function imageViewer(element) {
	const popup = document.createElement("div");
	const close = document.createElement("i");
	const popupImg = document.createElement("img");
	const controlBox = document.createElement("div");
	const zoom = {
		plus: document.createElement("button"),
		minus: document.createElement("button"),
		reset: document.createElement("button"),
		size: {
			amount: 1,
			increase: 0.3,
			decrease: 0.3,
			beginning: 1,
			max: 3,
			min: 0
		}
	};
	const rotate = {
		left: document.createElement("button"),
		right: document.createElement("button"),
		size: {
			amount: 0,
			increase: 90,
			decrease: 90,
			beginning: 0
		}
	};

	popup.setAttribute("id", "popup");

	close.setAttribute("id", "close");
	close.setAttribute("class", "las la-times");
	close.onclick = () => popup.remove();

	popupImg.setAttribute("id", "popupImg");
	popupImg.setAttribute("lazy", "load");
	popupImg.setAttribute("src", element.getAttribute("src"));

	popupImg.ondblclick = (e) => {
		console.dir(popupImg);
		zoom.size.amount = 2;
		popupImg.style.transform = `scale(${zoom.size.amount}) rotate(${
			rotate.size.amount
		}deg) translate(${-1 * (e.x - popupImg.clientWidth / 2)}px,${
			-1 * (e.y - popupImg.clientHeight / 2)
		}px)`;
	};

	controlBox.setAttribute("id", "controlBox");

	zoom.plus.setAttribute("id", "zoomPlus");
	zoom.plus.setAttribute("class", "las la-plus");
	zoom.plus.setAttribute("info", "Yakınlaştır");

	zoom.plus.onclick = () => {
		if (zoom.size.amount - zoom.size.increase < zoom.size.max)
			zoom.size.amount = zoom.size.amount + zoom.size.increase;
		popupImg.style.transform = `scale(${zoom.size.amount}) rotate(${rotate.size.amount}deg)`;
	};

	zoom.minus.setAttribute("id", "zoomMinus");
	zoom.minus.setAttribute("class", "las la-minus");
	zoom.minus.setAttribute("info", "Uzaklaştır");

	zoom.minus.onclick = () => {
		if (zoom.size.amount - zoom.size.decrease > zoom.size.min)
			zoom.size.amount = zoom.size.amount - zoom.size.decrease;
		popupImg.style.transform = `scale(${zoom.size.amount}) rotate(${rotate.size.amount}deg)`;
	};

	zoom.reset.setAttribute("id", "zoomReset");
	zoom.reset.setAttribute("class", "las la-trash");
	zoom.reset.setAttribute("info", "Sıfırla");

	zoom.reset.onclick = () => {
		zoom.size.amount = zoom.size.beginning;
		rotate.size.amount = rotate.size.beginning;
		popupImg.style.transform = `scale(${zoom.size.amount}) rotate(${rotate.size.amount}deg)`;
	};

	controlBox.appendChild(zoom.plus);
	controlBox.appendChild(zoom.minus);
	controlBox.appendChild(zoom.reset);

	rotate.left.setAttribute("id", "rotateLeft");
	rotate.left.setAttribute("class", "las la-undo-alt");
	rotate.left.setAttribute("info", "Sola Döndür");

	rotate.left.onclick = () => {
		rotate.size.amount = rotate.size.amount - rotate.size.decrease;
		popupImg.style.transform = `scale(${zoom.size.amount}) rotate(${rotate.size.amount}deg)`;
	};

	rotate.right.setAttribute("id", "rotateRight");
	rotate.right.setAttribute("class", "las la-redo-alt");
	rotate.right.setAttribute("info", "Sağa Döndür");

	rotate.right.onclick = () => {
		rotate.size.amount = rotate.size.amount + rotate.size.increase;
		popupImg.style.transform = `scale(${zoom.size.amount}) rotate(${rotate.size.amount}deg)`;
	};

	controlBox.appendChild(rotate.left);
	controlBox.appendChild(rotate.right);

	popup.appendChild(close);
	popup.appendChild(popupImg);
	popup.appendChild(controlBox);

	/*
	window.onresize = () => {
		zoom.size.amount = zoom.size.beginning;
		rotate.size.amount = rotate.size.beginning;
		popupImg.style.transform = `scale(${zoom.size.amount}) rotate(${rotate.size.amount}deg)`;
	};
	*/

	document.body.appendChild(popup);
}
images.forEach((img) => (img.onclick = () => imageViewer(img)));