import { useEffect, useState } from "react";
import { AnimatedSection } from "./animated-section";
import { Button } from "./ui/button";
import { socialLinks } from "../data";

const EMAIL = socialLinks.find((link) => link.label === "Email")?.link;

export const Contact = () => {
	const [isCopied, setIsCopied] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		// Detect if the user is on a mobile device
		setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
	}, []);

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
		<AnimatedSection delay={1} id="contact" className="space-y-6">
			<h4 className="text-2xl font-bold text-dark">Let&apos;s talk</h4>
			<p className="text-dark">
				I&apos;d love to hear from you! Whether you&apos;re looking for a UX
				designer to collaborate with, have questions about my work, or just want
				to chat about design, feel free to reach out.
			</p>
			<Button
				variant="outline"
				onClick={handleCopy}
				onMouseEnter={() => !isMobile && setIsHovered(true)}
				onMouseLeave={() => {
					if (!isMobile) {
						setIsHovered(false);
						setIsCopied(false);
					}
				}}
				className="w-72 border border-solid border-border"
			>
				<span className="transition-opacity duration-300">
					{isCopied ? "Copied!" : isHovered ? "Copy" : emailText}
				</span>
			</Button>
		</AnimatedSection>
	);
};
