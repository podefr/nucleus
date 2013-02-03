NUCLEUS.JS binds your JS logic to the DOM
-----------------------------------------

It will connect this:

```html
	<section>
		<p data-myobject="method: param1, param2"></p>
	</section>
```

With this:

```js
	var myobject = {
		/**
		 * This method will be called by Nucleus.js
		 * @param {HTMLElement} node the node is the <p>
		 * @param {String} param1 is the param that is in the data- attribute
		 * @param {String} param2 is the param that is in the data- attribute
		 */
		method: function method(node, param1, param2) {
			// the this object is bound to myobject
			this.otherMethod();
		},

		otherMethod: function otherMethod() {

		}
	}
```

By doing this:

```js
	// We need to new up a nucleus
	var nucleus = new Nucleus();

	// Then, we add a 'nucleus plugin'
	Nucleus.add('myobject', myobject);

	// And finally, we apply it to the dom
	Nucleus.apply(document.querySelector("section"));
```

We can have multiple plugins applied to more dom elements. In this example, stats and model are a data-binding tool, and event adds DOM event listeners.

```html
	<section id="main" data-stats="bind:toggleClass,nbItems,show">
		<input id="toggle-all" type="checkbox" data-event="listen:click,toggleAll" data-stats="bind:toggleCheck,nbCompleted">
		<label for="toggle-all">Mark all as complete</label>
		<ul id="todo-list" data-model="foreach">
			<li data-model="bind:toggleClass,completed,completed;">
				<div class="view">
					<input class="toggle" type="checkbox" data-model="bind:checked,completed">
					<label data-model="bind:textContent,title" data-event="listen:dblclick,startEdit"></label>
					<button class="destroy" data-event="listen:click,remove"></button>
				</div>
				<input class="edit" data-model="bind:value,title" data-event="listen:keydown,stopEdit; listen:blur,stopEdit">
			</li>
		</ul>
	</section>
```

This example is coming from todoMVC: http://todomvc.com/labs/architecture-examples/olives/

To add several plugins at the same time, we can use the helper function 'addAll'

```js
	nucleus.addAll({
		event: new Event(),
		model: new Model()
	});

	// And apply them to the parent node
	nucleus.apply(document.querySelector("section"));
```

How to install it?
------------------

###You have require.js:

```html
	<script src="require.js"></script>
```

```js
	require(["path/to/Nucleus"], function (Nucleus) {
		var nucleus = new Nucleus();
	});
```

###You want to use it as a standalone:

```html
	<script src="Nucleus-standalone.js"></script>
```

```js
	// Nucleus is packed with AlmondJS, it still doesn't leak to the Global Object
	// but you have access to Almond's require/define, so you can do
	require(["Nucleus"], function (Nucleus) {
		var nucleus = new Nucleus();
	});
```

###You have jquery: (not released yet)

```html
	<script src="nucleus-jquery.js"></script>
```

```js
	$().Nucleus
```

Are there existing nucleus plugins?
-----------------------------------

Actually yes! Olives is a JS library that has cool nucleus plugins, such as double way binding and DOM event listener with delegation. https://github.com/flams/olives

