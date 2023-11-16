import { ERROR_MESSAGE, MENU, MENU_KIND } from './constants';

const validateDate = date => {
  if (!(date >= 1 && date <= 31)) {
    throw new Error(ERROR_MESSAGE.INVALID_DATE);
  }
  if (typeof date !== 'number' || !Number.isInteger(date)) {
    throw new Error(ERROR_MESSAGE.INVALID_DATE);
  }
};

const validateName = menu => {
  const checkedName = new Set();
  menu.forEach(([name]) => {
    if (!Object.keys(MENU).includes(name)) {
      throw new Error(ERROR_MESSAGE.INVALID_ORDER);
    }
    checkedName.add(name);
  });
};

const validateDuplicate = menu => {
  const checkedName = new Set();
  menu.forEach(([name]) => {
    if (checkedName.has(name)) {
      throw new Error(ERROR_MESSAGE.INVALID_ORDER);
    }
    checkedName.add(name);
  });
};

const validateOnlyDrink = menu => {
  const types = new Set(menu.map(([name]) => MENU[name].type));
  if (types.size === 1 && types.has(MENU_KIND.DRINK)) {
    throw new Error(ERROR_MESSAGE.INVALID_ORDER);
  }
};

const validateCount = menu => {
  if (!menu.every(([, count]) => count >= 1)) {
    throw new Error(ERROR_MESSAGE.INVALID_ORDER);
  }
};

const validateTotalCount = menu => {
  const total = menu.reduce((acc, [, count]) => acc + count, 0);
  if (total > 20) {
    throw new Error(ERROR_MESSAGE.INVALID_ORDER);
  }
};

const validateOrder = order => {
  validateName(order);
  validateDuplicate(order);
  validateOnlyDrink(order);
  validateCount(order);
  validateTotalCount(order);
};

export { validateDate, validateOrder };
