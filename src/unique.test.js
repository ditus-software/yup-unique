//
// Copyright (c) DITUS INC. All rights reserved. See LICENSE file in the project
// root for details.
//
import * as Yup from 'yup';
import './unique';

describe('unique', () => {
  it('returns a range error if the name is null, undefined, an empty string, or white space.', () => {
    const schema = Yup.array();

    expect(() => { schema.unique(null, 'error message'); }).toThrowError(RangeError);
    expect(() => { schema.unique(undefined, 'error message'); }).toThrowError(RangeError);
    expect(() => { schema.unique('', 'error message'); }).toThrowError(RangeError);
    expect(() => { schema.unique(' ', 'error message'); }).toThrowError(RangeError);
    expect(() => { schema.unique(null, 'error message'); }).toThrowError('The name argument is required.');
  });

  it('does not return an error if the name is specified.', () => {
    const schema = Yup.array();

    expect(() => { schema.unique('test', 'error message'); }).not.toThrowError();
  });

  it('returns success if the array is empty.', async () => {
    const schema = Yup.array();

    const array = [];

    await expect(schema.unique('test', 'error message').validate(array)).resolves.toBe(array);
  });

  it('returns success if none of the elements within the array contain a property with the name.', async () => {
    const schema = Yup.array();

    const array = [
      {
        test: 'one',
      },
      {
        test: 'two',
      },
    ];

    await expect(schema.unique('other', 'error message').validate(array)).resolves.toBe(array);
  });

  it('returns success if the array does not contain any duplicates.', async () => {
    const schema = Yup.array();

    const array = [
      {
        test: 'one',
      },
      {
        test: 'two',
      },
    ];

    await expect(schema.unique('test', 'error message').validate(array)).resolves.toBe(array);
  });

  it('does not return success if the array contains a case insensitive duplicate.', async () => {
    const schema = Yup.array();

    const array = [
      {
        test: 'one',
      },
      {
        test: 'one',
      },
    ];

    await expect(schema.unique('test', 'error message').validate(array)).rejects.toThrow('error message');
  });

  it('does not return success if the array contains a case sensitive duplicate.', async () => {
    const schema = Yup.array();

    const array = [
      {
        test: 'one',
      },
      {
        test: 'ONE',
      },
    ];

    await expect(schema.unique('test', 'error message').validate(array)).rejects.toThrow('error message');
  });

  it('returns success if the array does not contain any duplicates on a numeric property.', async () => {
    const schema = Yup.array();

    const array = [
      {
        test: 1,
      },
      {
        test: 2,
      },
    ];

    await expect(schema.unique('test', 'error message').validate(array)).resolves.toBe(array);
  });

  it('does not return success if the array contains a duplicate on a numeric property.', async () => {
    const schema = Yup.array();

    const array = [
      {
        test: 1,
      },
      {
        test: 1,
      },
    ];

    await expect(schema.unique('test', 'error message').validate(array)).rejects.toThrow('error message');
  });
});
