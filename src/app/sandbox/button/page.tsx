import { ArrowRight, Plus } from "lucide-react";
import Button from "@/components/button/Button";
import ButtonLink from "@/components/links/ButtonLink";
import Typography from "@/components/Typography";

export default function ButtonPage() {
	return (
		<main className="min-h-screen items-center justify-center bg-slate-200 py-20">
			<section className="flex flex-col gap-8 px-24">
				<div>
					<Typography as="h2">Blue</Typography>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<Button
							variant="blue"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Blue Button
						</Button>
						<Button variant="blue" leftIcon={Plus} rightIcon={ArrowRight}>
							Blue Button
						</Button>
						<Button
							variant="blue"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Blue Button
						</Button>
					</div>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<Button
							variant="blue"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							disabled
						>
							Blue Disabled
						</Button>
						<Button
							variant="blue"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							disabled
						>
							Blue Disabled
						</Button>
						<Button
							variant="blue"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							disabled
						>
							Blue Disabled
						</Button>
					</div>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<Button
							variant="blue"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							isLoading
						>
							Blue Disabled
						</Button>
						<Button
							variant="blue"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							isLoading
						>
							Blue Disabled
						</Button>
						<Button
							variant="blue"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							isLoading
						>
							Blue Disabled
						</Button>
					</div>
				</div>

				<div>
					<Typography as="h2">Green</Typography>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<Button
							variant="green"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Green Button
						</Button>
						<Button variant="green" leftIcon={Plus} rightIcon={ArrowRight}>
							Green Button
						</Button>
						<Button
							variant="green"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Green Button
						</Button>
					</div>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<Button
							variant="green"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							disabled
						>
							Green Disabled
						</Button>
						<Button
							variant="green"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							disabled
						>
							Green Disabled
						</Button>
						<Button
							variant="green"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							disabled
						>
							Green Disabled
						</Button>
					</div>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<Button
							variant="green"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							isLoading
						>
							Green Disabled
						</Button>
						<Button
							variant="green"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							isLoading
						>
							Green Disabled
						</Button>
						<Button
							variant="green"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							isLoading
						>
							Green Disabled
						</Button>
					</div>
				</div>

				<div>
					<Typography as="h2">Yellow</Typography>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<Button
							variant="yellow"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Yellow Button
						</Button>
						<Button variant="yellow" leftIcon={Plus} rightIcon={ArrowRight}>
							Yellow Button
						</Button>
						<Button
							variant="yellow"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Yellow Button
						</Button>
					</div>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<Button
							variant="yellow"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							disabled
						>
							Yellow Disabled
						</Button>
						<Button
							variant="yellow"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							disabled
						>
							Yellow Disabled
						</Button>
						<Button
							variant="yellow"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							disabled
						>
							Yellow Disabled
						</Button>
					</div>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<Button
							variant="yellow"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							isLoading
						>
							Yellow Disabled
						</Button>
						<Button
							variant="yellow"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							isLoading
						>
							Yellow Disabled
						</Button>
						<Button
							variant="yellow"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							isLoading
						>
							Yellow Disabled
						</Button>
					</div>
				</div>

				<div>
					<Typography as="h2">Red</Typography>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<Button
							variant="red"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Red Button
						</Button>
						<Button variant="red" leftIcon={Plus} rightIcon={ArrowRight}>
							Red Button
						</Button>
						<Button
							variant="red"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Red Button
						</Button>
					</div>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<Button
							variant="red"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							disabled
						>
							Red Disabled
						</Button>
						<Button
							variant="red"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							disabled
						>
							Red Disabled
						</Button>
						<Button
							variant="red"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							disabled
						>
							Red Disabled
						</Button>
					</div>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<Button
							variant="red"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							isLoading
						>
							Red Disabled
						</Button>
						<Button
							variant="red"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							isLoading
						>
							Red Disabled
						</Button>
						<Button
							variant="red"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							isLoading
						>
							Red Disabled
						</Button>
					</div>
				</div>

				<div>
					<Typography as="h2">Outline</Typography>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<Button
							variant="outline"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Outline Button
						</Button>
						<Button variant="outline" leftIcon={Plus} rightIcon={ArrowRight}>
							Outline Button
						</Button>
						<Button
							variant="outline"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Outline Button
						</Button>
					</div>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<Button
							variant="outline"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							disabled
						>
							Outline Disabled
						</Button>
						<Button
							variant="outline"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							disabled
						>
							Outline Disabled
						</Button>
						<Button
							variant="outline"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							disabled
						>
							Outline Disabled
						</Button>
					</div>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<Button
							variant="outline"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							isLoading
						>
							Outline Disabled
						</Button>
						<Button
							variant="outline"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							isLoading
						>
							Outline Disabled
						</Button>
						<Button
							variant="outline"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							isLoading
						>
							Outline Disabled
						</Button>
					</div>
				</div>

				<div>
					<Typography as="h2">Ghost</Typography>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<Button variant="ghost" leftIcon={Plus} rightIcon={ArrowRight}>
							Ghost Button
						</Button>
						<Button
							variant="ghost"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Ghost Button
						</Button>
					</div>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<Button
							variant="ghost"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							disabled
						>
							Ghost Disabled
						</Button>
						<Button
							variant="ghost"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							disabled
						>
							Ghost Disabled
						</Button>
					</div>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<Button
							variant="ghost"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							isLoading
						>
							Ghost Disabled
						</Button>
						<Button
							variant="ghost"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
							isLoading
						>
							Ghost Disabled
						</Button>
					</div>
				</div>

				<div>
					<Typography as="h2">Button Link</Typography>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<ButtonLink
							href="/"
							variant="blue"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Button Link
						</ButtonLink>
						<ButtonLink
							href="/"
							variant="blue"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Button Link
						</ButtonLink>
						<ButtonLink
							href="/"
							variant="blue"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Button Link
						</ButtonLink>
					</div>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<ButtonLink
							href="/"
							variant="green"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Green Button Link
						</ButtonLink>
						<ButtonLink
							href="/"
							variant="green"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Green Button Link
						</ButtonLink>
						<ButtonLink
							href="/"
							variant="green"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Green Button Link
						</ButtonLink>
					</div>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<ButtonLink
							href="/"
							variant="outline"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Outline Button Link
						</ButtonLink>
						<ButtonLink
							href="/"
							variant="outline"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Outline Button Link
						</ButtonLink>
						<ButtonLink
							href="/"
							variant="outline"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Outline Button Link
						</ButtonLink>
					</div>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<ButtonLink
							href="/"
							variant="yellow"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Yellow Button Link
						</ButtonLink>
						<ButtonLink
							href="/"
							variant="yellow"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Yellow Button Link
						</ButtonLink>
						<ButtonLink
							href="/"
							variant="yellow"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Yellow Button Link
						</ButtonLink>
					</div>
					<div className="mt-3 flex flex-wrap items-end gap-3">
						<ButtonLink
							href="/"
							variant="ghost"
							size="lg"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Ghost Button Link
						</ButtonLink>
						<ButtonLink
							href="/"
							variant="ghost"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Ghost Button Link
						</ButtonLink>
						<ButtonLink
							href="/"
							variant="ghost"
							size="sm"
							leftIcon={Plus}
							rightIcon={ArrowRight}
						>
							Ghost Button Link
						</ButtonLink>
					</div>
				</div>
			</section>
		</main>
	);
}
