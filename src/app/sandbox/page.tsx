import PrimaryLink from "@/components/links/PrimaryLink";
import Layout from "@/layouts/Layout";

export default function SandboxPage() {
	return (
		<Layout withNavbar withFooter>
			<div className="flex flex-col items-center justify-center h-screen bg-white text-gray-900 gap-4">
				<div className="text-center">
					<h1 className="text-4xl font-bold">Sandbox Page</h1>
					<p className="text-lg">
						This is a sandbox page for testing purposes.
					</p>
				</div>
				<div className="flex gap-4">
					<PrimaryLink variant="red" href="/sandbox/button">
						Button
					</PrimaryLink>
					<PrimaryLink variant="blue" href="/sandbox/form">
						Form
					</PrimaryLink>
					<PrimaryLink variant="green" href="/sandbox/table">
						Table
					</PrimaryLink>
				</div>
			</div>
		</Layout>
	);
}
