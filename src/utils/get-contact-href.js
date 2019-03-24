const getContactHref = (name, contact) => {
  let href;

  switch (name) {
    case 'email':
      href = `mailto:${contact}`;
      break;
    case 'github':
      href = `https://github.com/${contact}`;
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
