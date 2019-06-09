# pfn

Possible Function.

Wraps what might be a function, with fallback behavior in case it’s not. Perfect for use in functions that accept optional callback arguments.

## Installation

Requires [Node.js](https://nodejs.org/) 4.0.0 or above.

```bash
npm i pfn
```

## API

The module exports a single function.

### Parameters

1. `fn` (any): The value that may or may not be a function.
2. Optional: `or` (any): The function that will be called, or the value that will be returned, if `fn` is not a function. Defaults to a passthrough function (`a => a`).

### Return Value

Always returns a Function.

* `fn`, if `fn` is a Function
* `or`, if `or` is a Function
* A Function that returns `or`, if neither `fn` nor `or` is a function

## Examples

`pfn` wraps a value that may or may be a function. If the underlying value is not a function, then `pfn` will execute one of the following fallback behaviors.

### Passthrough Fallback

If the value turns out to not be a function, `pfn` will, by default, pass through whatever is given as the first argument. This is useful for optional filters.

```javascript
const pfn = require('pfn')

function sayHello (name, filter) {
  filter = pfn(filter)
  return filter('Hello, ' + name)
}

// No filter is provided, so the hello message is returned without change:
sayHello('world') // 'Hello, world'

// A filter is provided which changes the hello message:
sayHello('world', m => m + '!!') // 'Hello, world!!'
```

### Return-Value Fallback

If the value turns out to not be a function, `pfn` can be configured to return a value of your choosing.

```javascript
const pfn = require('pfn')

function sayHello (nameCallback) {
  nameCallback = pfn(nameCallback, 'world')
  return 'Hello, ' + nameCallback()
}

sayHello() // 'Hello, world'
sayHello(() => 'Dolly') // 'Hello, Dolly'
```

### Self Fallback

If you provide the possible function as its own fallback, then you can accept either a value or a function as an argument for your code. For example, the `sayHello` function in the following example can accept either a string or a function.

```javascript
const pfn = require('pfn')

function sayHello (name) {
  name = pfn(name, name)
  return 'Hello, ' + name()
}

sayHello('world') // 'Hello, world'
sayHello(() => 'world') // 'Hello, world'
```

### Custom Fallback

If the wrapped value turns out to not be a function, the wrapping function can execute a custom fallback function instead:

```javascript
const pfn = require('pfn')
const mightBeAFunction = null
const callback = pfn(mightBeAFunction, (...args) => args.length)
callback('arg 1', 'arg 2') // 2
```

## Related

For more projects like this, check out the [xfn](https://github.com/lamansky/xfn) family of modules.
