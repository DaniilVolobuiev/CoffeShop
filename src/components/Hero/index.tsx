import React from 'react';

import HeroImg from '../../images/hero-image.png';
import Star from '../../images/Star.png';

import styles from './hero.module.scss';
function Hero() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>
            Enjoy your <span style={{ color: '#FF902B' }}>coffe</span> <br /> before your activity
          </h1>
          <p>
            Boost your productivity and build your <br /> mood with a glass of coffee in the morning
          </p>
        </div>
        <div className={styles.heroPicture}>
          <img className={styles.heroImg} src={HeroImg} />
          <div className={styles.heroElementWrapperName}>
            <div className={styles.heroPictureName}>
              <span>Cappuccino</span>
            </div>
          </div>
          <div className={styles.heroElementWrapperPrice}>
            <div className={styles.heroPicturePrice}>
              <span>5$</span>
            </div>
          </div>
          <div className={styles.heroElementWrapperRating}>
            <div className={styles.heroPictureRating}>
              <span>4.8</span>
              <img className={styles.starImg} src={Star} />
            </div>
          </div>
        </div>
      </section>
      <p className={styles.title}>
        Popular <span>Now</span>
      </p>
    </>
  );
}

export default Hero;
