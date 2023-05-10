import styles from './modalButton.module.scss';

const ModalButton = (props) => {
	return (
		<button
			type={'button'}
			onClick={props.onClick}
			className={`${styles.button} ${props.inverted ? styles.inverted : ''}`}
		>
			{props.children}
		</button>
	);
};

export default ModalButton;
