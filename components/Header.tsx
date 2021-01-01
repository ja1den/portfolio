import Link from 'next/link';

const Header: React.FC = function () {
	return (
		<nav>
			<div>
				<ul>
					<li>
						<Link href="/">
							<a>Jaiden Douglas</a>
						</Link>
					</li>
				</ul>

				<ul>
					<li>
						<a href="https://github.com/ja1den">GitHub</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Header;
