import { ICONS } from '../constants';

const getIcon = (name) => {
  let icon;

  switch (name) {
    case 'email':
      icon = ICONS.EMAIL;
      break;
    case 'facebook':
      icon = ICONS.FACEBOOK;
      break;
    case 'github':
      icon = ICONS.GITHUB;
      break;
    case 'twitter':
      icon = ICONS.TWITTER;
      break;
    default:
      icon = {};
      break;
  }

  return icon;
};

export default getIcon;
