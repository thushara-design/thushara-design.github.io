import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { socialLinks } from "../data";
import { AnimatedSection } from "./animated-section";

const EMAIL = socialLinks.find((link) => link.label === "Email")?.link;

export const Contact = () => {
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		if (isCopied) {
			const timeout = setTimeout(() => {
				setIsCopied(false);
			}, 2000);
			return () => clearTimeout(timeout);
		}
	}, [isCopied]);

	if (!EMAIL) {
		return null;
	}

	const emailText = EMAIL.split(":")[1];

	const handleCopy = async () => {
		try {
			if (navigator.clipboard && window.isSecureContext) {
				await navigator.clipboard.writeText(emailText);
			} else {
				const textArea = document.createElement("textarea");
				textArea.value = emailText;
				document.body.appendChild(textArea);
				textArea.select();
				document.execCommand("copy");
				document.body.removeChild(textArea);
			}

			setIsCopied(true);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	return (
		<AnimatedSection id="contact" className="space-y-16">
			<div className="flex items-center gap-4 mb-8">
				<div className="w-8 h-px bg-ag-border"></div>
				<h2 className="text-sm font-medium text-ag-dark tracking-widest uppercase">Let's Talk</h2>
				<div className="flex-1 h-px bg-ag-border"></div>
			</div>
			<p className="text-ag-grey text-lg leading-relaxed">
				I&apos;d love to hear from you! Whether you&apos;re looking for a UX
				designer to collaborate with, have questions about my work, or just want
				to chat about design, feel free to reach out.
			</p>
			<Button
				variant="outline"
				onClick={handleCopy}
				className="w-72 border border-solid border-ag-border hover:border-ag-grey transition-colors duration-200"
			>
				<span>{isCopied ? "Copied!" : emailText}</span>
			</Button>
		</AnimatedSection>
	);
};
