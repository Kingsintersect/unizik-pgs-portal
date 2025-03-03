import { HeroCarousel } from "@/components/HeroCarousel";
import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
	const slides = [
		{
			image: "/bg/slide-a.jpg",
			title: "UNIZIK POST GRADUATE STUDIES",
			description: "Portal For Easy Administration",
			// buttonText: "Book Now",
			// buttonLink: "/beach",
		},
	];

	return (
		<div>
			<HeroCarousel
				slides={slides}
				width="full"
				itemsPerSlide={1}
				height="h-screen"
				options={{
					// align: "start",
					loop: true,
				}}
				autoSlide={true}
			/>
			<div className="absolute left-0 bottom-1/4 w-full min-h-20 px-10">
				<div className="h-full flex items-center justify-start gap-10">
					<Button variant={"primary"} asChild size={"lg"}>
						<Link href="/auth/signin">
							Login to continue
						</Link>
					</Button>
					<Button variant={"secondary"} asChild size={"lg"}>
						<Link href="/auth/signup" className="flex items-center gap-10">
							<div className="">Create An Account</div>
							<ChevronsRight className="h-5 w-5 ml-5 " />
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
