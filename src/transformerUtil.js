function warnKey(props, key, context, childName) {
  if (props && key in props) {
    console.warn('key "' + key + '" (=' + props[key] + ') present in ' + context + ' will be ignored and not passed to ' + childName);
  }
}

function addKeyIfPresent(newProps, props) {
  if (props && props.key) {
    newProps.key = props.key;
  }
}

module.exports = {
  warnKey: warnKey,
  addKeyIfPresent: addKeyIfPresent
}
