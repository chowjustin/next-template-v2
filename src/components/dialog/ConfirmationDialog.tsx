import { Dialog, DialogPanel } from "@headlessui/react";
import { TriangleAlert, X } from "lucide-react";
import Button from "@/components/button/Button";
import clsxm from "@/lib/clsxm";

export default function ConfirmationDialog({
	isOpen,
	setIsOpen,
	message,
	onConfirm,
}: {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	message: string;
	onConfirm: () => void;
}) {
	return (
		<Dialog
			open={isOpen}
			onClose={() => setIsOpen(false)}
			className="relative z-50"
		>
			<div className="fixed inset-0 flex items-center justify-center bg-black/20 pr-4 max-md:pl-4">
				<DialogPanel
					className={clsxm(
						"bg-white relative shadow-lg text-gray-900 rounded-lg p-6 w-[30%] max-lg:w-[40%] max-md:w-1/2 max-sm:w-full",
					)}
				>
					<button
						type="button"
						onClick={() => setIsOpen(false)}
						className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
					>
						<X strokeWidth={2.5} size={20} />
					</button>

					<div className="flex items-center flex-col justify-center gap-4">
						<TriangleAlert size={50} className="text-[#ffbf00]" />

						<p className="text-center text-lg font-medium">{message}</p>

						<div className="flex justify-center space-x-4">
							<Button onClick={() => setIsOpen(false)} variant="outline">
								Tidak
							</Button>
							<Button
								onClick={() => {
									onConfirm();
									setIsOpen(false);
								}}
								variant="primary"
							>
								Ya
							</Button>
						</div>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
}
