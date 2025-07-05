"use client";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface LightboxModalProps {
	images: string[];
	open: boolean;
	onClose: () => void;
}

export default function LightboxModal({
	images,
	open,
	onClose,
}: LightboxModalProps) {
	return (
		<Lightbox
			open={open}
			close={onClose}
			slides={images.map((src) => ({ src }))}
			plugins={[Zoom]}
			zoom={{
				maxZoomPixelRatio: 3,
				scrollToZoom: true,
			}}
			controller={{ closeOnBackdropClick: true }}
			styles={{
				container: {
					backgroundColor: "rgba(0, 0, 0, 0.6)",
				},
			}}
		/>
	);
}
