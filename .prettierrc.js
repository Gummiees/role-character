module.exports = {
    printWidth: 150,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    arrowParens: 'always',
    proseWrap: 'never',
    htmlWhitespaceSensitivity: 'strict',
    overrides: [
        {
            files: '*.ts',
            options: { parser: 'typescript' },
        },
    ],
};
