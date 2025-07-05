import Footer from "@/layouts/Footer";
import Navbar from "@/layouts/Navbar";

interface LayoutProps {
	children: React.ReactNode;
	withFooter?: boolean;
	withNavbar?: boolean;
	className?: string;
}
export default function Layout({
	children,
	withFooter,
	withNavbar,
	className,
}: LayoutProps) {
	return (
		<>
			{withNavbar && <Navbar />}
			<main className={className}>{children}</main>
			{withFooter && <Footer />}
		</>
	);
}
