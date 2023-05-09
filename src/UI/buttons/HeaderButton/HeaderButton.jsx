import styles from './headerButton.module.scss';

const HeaderButton = (props) => {
	return (
		<button
			type={'button'}
			onClick={props.onClick}
			className={`${styles.button} ${props.classname}`}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};

export default HeaderButton;
