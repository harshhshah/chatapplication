# otherwise

Executes fallback behavior if a function was unsuccessful. Intended for use in modules that use option object arguments.

## Installation

Requires [Node.js](https://nodejs.org/) 6.0.0 or above.

```bash
npm i otherwise
```

## API

The module exports a single function.

### Parameters

1. Optional: Object argument:
    * `elseCall` (function): If provided, this function will be called with one argument: a function that will invoke the other fallbacks. If the function argument is not called, then `elseThrow` and `elseReturn` will not be taken into consideration, and the return value of the `elseCall` function will be forwarded.
    * `elseThrow` (Error or string): An error to be thrown. A string will be wrapped in an `Error` object automatically.
    * `elseReturn` (any): A value to return if `elseThrow` is omitted.
2. Optional: `defaultErrorClass` (Class): An Error class in which to wrap `elseThrow` if it is a string.

### Return Value

Returns the return value of `elseCall` (if provided) or returns `elseReturn`.
