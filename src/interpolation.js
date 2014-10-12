// IMPORTANT: This must stay in sync with anyChanged
function interpolate(fn, spec, prev, current, fraction) {
    if (spec === null) {
      console.warn("Null spec is invalid");
    } else if (spec === 'number') {
        return fn(prev, current, fraction);
    } else if (typeof spec == "object" && Array.isArray(spec)) {
        var startArray = prev;
        var interpolated = current.slice();
        for (var i = 0; i < Math.min(startArray.length, interpolated.length); i++) {
            interpolated[i] = interpolate(fn, spec[0], startArray[i], interpolated[i], fraction);
        }
        return interpolated;
    } else if (typeof spec == "object") {
        var result = Object.create(current);
        for (var k in spec) {
            if (!spec.hasOwnProperty(k)) {
                continue;
            }
            var specElem = spec[k];
            result[k] = interpolate(fn, spec[k], prev[k], current[k], fraction);
        }
        return result;
    } else {
      console.warn('Unknown spec: ' + spec);
    }
}


// IMPORTANT: This must stay in sync with interpolate
function anyChanged(spec, prev, current) {
  if (spec == null) {
    console.warn('Null spec is invalid');
  } else if (spec === 'number') {
    return prev !== current;
  } else if (typeof spec == "object" && Array.isArray(spec)) {
    if (prev.length !== current.length) {
      return true;
    }
    for (var i = 0; i < prev.length; i++) {
      if (anyChanged(spec[0], prev[i], current[i])) {
        return true;
      }
    }
    return false;
  } else if (typeof spec == "object") {
    var result = Object.create(current);
    for (var k in spec) {
      if (!spec.hasOwnProperty(k)) {
        continue;
      }
      var specElem = spec[k];
      if (anyChanged(specElem, prev[k], current[k])) {
        return true;
      }
    }
    return false;
  } else {
    console.warn('Unknown spec: ' + spec);
  }
}

module.exports = {
  interpolate: interpolate,
  anyChanged: anyChanged
}
