# Probe

A simple ExtendScript testing framework for Adobe After Effects.

```javascript
// @include "./Probe.js"

Probe.test('Should return an application name', function () {
  app.isBeta
    ? Probe.expect(app.appName).toBe('After Effects Beta')
    : Probe.expect(app.appName).toBe('After Effects')
});

Probe.test('Should return existing path to a desktop folder', function () {
  var desktop = Folder.desktop;

  Probe.expect(desktop.absoluteURI).toBe('~/Desktop')
  Probe.expect(desktop.exists).toBe(true)
  Probe.expect(desktop.fsName).toBe('/Users/tomas/Desktop')
});

alert(Probe.getLog())

/*
  Pass: true,
  2 tests (2 passed, 0 failed),
  4 cases (4 passed, 0 failed)

  ✅ Should return an application name
  ✅ Should return existing path to a desktop folder
*/
```

## Matchers API

### `toBe(expected)`

expect the actual value to be `===` to the expected value.

#### parameters

| Name       | Type           | Description                            |
| ---------- | -------------- | -------------------------------------- |
| `expected` | string, number | The expected value to compare against. |

#### example

```javascript
Probe.expect('ABC').toBe('ABC');
Probe.expect(100 + 23).toBe(123);
```

---

### `notToBe(expected)`

expect the actual value to be `!==` to the expected value.

#### parameters

| Name       | Type           | Description                            |
| ---------- | -------------- | -------------------------------------- |
| `expected` | string, number | The expected value to compare against. |

#### example

```javascript
Probe.expect(123).notToBe('123');
```

---

### `toBeGreaterThan(expected)`

expect the actual value to be greater `>` than the expected value.

#### parameters

| Name       | Type   | Description                   |
| ---------- | ------ | ----------------------------- |
| `expected` | number | The value to compare against. |

#### example

```javascript
Probe.expect(123).toBeGreaterThan(100);
```

---

### `toBeGreaterThanOrEqual(expected)`

expect the actual value to be greater than or equal `>=` to the expected value.

#### parameters

| Name       | Type   | Description                   |
| ---------- | ------ | ----------------------------- |
| `expected` | number | The value to compare against. |

#### example

```javascript
Probe.expect(123).toBeGreaterThanOrEqual(100);
Probe.expect(123).toBeGreaterThanOrEqual(123);
```

---

### `toBeLessThan(expected)`

expect the actual value to be less `<` than the expected value.

#### parameters

| Name       | Type   | Description                   |
| ---------- | ------ | ----------------------------- |
| `expected` | number | The value to compare against. |

#### example

```javascript
Probe.expect(100).toBeLessThan(123);
```

---

### `toBeLessThanOrEqual(expected)`

expect the actual value to be less than or equal `<=` to the expected value.

#### parameters

| Name       | Type   | Description                   |
| ---------- | ------ | ----------------------------- |
| `expected` | number | The value to compare against. |

#### example

```javascript
Probe.expect(100).toBeLessThanOrEqual(123);
Probe.expect(123).toBeLessThanOrEqual(123);
```

---

### `toEndWith(expected)`

expect the actual value to end with the expected value.

#### parameters

| Name       | Type   | Description                   |
| ---------- | ------ | ----------------------------- |
| `expected` | string | The value to compare against. |

#### example

```javascript
Probe.expect('boo').toEndWith('oo');
Probe.expect('bar').toEndWith('r');
```

---

### `toEqual(expected)`

expect the actual value to be `==` to the expected value.

#### parameters

| Name       | Type           | Description                   |
| ---------- | -------------- | ----------------------------- |
| `expected` | string, number | The value to compare against. |

#### example

```javascript
Probe.expect(123).toEqual('123');
```

---

### `notToEqual(expected)`

expect the actual value to be `!=` to the expected value.

#### parameters

| Name       | Type           | Description                   |
| ---------- | -------------- | ----------------------------- |
| `expected` | string, number | The value to compare against. |

#### example

```javascript
Probe.expect('ABC').notToEqual('abc');
```

---

### `toMatch(expected)`

expect the actual value to match a regular expression.

#### parameters

| Name       | Type           | Description                   |
| ---------- | -------------- | ----------------------------- |
| `expected` | string, RegExp | The value to compare against. |

#### example

```javascript
Probe.expect('foo').toMatch(/O$/i);
Probe.expect('bar').toMatch(/^B/i);
```

---

### `toStartWith(expected)`

expect the actual value to start with the expected value.

#### parameters

| Name       | Type   | Description                   |
| ---------- | ------ | ----------------------------- |
| `expected` | string | The value to compare against. |

#### example

```javascript
Probe.expect('foo').toStartWith('f');
Probe.expect('bar').toStartWith('ba');
```
