import logo from "./extensions/logo.png";

const myPrimaryColor = '#063970';

const config = {
  // locales: [
  // 'id'
  // ],
  // translations: {
  //   id: {
  //     "Media Library": "Pustaka"
  //   }
  // },
  auth: {
    logo,
  },
  menu: {
    logo,
  },
  head: {
    favicon: logo,
  },
  tutorials: false,
  theme: {
    colors: {
      buttonPrimary600: myPrimaryColor,
      buttonPrimary500: myPrimaryColor,
      primary600: myPrimaryColor,
      primary500: myPrimaryColor,
    },
  },
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
