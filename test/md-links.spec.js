const mdLinks = require("../src/md-links.js");


describe('mdLinks', () => {
  it('Debería devolver una promesa', () => {
    expect(mdLinks).toBe(typeof Promise);
  });
});

describe('mdLinks function', () => {
  test('should return an array of links when options.validate is false', () => {
    const path = 'path/to/file.md';
    const options = { validate: false };
    const expectedOutput = [
      { href: 'http://example.com', text: 'Example' },
      { href: 'https://www.google.com', text: 'Google' },
    ];

    return mdLinks(path, options).then((output) => {
      expect(output).toEqual(expectedOutput);
    });
  });

  test('should return an array of link objects when options.validate is true', () => {
    const path = 'path/to/file.md';
    const options = { validate: true };
    const expectedOutput = [
      {
        href: 'http://example.com',
        text: 'Example',
        message: 'OK',
        statusCode: 200,
      },
      {
        href: 'https://www.google.com',
        text: 'Google',
        message: 'OK',
        statusCode: 200,
      },
    ];

    return mdLinks(path, options).then((output) => {
      expect(output).toEqual(expectedOutput);
    });
  });

  test('should reject with an error message when no markdown files are found', () => {
    const path = 'path/to/directory';
    const options = { validate: false };
    const expectedErrorMessage = 'No Markdown (.md) files found';

    return mdLinks(path, options).catch((error) => {
      expect(error).toEqual(expectedErrorMessage);
    });
  });

  test('should reject with an error message when the path does not exist', () => {
    const path = 'non-existent/path';
    const options = { validate: false };
    const expectedErrorMessage = 'The path do not exist. Did you mean --help?';

    return mdLinks(path, options).catch((error) => {
      expect(error).toEqual(expectedErrorMessage);
    });
  });
});
