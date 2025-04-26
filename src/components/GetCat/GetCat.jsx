import { useEffect, useState } from 'react';
import styles from './GetCat.module.scss';
import { fetchCatImageUrl } from '../../api/getCatApi';
import Button from '../../ui/Button/Button';
import InputTypeCheckbox from '../../ui/InputTypeCheckbox/InputTypeCheckbox';
import initialCat from '../../assets/images/cat.svg';

const REFRESH_PERIOD_IN_SECONDS = 5;

const GetCat = () => {
  const [imageUrl, setImageUrl] = useState(initialCat);
  const [enabled, setEnabled] = useState(true);
  const [isAutoRefresh, setIsAutoRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const getImageUrl = async () => {
    try {
      setError(null);
      const res = await fetchCatImageUrl();
      const url = JSON.parse(res)[0].url;
      setImageUrl(url);
    } catch (error) {
      setImageUrl(null);
      setError(error);
      console.dir('error', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (enabled && isAutoRefresh) {
        getImageUrl();
      }
    }, REFRESH_PERIOD_IN_SECONDS * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [enabled, isAutoRefresh, imageUrl]);

  const handleEnableCheckboxChange = (e) => {
    setEnabled(e.target.checked);
  };

  const handleAutoRefreshCheckboxChange = (e) => {
    setIsAutoRefresh(e.target.checked);
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    getImageUrl().finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <section className={styles.getCat}>
      <form className={styles.form}>
        <InputTypeCheckbox
          label={'Enabled'}
          checked={enabled}
          onChange={handleEnableCheckboxChange}
        />
        <InputTypeCheckbox
          label={`Auto-refresh every ${REFRESH_PERIOD_IN_SECONDS} second`}
          checked={isAutoRefresh}
          onChange={handleAutoRefreshCheckboxChange}
          disabled={!enabled}
        />
        <Button type="submit" onClick={handleSubmitClick} disabled={!enabled || isLoading}>
          Get cat
        </Button>
      </form>
      <div className={styles.result}>
        {isLoading && !imageUrl ? (
          <div className={styles.loader} />
        ) : error ? (
          <p className={styles.errorMessage}>
            Something went wrong. <br />
            Maybe the cats are just busy... <br />
            Try again later
          </p>
        ) : (
          imageUrl && <img src={imageUrl} className={styles.image} alt="" />
        )}
      </div>
    </section>
  );
};

export default GetCat;
