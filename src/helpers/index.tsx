export const flattenForm = (form) => {
  const flattened = form.inputGroups.reduce(
    (a, b) =>
      Object.assign(
        Object.assign(
          a,
          {},
          b.inputs.reduce((c, d) => Object.assign(c, {}, { [d.name]: d.initialValue }), {})
        ),
        {},
        b.switchable && b.name ? { [b.name.toString()]: b.enabled } : {}
      ),
    {}
  );
  return flattened;
};

export const flattenFormWithPropAsValue = (form, prop) => {
  const flattened = form.inputGroups.reduce(
    (a, b) =>
      Object.assign(
        Object.assign(
          a,
          {},
          b.inputs.reduce((c, d) => Object.assign(c, {}, { [d.name]: d[prop] }), {})
        ),
        {},
        b.switchable && b.name ? { [b.name.toString()]: b[prop] } : {}
      ),
    {}
  );
  return flattened;
};
