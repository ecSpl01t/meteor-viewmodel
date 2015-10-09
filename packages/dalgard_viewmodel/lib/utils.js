/*
  Private package utility functions
*/

// Use ES5 property definitions when available
defineProperties = function (obj, props) {
  if (_.isFunction(Object.defineProperties))
    Object.defineProperties(obj, props);
  else
    _.each(props, (prop, key) => obj[key] = prop.value);
};

// Get closest template instance for view
templateInstance = function (view) {
  do if (view.template)
    return view.templateInstance();
  while (view = view.parentView);

  return null;
};
