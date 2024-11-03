/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {FlatCompat} from '@eslint/eslintrc'
import js from '@eslint/js'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import sortExports from 'eslint-plugin-sort-exports'
import globals from 'globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})

export default [...compat.extends(
	'eslint:recommended',
	'plugin:@typescript-eslint/eslint-recommended',
	'plugin:@typescript-eslint/recommended',
	'plugin:@typescript-eslint/recommended-requiring-type-checking',
	'plugin:yml/recommended',
	'plugin:jsonc/recommended-with-jsonc',
),
{
	ignores: [
		'jest.config.ts',
		'package-lock.json',
		'package.json',
		'.vscode/*',
		'coverage',
		'tsconfig.json',
	],
},
importPlugin.flatConfigs.recommended,
{
	plugins: {
		'@typescript-eslint': typescriptEslint,
		'@stylistic/ts': stylisticTs,
	},

	languageOptions: {
		globals: {
			...globals.browser,
		},

		parser: tsParser,
		ecmaVersion: 5,
		sourceType: 'script',

		parserOptions: {
			project: './tsconfig.json',
			tsconfigRootDir: __dirname,
			sourceType: 'module',
		},
	},

	rules: {
		'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
		'import/export': 'error',
		'import/exports-last': 'error',
		'import/group-exports': 'error',
		'import/newline-after-import': 'error',
		'import/no-absolute-path': 'error',
		'import/no-duplicates': 'error',
		'import/no-extraneous-dependencies': 'error',
		'import/no-relative-packages': 'error',
		'import/no-unresolved': 'off',

		'import/order': ['error', {
			'newlines-between': 'never',

			alphabetize: {
				order: 'asc',
				caseInsensitive: true,
			},

			warnOnUnassignedImports: true,
		}],

		'array-callback-return': 'error',
		'constructor-super': 'error',
		'getter-return': 'error',
		'no-cond-assign': 'error',
		'no-const-assign': 'error',
		'no-control-regex': 'error',
		'no-dupe-args': 'error',
		'no-dupe-class-members': 'error',
		'no-dupe-else-if': 'error',
		'no-dupe-keys': 'error',
		'no-duplicate-case': 'error',
		'no-duplicate-imports': 'off',
		'no-empty-character-class': 'error',
		'no-empty-pattern': 'error',
		'no-ex-assign': 'error',
		'no-fallthrough': 'error',
		'no-func-assign': 'error',
		'no-import-assign': 'error',
		'no-inner-declarations': ['error', 'functions'],
		'no-invalid-regexp': 'error',
		'no-irregular-whitespace': 'error',
		'no-loss-of-precision': 'error',
		'no-misleading-character-class': 'error',
		'no-new-native-nonconstructor': 'error',
		'no-new-symbol': 'error',
		'no-obj-calls': 'error',
		'no-promise-executor-return': 'error',
		'no-self-assign': 'error',
		'no-self-compare': 'error',
		'no-setter-return': 'error',
		'no-sparse-arrays': 'error',
		'no-template-curly-in-string': 'error',
		'no-unexpected-multiline': 'error',
		'no-unmodified-loop-condition': 'error',
		'no-unreachable': 'error',
		'no-unsafe-finally': 'error',
		'no-unsafe-negation': 'error',
		'no-unsafe-optional-chaining': 'error',

		'no-unused-vars': ['error', {
			vars: 'all',
			args: 'none',
			varsIgnorePattern: '^[A-Z]+',
		}],

		'no-useless-backreference': 'error',
		'use-isnan': 'error',
		'valid-typeof': 'error',
		'accessor-pairs': 'error',
		'arrow-body-style': 'error',
		'block-scoped-var': 'error',
		curly: 'error',
		'default-case-last': 'error',
		'default-param-last': 'error',
		eqeqeq: 'error',

		'func-style': ['error', 'declaration', {
			allowArrowFunctions: true,
		}],

		'grouped-accessor-pairs': 'error',
		'guard-for-in': 'error',
		'max-depth': 'error',
		'max-nested-callbacks': 'error',
		'max-params': ['error', 4],
		'no-alert': 'error',
		'no-array-constructor': 'error',
		'no-caller': 'error',
		'no-case-declarations': 'error',
		'no-delete-var': 'error',
		'no-div-regex': 'error',
		'no-else-return': 'error',
		'no-extend-native': 'error',
		'no-extra-bind': 'error',
		'no-extra-boolean-cast': 'error',
		'no-extra-label': 'error',
		'no-extra-semi': 'error',
		'no-floating-decimal': 'error',
		'no-global-assign': 'error',

		'no-implicit-coercion': ['error', {
			boolean: false,
			number: true,
			string: true,
		}],

		'no-implicit-globals': 'error',
		'no-implied-eval': 'error',
		'no-invalid-this': 'error',
		'no-iterator': 'error',
		'no-label-var': 'error',
		'no-labels': 'error',
		'no-lonely-if': 'error',
		'no-loop-func': 'error',

		'no-mixed-operators': ['error', {
			groups: [
				['&', '|', '^', '~', '<<', '>>', '>>>'],
				['==', '!=', '===', '!==', '>', '>=', '<', '<='],
				['&&', '||'],
				['in', 'instanceof'],
			],
		}],

		'no-multi-str': 'error',
		'no-new': 'error',
		'no-new-func': 'error',
		'no-new-object': 'error',
		'no-new-wrappers': 'error',
		'no-nonoctal-decimal-escape': 'error',
		'no-octal': 'error',
		'no-octal-escape': 'error',
		'no-proto': 'error',
		'no-redeclare': 'error',
		'no-regex-spaces': 'error',

		'no-restricted-imports': ['error', {
			patterns: ['@ispring/*/*', '**/index', '**/index.*'],
		}],

		'no-return-assign': 'error',
		'no-return-await': 'error',
		'no-script-url': 'error',
		'no-sequences': 'error',

		'no-shadow': ['error', {
			hoist: 'never',
		}],

		'no-shadow-restricted-names': 'error',
		'no-throw-literal': 'error',
		'no-unneeded-ternary': 'error',

		'no-unused-expressions': ['error', {
			allowShortCircuit: true,
		}],

		'no-unused-labels': 'error',
		'no-useless-call': 'error',
		'no-useless-computed-key': 'error',
		'no-useless-concat': 'error',
		'no-useless-constructor': 'off',
		'no-useless-escape': 'error',
		'no-useless-rename': 'error',
		'no-useless-return': 'error',
		'no-var': 'error',
		'no-void': 'error',
		'no-with': 'error',

		'object-shorthand': ['error', 'properties', {
			avoidQuotes: true,
		}],

		'one-var': 'off',
		'one-var-declaration-per-line': ['error', 'initializations'],
		'operator-assignment': 'error',
		'prefer-arrow-callback': 'error',

		'prefer-const': ['error', {
			destructuring: 'all',
		}],

		'prefer-destructuring': ['error', {
			array: false,
			object: false,
		}],

		'prefer-exponentiation-operator': 'error',
		'prefer-numeric-literals': 'error',
		'prefer-object-spread': 'error',
		'prefer-regex-literals': 'error',
		'prefer-rest-params': 'error',
		'prefer-spread': 'error',
		radix: ['error', 'always'],
		'require-yield': 'error',
		'spaced-comment': ['error', 'always'],
		'symbol-description': 'error',

		yoda: ['error', 'never', {
			exceptRange: true,
		}],

		'array-bracket-newline': ['error', 'consistent'],
		'array-bracket-spacing': ['error', 'never'],
		'array-element-newline': ['error', 'consistent'],
		'arrow-parens': ['error', 'as-needed'],

		'arrow-spacing': ['error', {
			after: true,
			before: true,
		}],

		'block-spacing': 'error',

		'brace-style': ['error', 'stroustrup', {
			allowSingleLine: false,
		}],

		'comma-dangle': ['error', 'always-multiline'],

		'comma-spacing': ['error', {
			before: false,
			after: true,
		}],

		'comma-style': ['error', 'last'],
		'computed-property-spacing': ['error', 'never'],
		'dot-location': ['error', 'property'],
		'eol-last': ['error', 'always'],
		'func-call-spacing': ['error', 'never'],
		'generator-star-spacing': 'error',

		indent: ['error', 'tab', {
			ignoredNodes: ['TemplateLiteral *'],
			SwitchCase: 1,
		}],

		'jsx-quotes': 'error',
		'key-spacing': 'error',
		'keyword-spacing': 'error',
		'linebreak-style': ['error', 'unix'],

		'max-len': ['error', {
			code: 120,
			ignoreUrls: true,
			ignoreStrings: true,
			ignoreTemplateLiterals: true,
		}],

		'max-statements-per-line': 'error',
		'multiline-ternary': 'error',
		'new-parens': ['error', 'always'],
		'newline-per-chained-call': 'error',
		'no-mixed-spaces-and-tabs': 'error',

		'no-multi-spaces': ['error', {
			ignoreEOLComments: true,
		}],

		'no-multiple-empty-lines': 'error',
		'no-trailing-spaces': 'error',
		'no-whitespace-before-property': 'error',

		'object-curly-newline': ['error', {
			multiline: true,
			consistent: true,
			minProperties: 3,
		}],

		'object-curly-spacing': 'error',
		'object-property-newline': ['error'],
		'operator-linebreak': ['error', 'before'],

		quotes: ['error', 'single', {
			allowTemplateLiterals: true,
		}],

		'rest-spread-spacing': 'error',
		semi: ['error', 'never'],

		'semi-spacing': ['error', {
			after: true,
			before: false,
		}],

		'space-before-blocks': 'error',

		'space-before-function-paren': ['error', {
			anonymous: 'never',
			named: 'never',
			asyncArrow: 'always',
		}],

		'space-in-parens': ['error', 'never'],
		'space-infix-ops': 'error',
		'space-unary-ops': 'error',
		'switch-colon-spacing': 'error',
		'template-curly-spacing': ['error', 'never'],
		'template-tag-spacing': ['error', 'never'],
		'unicode-bom': ['error', 'never'],
		'yield-star-spacing': 'error',
	},
},
{
	files: ['**/*.ts', '**/*.tsx', '**/*.jsx'],

	plugins: {
		'@typescript-eslint': typescriptEslint,
	},

	languageOptions: {
		parser: tsParser,
	},

	rules: {
		'@typescript-eslint/adjacent-overload-signatures': 'error',

		'@typescript-eslint/array-type': ['error', {
			default: 'array',
		}],

		'@typescript-eslint/ban-ts-comment': 'error',
		'@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],

		'@typescript-eslint/consistent-type-assertions': ['error', {
			assertionStyle: 'as',
		}],

		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
		'@typescript-eslint/consistent-type-imports': 'error',

		'@typescript-eslint/explicit-member-accessibility': ['error', {
			accessibility: 'no-public',
		}],

		'@stylistic/ts/member-delimiter-style': ['error', {
			multiline: {
				delimiter: 'comma',
				requireLast: true,
			},

			singleline: {
				delimiter: 'comma',
				requireLast: false,
			},
		}],

		'@typescript-eslint/member-ordering': 'off',
		'@typescript-eslint/method-signature-style': ['error', 'property'],

		'@typescript-eslint/naming-convention': ['error', {
			selector: 'objectLiteralMethod',
			format: null,
		}, {
			selector: 'objectLiteralProperty',
			format: null,
		}, {
			selector: ['enum', 'typeParameter'],
			format: ['UPPER_CASE'],
			leadingUnderscore: 'allow',
		}, {
			selector: 'enumMember',
			format: ['camelCase'],
			leadingUnderscore: 'allow',
		}, {
			selector: 'parameter',
			format: ['camelCase'],
			leadingUnderscore: 'allow',
		}, {
			selector: 'typeLike',
			format: ['PascalCase'],
			leadingUnderscore: 'allow',
		}, {
			selector: 'method',
			format: ['camelCase'],
			leadingUnderscore: 'allow',
		}],

		'@typescript-eslint/no-duplicate-enum-values': 'error',
		'@typescript-eslint/no-extraneous-class': 'error',

		'@typescript-eslint/no-inferrable-types': ['error', {
			ignoreParameters: true,
		}],

		'@typescript-eslint/no-misused-new': 'error',
		'@typescript-eslint/no-namespace': 'error',
		'@typescript-eslint/no-non-null-assertion': 'error',
		'@typescript-eslint/no-require-imports': 'error',
		'@typescript-eslint/prefer-as-const': 'error',
		'@typescript-eslint/prefer-function-type': 'error',
		'@typescript-eslint/prefer-optional-chain': 'off',
		'@typescript-eslint/prefer-ts-expect-error': 'error',

		'@stylistic/ts/type-annotation-spacing': ['error', {
			before: false,
			after: true,

			overrides: {
				arrow: {
					before: true,
					after: true,
				},
			},
		}],

		'@typescript-eslint/unified-signatures': 'error',
		'brace-style': 'off',
		'@stylistic/ts/brace-style': ['error', 'stroustrup'],
		'comma-dangle': 'off',
		'@stylistic/ts/comma-dangle': ['error', 'always-multiline'],
		'comma-spacing': 'off',

		'@stylistic/ts/comma-spacing': ['error', {
			before: false,
			after: true,
		}],

		'default-param-last': 'off',
		'@typescript-eslint/default-param-last': 'error',
		'func-call-spacing': 'off',
		'@stylistic/ts/func-call-spacing': ['error', 'never'],
		'keyword-spacing': 'off',
		'@stylistic/ts/keyword-spacing': 'error',
		'no-array-constructor': 'off',
		'@typescript-eslint/no-array-constructor': 'error',
		'no-dupe-class-members': 'off',
		'@typescript-eslint/no-dupe-class-members': 'error',
		'no-invalid-this': 'off',
		'@typescript-eslint/no-invalid-this': 'error',
		'no-loop-func': 'off',
		'@typescript-eslint/no-loop-func': 'error',
		'no-loss-of-precision': 'off',
		'@typescript-eslint/no-loss-of-precision': 'error',
		'no-redeclare': 'off',
		'@typescript-eslint/no-redeclare': 'error',
		'no-restricted-imports': 'off',

		'@typescript-eslint/no-restricted-imports': ['error', {
			patterns: ['@ispring/*/*', '**/index', '**/index.*'],
		}],

		'no-shadow': 'off',

		'@typescript-eslint/no-shadow': ['error', {
			hoist: 'never',
		}],

		'no-unused-expressions': 'off',

		'@typescript-eslint/no-unused-expressions': ['error', {
			allowShortCircuit: true,
		}],

		'no-unused-vars': 'off',

		'@typescript-eslint/no-unused-vars': ['error', {
			vars: 'all',
			args: 'none',
			varsIgnorePattern: '^[A-Z]+',
		}],

		'no-useless-constructor': 'off',
		'@typescript-eslint/no-useless-constructor': 'error',
		'object-curly-spacing': 'off',
		'@stylistic/ts/object-curly-spacing': 'error',
		quotes: 'off',

		'@stylistic/ts/quotes': ['error', 'single', {
			allowTemplateLiterals: true,
		}],

		semi: 'off',
		'@stylistic/ts/semi': ['error', 'never'],
		'space-before-blocks': 'off',
		'@stylistic/ts/space-before-blocks': 'error',
		'space-before-function-paren': 'off',

		'@stylistic/ts/space-before-function-paren': ['error', {
			anonymous: 'never',
			named: 'never',
			asyncArrow: 'always',
		}],

		'space-infix-ops': 'off',
		'@stylistic/ts/space-infix-ops': 'error',
	},
},
{
	files: ['packages/*/src/index.ts'],

	plugins: {
		'@typescript-eslint': typescriptEslint,
		'sort-exports': sortExports,
	},

	languageOptions: {
		parser: tsParser,
	},

	rules: {
		'sort-exports/sort-exports': ['error', {
			sortDir: 'asc',
			ignoreCase: true,
			sortExportKindFirst: 'type',
		}],
	},
},
{
	files: ['**/*.json', '**/*.yaml', '**/*.yml'],

	rules: {
		'yml/indent': ['error', 2],
		'jsonc/indent': ['error', 2],
		'no-irregular-whitespace': 'off',
		'comma-spacing': 'off',
		'jsonc/no-useless-escape': 'off',
		'jsonc/key-spacing': 'off',
		'jsonc/array-element-newline': 'off',
		'jsonc/object-property-newline': 'off',
		'jsonc/key-name-casing': 'off',
	},
}]
