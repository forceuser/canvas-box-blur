import blur from "./src/index.mjs";

async function loadImage (url, {width, height} = {}) {
	const img = document.createElement("img");
	img.crossOrigin = "anonymous";
	img.src = url;

	return new Promise(resolve => {
		img.onload = () => {
			img.width = img.naturalWidth;
			img.height = img.naturalHeight;
			if (width) {
				img.width = width;
				if (!height) {
					img.height = Math.floor(img.naturalHeight * (width / img.naturalWidth));
				}
			}
			if (height) {
				img.height = height;
				if (!width) {
					img.width = Math.floor(img.naturalWidth * (height / img.naturalHeight));
				}
			}
			resolve(img);
		};
	});
}

const canvas = document.createElement("canvas");
const compareImg = document.querySelector("img");
document.querySelector(".canvas-wrapper").appendChild(canvas);
async function updateBlur (url, rad) {
	const img = await loadImage(url);

	compareImg.src = url;
	compareImg.style.filter = `blur(${rad}px)`;
	const radius = Math.round(rad);
	canvas.width = img.width + radius * 4;
	canvas.height = img.height + radius * 4;
	const ctx = canvas.getContext("2d");
	ctx.drawImage(img, radius * 2, radius * 2);
	canvas.style["margin-top"] = `-${radius * 2}px`;
	canvas.style["margin-left"] = `-${radius * 2}px`;
	canvas.style["margin-bottom"] = `-${radius * 2}px`;
	canvas.style["margin-right"] = `-${radius * 2}px`;
	const start = +new Date();
	blur(canvas, radius, {iterations: 2});
	// stackBlur(canvas, radius);
	console.log("perf", (+new Date()) - start);
}
const $rad = document.querySelector(".rad");
const $imgUrl = document.querySelector(".imgUrl");
const $radVal = document.querySelector(".rad-val");
let url = $imgUrl.value;
$radVal.textContent = `blur-radius: ${$rad.value}px`;
$rad.addEventListener("change", event => {
	$radVal.textContent = `blur-radius: ${$rad.value}px`;
	updateBlur(url, $rad.value);
});
$imgUrl.addEventListener("change", event => {
	url = $imgUrl.value;
	updateBlur(url, $rad.value);
});
updateBlur(url, $rad.value);
