import styles from './InputTypeCheckbox.module.scss';

const InputTypeCheckbox = (props) => {
  const { label, ...otherProps } = props;
  return (
    <label className={styles.inputTypeCheckbox}>
      <input className={styles.input} type="checkbox" {...otherProps} />
      <p className={styles.label}>{label}</p>
    </label>
  );
};

export default InputTypeCheckbox;
