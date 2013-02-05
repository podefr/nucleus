NUCLEUS.JS binds your JS logic to the DOM by adding configuration to the markup
-------------------------------------------------------------------------------

Ever wanted to bind your JS logic to the DOM by doing something like this in your HTML?

```html
	<p data-bind="value: name"></p>
	<button data-listen="click: doSomething"></button>
```

Nucleus.js allows you to do just that. It will create the link between your HTML and your JavaScript logic.

Let's start with a simple example. We would like to set the value of "name" in the paragraph.

### HTML

```html
	<p data-bind="value: name"></p>
```

### JavaScript

```js
	// The object to display in the DOM
	var someone = {
		// This is the value that we want to display in the paragraph
		name: "John",
		type: "Doe"
	};

	// We start by initializing Nucleus
	var nucleus = new Nucleus();

	// Then we add a nucleus plugin called 'bind'
	nucleus.add("bind", {

		// Which has a method called value
		value: function (node, param) {
			// That will set the innerText of the dom to "John"
			node.innerText = someone[param];
		}
	});

	// Then we tell it where to find the DOM elements to bind
	nucleus.apply(document.querySelector("p"));
```

Nucleus.js will actually create this relationship:

![Schema](https://raw.github.com/podefr/nucleus/master/schema.png)

Where data-bind is configured while adding the plugin to nucleus. We could have used any other allowed name, such as 'listen', 'style', 'css', 'text' or even 'another-plugin_for-nucleus'.

Nucleus will then execute the method 'value' in the plugin 'bind', passing it two things:
 - {HTMLElement} the node to which the data-attribute is applied
 - {String} the parameters specified in the data-attribute, after the name of the method (name in our case)

We've just bound some JS logic to a dom element. This seems overkill for such simple task, but it'll make more sense when we'll add more plugins, and especially when they are plugins that we can just reuse.

 Let's add more plugins, on for setting data into the DOM, one for listening to DOM events.

### HTML

```html
	<section>
		<p data-bind="value: name"></p>
		<button data-listen="click: doSomething"></button>
	</section>
```

In this case, we have two plugins, one called 'bind', and the other one called 'listen'. We can configure Nucleus.js to accept more than one plugin by calling the 'addAll' method instead of just 'add':

```js
	// This is some UI with a doSomething method:
	var ui = {
		doSomething: function () {
			// do something
		}
	}

	nucleus.addAll({
		// This is the plugin that we have seen before
		bind: {
			value: function (node, param) {
				node.innerText = someone[param];
			}
		},

		// This is the new plugin called listen
		listen: {
			click: function (node, method) {
				node.addEventListener("click", function (event) {
					ui[method](event);
				}, true);
			}
		}
	});
```

Of course, this example is very limited, as we can't bind a value from an object to something else than innerText, and we can't listen to another event that 'click' as long as we don't create new functions for handling them. Moreover, we can't change the object from which we get the value, nor can we change the object on which to call the method when a click occurs.

Let's do something more reusable and configurable. We pretend that the object that contains the data is a backbone.Model, which triggers events whenever something changes. We could also call a method on a backbone.View when a click occurs.

### HTML

```html
	<section>
		<p data-bind="change: name, innerText"></p>
		<button data-event="listen: click, alert, name"></p>
	</section>
```

### JavaScript

```js
	// We have a backbone.Model
	model.set("name", "Nucleus");

	// We have a backbone.View with an alert method. It alerts the value of "name"
	view.alert = function (event, param) {
		alert(model.get(param);
	};

	// We create our Nucleus
	var nucleus = new Nucleus();

	// We create a constructor for a binding plugin
	// It takes a model as a parameter so it knows where to get the data
	function Binding(model) {

		// This is the change method of our plugin
		this.change = function (node, key, attribute) {

			// We need to set the innerText of the DOM to the current value
			node[attribute] = model.get(key);

			// Whenever the value changes, we update the dom
			model.on("change:" + key, function (newValue) {
				node[attribute] = newValue;
			});

		};
	}

	// Then we create a constructor for an event plugin
	// It takes a view as parameter, so it knows where to call the method
	function Event(view) {

		this.event = function (node, eventName, methodName, param) {
			node.addEventListener(eventName, function (event) {
				view[methodName](event, param);
			});
		};

	}

	// Then we add our plugins
	nucleus.add({

		// We initialize a new binding plugin with the model we want to listen to
		"bind": new Binding(model),

		// We initialize a new event plugin with the view we want to call the methods on
		"event": new Event(view)

	});

	// And finally, we apply it to the parent element of the DOM that we want to bind to this logic
	nucleus.apply( document.querySelector("section") );
```

We can also call multiple methods on the same DOM element:

```html
	<p data-plugin="method1: param1, param2, paramN; method2: param1, param2, paramN"></p>
```

Or we can call multiple plugins on the same DOM element

```html
	<p data-plugin1="method: param1, param2" data-plugin2="method1: param1, param2; method2, param1, param2"></p>
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

