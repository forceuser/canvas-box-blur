
export default function blur (canvas, radius = 0, {iterations = 1, x = 0, y = 0, width, height} = {}) {
	if (radius < 1) {
		return;
	}
	width = width == null ? canvas.width : width;
	height = height == null ? canvas.height : height;

	const context = canvas.getContext("2d");
	const imageData = context.getImageData(x, y, width, height);

	const pixels = imageData.data;

	let rsum; let gsum; let bsum; let asum;
	let p; let p1; let p2;
	let yp; let yi; let yw; let pa;

	const wm = width - 1;
	const hm = height - 1;
	const rad1 = radius + 1;
	const space = Math.pow(radius * 2, 2);

	const r = [];
	const g = [];
	const b = [];
	const a = [];

	const vmin = [];
	const vmax = [];

	const getPx = (i) => {
		const a = pixels[i + 3];
		return [
			a * pixels[i] / 255,
			a * pixels[i + 1] / 255,
			a * pixels[i + 2] / 255,
			a,
		];
	};

	while (iterations > 0) {
		iterations--;
		yw = yi = 0;

		for (let y = 0; y < height; y++) {
			const px = getPx(yw);
			rsum = px[0] * rad1;
			gsum = px[1] * rad1;
			bsum = px[2] * rad1;
			asum = px[3] * rad1;

			for (let i = 1; i <= radius; i++) {
				const px = getPx(yw + (((i > wm ? wm : i)) << 2));
				rsum += px[0];
				gsum += px[1];
				bsum += px[2];
				asum += px[3];
			}

			for (let x = 0; x < width; x++) {
				r[yi] = rsum;
				g[yi] = gsum;
				b[yi] = bsum;
				a[yi] = asum;

				if (y == 0) {
					p = x + rad1;
					vmin[x] = (p < wm ? p : wm) << 2;
					p = x - radius;
					vmax[x] = p > 0 ? p << 2 : 0;
				}

				p1 = yw + vmin[x];
				p2 = yw + vmax[x];

				const px1 = getPx(p1);
				const px2 = getPx(p2);

				rsum += px1[0] - px2[0];
				gsum += px1[1] - px2[1];
				bsum += px1[2] - px2[2];
				asum += px1[3] - px2[3];

				yi++;
			}
			yw += (width << 2);
		}

		for (let x = 0; x < width; x++) {
			yp = x;
			rsum = r[yp] * rad1;
			gsum = g[yp] * rad1;
			bsum = b[yp] * rad1;
			asum = a[yp] * rad1;

			for (let i = 1; i <= radius; i++) {
				yp += (i > hm ? 0 : width);
				rsum += r[yp];
				gsum += g[yp];
				bsum += b[yp];
				asum += a[yp];
			}

			yi = x << 2;
			for (let y = 0; y < height; y++) {
				pixels[yi + 3] = pa = Math.round(asum / space);

				if (pa > 0) {
					pa = 255 / pa;
					pixels[yi] = Math.round(rsum / space * pa);
					pixels[yi + 1] = Math.round(gsum / space * pa);
					pixels[yi + 2] = Math.round(bsum / space * pa);
				}
				else {
					pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
				}
				if (x == 0) {
					p = y + rad1;
					vmin[y] = (p < hm ? p : hm) * width;
					p = y - radius;
					vmax[y] = p > 0 ? p * width : 0;
				}

				p1 = x + vmin[y];
				p2 = x + vmax[y];

				rsum += r[p1] - r[p2];
				gsum += g[p1] - g[p2];
				bsum += b[p1] - b[p2];
				asum += a[p1] - a[p2];

				yi += width << 2;
			}
		}
	}

	context.putImageData(imageData, x, y);
}
