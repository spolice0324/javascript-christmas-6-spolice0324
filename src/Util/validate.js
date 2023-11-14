import { ERROR_MESSAGE, MENU, MENU_KIND } from './constants';

const validateDate = date => {
  if (!(date >= 1 && date <= 31)) throw new Error(ERROR_MESSAGE.INVALID_DATE);
};

const validateName = menu => {
  menu.forEach(([name]) => {
    if (!Object.keys(MENU).includes(name))
      throw new Error(ERROR_MESSAGE.INVALID_ORDER);
  });
};

const validateDuplicate = menu => {
  const checkedName = new Set();
  menu.forEach(([name]) => {
    if (checkedName.has(name)) throw new Error(ERROR_MESSAGE.INVALID_ORDER);
    checkedName.add(name);
  });
};

const validateDrink = menu => {
  const type = new Set();
  menu.forEach(([name]) => {
    type.add(MENU[name].type);
  });
  if (type.has(MENU_KIND.DRINK) && type.size === 1)
    throw new Error(ERROR_MESSAGE.INVALID_ORDER);
};

const validateCount = menu => {
  menu.forEach(([, count]) => {
    if (!(count >= 1)) throw new Error(ERROR_MESSAGE.INVALID_ORDER);
  });
};

const validateTotalCount = menu => {
  const total = menu.reduce((acc, [, count]) => acc + count, 0);
  if (total > 20) throw new Error(ERROR_MESSAGE.INVALID_ORDER);
};

export {
  validateDate,
  validateName,
  validateDuplicate,
  validateDrink,
  validateCount,
  validateTotalCount,
};
