"use client";

import * as React from "react";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export interface GradientButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
	size?: "default" | "sm" | "lg" | "icon";
	asChild?: boolean;
	title?: string;
}

/**
 * Gradient button component extending shadcn/ui Button
 *
 * Features:
 * - Beautiful gradient background with hover effects
 * - All shadcn/ui Button props supported
 * - Responsive design with proper contrast
 * - Accessible with focus states
 * - Smooth animations and transitions
 */
const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
	({ className, variant = "default", size = "default", title, ...props }, ref) => {
		return (
			<Button
				className={cn(
					// Base gradient styling
					"bg-gradient-to-r from-primary to-purple-600 text-white border-0",
					"hover:from-primary/90 hover:to-purple-600/90",
					"focus:ring-2 focus:ring-primary/20 focus:ring-offset-2",
					"transition-all duration-200 ease-in-out",
					"shadow-lg hover:shadow-xl",
					// Ensure text is always visible
					"[&>*]:text-white [&>*]:fill-white",
					className,
				)}
				variant={variant}
				size={size}
				ref={ref}
				{...props}
			>
				{title || props.children}
			</Button>
		);
	},
);

GradientButton.displayName = "GradientButton";

export default GradientButton;
