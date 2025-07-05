import Layout from "@/layouts/Layout";

export default function SandboxPage() {
	return (
		<Layout withNavbar withFooter>
			<div className="flex flex-col items-center justify-center h-screen">
				<h1 className="text-4xl font-bold mb-4">Sandbox Page</h1>
				<p className="text-lg">This is a sandbox page for testing purposes.</p>
			</div>
		</Layout>
	);
}
