const getContactHref = (name, contact) => {
  let href;

  switch (name) {
    case 'email':
      href = `mailto:${contact}`;
      break;
    case 'facebook':
      href = `https://facebook.com/${contact}`;
      break;
    case 'github':
      href = `https://github.com/${contact}`;
      break;
    case 'linkedin':
      href = `https://www.linedin.com/${contact}`;
      break;
    case 'twitter':
      href = `https://www.twitter.com/${contact}`;
      break;
    default:
      href = contact;
      break;
  }

  return href;
};

export default getContactHref;
