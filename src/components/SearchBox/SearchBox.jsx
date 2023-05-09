import searchIcon from '../../assets/images/searchIcon.svg';
import styles from './searchBox.module.scss';

const SearchBox = ({ id, placeholder, value, onChange }) => {
	return (
		<div className={styles.box}>
			<input
				id={id}
				type='search'
				className={styles.search}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			<label htmlFor={id} className={styles.label}>
				<img src={searchIcon} alt='magnifying glass' />
			</label>
		</div>
	);
};

export default SearchBox;
