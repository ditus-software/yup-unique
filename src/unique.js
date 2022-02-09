//
// Copyright (c) DITUS INC. All rights reserved. See LICENSE file in the project
// root for details.
//
import * as Yup from 'yup';

/**
 * Checks that an array of objects does not contain any duplicates for a
 * specified property.
 *
 * @param {string} name The name of the property within the object.
 * @param {string} message The message to display if the array contains
 * duplicates.
 * @returns {Promise} A promise that resolves or rejects.
 */
function unique(name, message) {
  if (!name || name.trim() === '') {
    throw new RangeError('The name argument is required.');
  }

  // If there is no value entered in the field, then this method must return
  // true, otherwise, it is impossible to make a field optional that uses this
  // rule.
  return this.test(
    'unique',
    message,
    (value) => value.filter((x, index) => x[name]
      && value.findIndex((y) => y[name].toString().toLowerCase()
        === x[name].toString().toLowerCase())
        !== index).length === 0,
  );
}

Yup.addMethod(Yup.array, 'unique', unique);
