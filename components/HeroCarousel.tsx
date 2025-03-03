"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

interface CarouselSlide {
	image: string;
	title?: string;
	description?: string;
	buttonText?: string;
	buttonLink?: string;
}

interface HeroCarouselProps {
	slides: CarouselSlide[];
	width?: "full" | "medium" | "small";
	itemsPerSlide?: 1 | 2 | 3;
	height?: string; // Example: "h-screen", "h-[500px]"
	speed?: number; // Auto-slide speed in milliseconds (e.g., 3000 for 3s)
	autoSlide?: boolean; // Enable or disable auto-slide
	options?: Record<string, any>
}

export function HeroCarousel({
	slides,
	width = "full",
	itemsPerSlide = 1,
	height = "h-screen",
	speed = 5000,
	autoSlide = true,
	options,
}: HeroCarouselProps) {
	const widthClass =
		width === "full" ? "w-full" : width === "medium" ? "max-w-4xl mx-auto" : "max-w-2xl mx-auto";
	const gridClass =
		itemsPerSlide === 1 ? "grid-cols-1" : itemsPerSlide === 2 ? "grid-cols-2" : "grid-cols-3";
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const totalSlides = slides.length;

	React.useEffect(() => {
		if (!autoSlide) return;
		const interval = setInterval(() => {
		setCurrentIndex((prev) => (prev + 1) % totalSlides);
		}, speed);

		return () => clearInterval(interval);
	}, [autoSlide, speed, totalSlides]);

	return (
		<div className={`relative ${widthClass} ${height} overflow-hidden`}>
			<Carousel
				className="w-full h-full"
				opts={options}
			>
				<CarouselContent className="flex w-full h-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
				{slides.map((slide, index) => (
					<CarouselItem key={index} className={`flex-none w-full ${gridClass} ${height}`}>
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, ease: "easeInOut" }}
							className="relative w-full h-full"
						>
							<Card className="border-0 shadow-none relative w-full h-full">
							{/* Background Image */}
							<div
								className="absolute inset-0 bg-cover bg-center w-full h-full"
								style={{ backgroundImage: `url(${slide.image})` }}
							/>

							{/* Overlay */}
							<div className="absolute inset-0 bg-black/50 flex flex-col items-start justify-center text-left text-white px-6">
								<motion.h2
								className="text-4xl md:text-6xl font-bold mb-4"
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								>
								{slide.title}
								</motion.h2>
								<motion.p
								className="text-lg md:text-xl mb-6"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.4 }}
								>
								{slide.description}
								</motion.p>
								{slide.buttonText && (
								<motion.a
									href={slide.buttonLink || "#"}
									className="bg-white text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition"
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.8, delay: 0.6 }}
								>
									{slide.buttonText}
								</motion.a>
								)}
							</div>
							</Card>
						</motion.div>
					</CarouselItem>
				))}
				</CarouselContent>
				<CarouselPrevious onClick={() => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)} />
				<CarouselNext onClick={() => setCurrentIndex((prev) => (prev + 1) % totalSlides)} />
			</Carousel>
		</div>
	);
}
