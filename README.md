NUCLEUS.JS binds your JS logic to the DOM
-----------------------------------------

It will connect this:

```html
	<p data-myclass="method: param1, param2"></p>
```

With this:

```js
	{
		/**
		 * This method will be called by Nucleus.js
		 * @param {HTMLElement} node the node is the <p>
		 * @param {String} param1 is the param that is in the data- attribute
		 * @param {String} param2 is the param that is in the data- attribute
		 */
		method: function method(node, param1, param2) {

		}
	}
```

