
const images = [
	{
		name: "down-arrow",
		src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739702250/down-arrow_1_gn72pr.svg"
	},
	{
		name: "i18n",
		src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739702250/down-arrow_2_zz1obr.svg"
	},
	{
		name: "verify-icon",
		src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739702250/down-arrow_3_wx7hnd.svg"
	}
]


export function AppFooter() {
	return (
		<footer className="app-footer full">
			{/* <hr className="footer-divider" /> */}
			<div className="footer-content">
				<div className="footer-left">
					<span>&copy; 2025 Airbbb, Inc.</span>
					<span>• <a href="#">Terms</a></span>
					<span>• <a href="#">Sitemap</a></span>
					<span>• <a href="#">Privacy</a></span>
					<div className="privacy-container">
						<span>• <a href="#">Your Privacy Choices</a></span>
						<img src={images[2]?.src} alt="" />
					</div>
				</div>

				<div className="footer-right">
					<div className="language-container">
						<img src={images[1]?.src} alt="" />
						<span className="language-selector">
							English (US)
						</span>
					</div>
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
