import LottieAnimation from "../lottie/lottieAnimation";
import classes from "./hero.module.scss";
import farmers from "../../animation/farmers.json";

const Hero = () => {
  return (
    <div className={classes.hero}>
      <div className={classes.hero_text}>
        <div className={classes.title}>Fresh from Farmers</div>
        <div className={classes.sub_title}>
          Get the Fresh Fruits, Vegetables and mike products from the farm to
          your home
        </div>
      </div>
      <div>
        <LottieAnimation lottie={farmers} width={400} height={400} />
      </div>
    </div>
  );
};

export default Hero;
