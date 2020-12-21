import styles from 'styles/components/header.module.scss';

const Header: React.FC = function () {
	return (
		<nav className={styles.header}>
			<div className={styles.container}>
				<ul className={styles.content}>
					<li>
						<a href="/" className={styles.title}>
							Jaiden Douglas
						</a>
					</li>
				</ul>

				<ul className={styles.content}>
					<li>
						<a href="https://github.com/ja1den">
							<img src="github.svg" alt="GitHub Logo" />
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Header;
