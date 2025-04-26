import styles from './Button.module.scss';

const Button = (props) => {
  const { children, ...otherProps } = props;
  return (
    <button className={styles.button} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
