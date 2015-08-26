dalgard:viewmodel 0.1.1
=======================

Minimalist VM for Meteor – inspired by `manuel:viewmodel` and `nikhizzle:session-bind`.

- Highly declarative
- Absolutely no redundant syntax
- Reactive and terse API
- Easily extensible


#### Install

*(Atmosphere coming soon)*

Copy the `package` folder (can be renamed) from this repo into your project's `/packages` and add it with `meteor install dalgard:viewmodel`.


## Usage

The example below is a bit verbose; viewmodels do not always have to be declared, but may be created automatically by the `{{bind}}` helper if registered globally.

Check out the other `/examples` in the repo.

```html
<template name="page">
  {{> field}} {{fieldProp}}
</template>

<template name="field">
  <input type="text" {{bind 'value: prop'}}>
</template>
```

```javascript
Template.page.viewmodel({
  // All properties are registered as Blaze helpers
  fieldProp: function () {
    // Get child viewmodel reactively by name
    var field = this.child("field");

    // Child may not be rendered the first time this value is used
    return field && field.prop();
  },

  // Blaze onCreated hook (similar for rendered and destroyed)
  // – can be an array of functions
  created: function () {
    this instanceof ViewModel;  // true
  }
});

Template.field.viewmodel("field", {
  // Primitive property
  prop: "",

  // Computed property
  regex: function () {
    // Get value of prop reactively
    var value = this.prop();

    return new RexExp(value);
  },

  // React to changes in dependencies such as viewmodel properties
  // – can be an array of functions
  autorun: function () {
    // Log every time the computed regex property changes
    console.log("new value of regex", this.regex());
  },

  // Blaze events
  events: {
    "click input": function (event, template_instance) {
      this instanceof ViewModel;  // true
    }
  }
});
```


## API

*(Work in progress)*

#### {{bind}}

This Blaze helper is only registered on templates with a declared viewmodel. The name of the helper may be changed like this:

`ViewModel.helperName = "myBind"`.

You may choose to register the helper globally – like this:

`ViewModel.registerHelper(name)` (`name` is optional).

The advantage of having a global `{{bind}}` is that you may use it inside any template without first declaring a viewmodel.

Using the helper then automatically creates a new viewmodel instance (if nothing exists) and immediately registers the bound key as a Blaze helper – this helper can then be used anywhere *after* the call to `{{bind}}`, but not before. If you want to be able to place a property helper anywhere in the template, declare the viewmodel explicitly.

The syntax of the bind helper looks like this:

`{{bind expression ...}}`

where `expression` is a string formatted like a key/value pair:

`'binding: key'`.

You may pass multiple bind expressions to the helper.

Any space separated values placed after the viewmodel key (i.e. the name of a property) in the bind expression are passed as arguments to the binding – such as delay:

`<input type="text" {{bind 'value: filter 1500'}}>`.

#### ViewModel.prototype

-


#### Static methods

-


### Todo

- Persist viewmodels on hot code pushes.
- Optionally persist viewmodel across routes.
- Optionally register bindings as individual helpers.
