
const images = [
	{
		name: "down-arrow",
		src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739702250/down-arrow_1_gn72pr.svg"
	},
	{
		name: "i18n",
		src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739702250/down-arrow_2_zz1obr.svg"
	}
]


export function AppFooter() {
	return (
		<footer className="app-footer full">
			{/* <hr className="footer-divider" /> */}
			<div className="footer-content">
				<div className="footer-left">
					<span>&copy; 2025 Airbnb, Inc.</span>
					<span>• <a href="#">Terms</a></span>
					<span>• <a href="#">Sitemap</a></span>
					<span>• <a href="#">Privacy</a></span>
					<span>• <a href="#">Your Privacy Choices</a></span>
				</div>

				<div className="footer-right">
					<span className="language-selector">
						English (US)
					</span>
					<span className="currency-selector">
						$ USD
					</span>
					<div className="support-dropdown-container">
						<span className="support-dropdown">
							Support & Resources
						</span>
						<span><img src={images[0]?.src} alt="Dropdown" /></span>
					</div>
				</div>
			</div>
		</footer>
	)
}
