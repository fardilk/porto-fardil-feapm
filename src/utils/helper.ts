/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore?tab=readme-ov-file#_flatten
 * https://github.com/you-dont-need-x/you-dont-need-lodash
 */

// ----------------------------------------------------------------------

export function flattenArray<T>(list: T[], key = 'children'): T[] {
  let children: T[] = [];

  const flatten = list?.map((item: any) => {
    if (item[key] && item[key].length) {
      children = [...children, ...item[key]];
    }
    return item;
  });

  return flatten?.concat(children.length ? flattenArray(children, key) : children);
}

// ----------------------------------------------------------------------

export function flattenDeep(array: any): any[] {
  const isArray = array && Array.isArray(array);

  if (isArray) {
    return array.flat(Infinity);
  }
  return [];
}

// ----------------------------------------------------------------------

export function orderBy<T>(array: T[], properties: (keyof T)[], orders?: ('asc' | 'desc')[]): T[] {
  return array.slice().sort((a, b) => {
    for (let i = 0; i < properties.length; i += 1) {
      const property = properties[i];
      const order = orders && orders[i] === 'desc' ? -1 : 1;

      const aValue = a[property];
      const bValue = b[property];

      if (aValue < bValue) return -1 * order;
      if (aValue > bValue) return 1 * order;
    }
    return 0;
  });
}

// ----------------------------------------------------------------------

export function keyBy<T>(
  array: T[],
  key: keyof T
): {
  [key: string]: T;
} {
  return (array || []).reduce((result, item) => {
    const keyValue = key ? item[key] : item;

    return { ...result, [String(keyValue)]: item };
  }, {});
}

// ----------------------------------------------------------------------

export function sumBy<T>(array: T[], iteratee: (item: T) => number): number {
  return array.reduce((sum, item) => sum + iteratee(item), 0);
}

// ----------------------------------------------------------------------

export function isEqual(a: any, b: any): boolean {
  if (a === null || a === undefined || b === null || b === undefined) {
    return a === b;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (typeof a === 'string' || typeof a === 'number' || typeof a === 'boolean') {
    return a === b;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    return a.every((item, index) => isEqual(item, b[index]));
  }

  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a!);
    const keysB = Object.keys(b!);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return keysA.every((key) => isEqual(a[key], b[key]));
  }

  return false;
}

// ----------------------------------------------------------------------

function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export const merge = (target: any, ...sources: any[]): any => {
  if (!sources.length) return target;

  const source = sources.shift();

  // eslint-disable-next-line no-restricted-syntax
  for (const key in source) {
    if (isObject(source[key])) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      merge(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }

  return merge(target, ...sources);
};

// ----------------------------------------------------------------------
/**
 * Returns a string with asterisks (*) and trimmed characters based on the length of the input parameter.
 * If the length of the input parameter is greater than 8, only the first 8 characters will be replaced with asterisks.
 * If the length of the input parameter is greater than 6, the last 4 characters will be preserved.
 * Otherwise, only the last character will be preserved.
 * @author Ruby / Lasteinsa / SangpenciptaJS
 * @param param The input string
 * @returns The processed string with asterisks and trimmed characters
 */
export const fAsterisk = (param: string): string => {
  // Generate a string of asterisks (*) based on the length of the input parameter
  const ast = '*'.repeat(param.length > 8 ? 8 : param.length);

  // Determine the number of characters to preserve based on the length of the input parameter
  const trimVal = param.length > 6 ? 4 : 1;

  // Extract the trimmed asterisks based on the determined length
  const trimAst = ast.slice(0, param.length - trimVal);

  // Extract the trimmed characters from the end of the input parameter
  const trimParam = param.slice(-trimVal);

  // Combine the trimmed asterisks and characters
  return trimAst + trimParam;
};

// ----------------------------------------------------------------------

/**
 * @author sangpenciptajs / HIS V3 Teams
 * @param input column to grid
 * @returns
 */
export const getGridLayoutMappedValue = (input: number) => {
  if (input > 0 && input <= 12) {
    return 12 / input;
  }

  return 12;
};
