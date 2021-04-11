const flattenInputs = (inputs) => {
  return inputs.reduce((a, b) => Object.assign(a, {}, { [b.name]: b.initialValue }), {});
};

const joinSelectively = (items, type) => {
  return type === "object"
    ? { ...items.reduce((a, b) => ({ ...a, ...b }), {}) }
    : type === "array"
    ? [...items]
    : items;
};

export const flattenInputGroup = (inpGroup) => {
  return joinSelectively(
    [
      inpGroup.inputs
        ? flattenInputs(inpGroup.inputs)
        : inpGroup.inputGroups
        ? flattenInputGroups(inpGroup.inputGroups)
        : {},
    ],
    inpGroup.multipliable ? "array" : "object"
  );
};

const flattenInputGroups = (inpGroups) => {
  return inpGroups.reduce(
    (a, b) => ({
      ...a,
      ...(b.multipliable ? { [b.name]: [...flattenInputGroup(b)] } : flattenInputGroup(b)),
    }),
    {}
  );
};

export const flattenForm = (form) => {
  const flattened = flattenInputGroups(form.inputGroups);
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

export const flattenFormRequiredValues = (form, globalValues, user) => {
  const flattened = form.inputGroups.reduce(
    (a, b) =>
      !b.visible || (b.visible && b.visible({ values: globalValues, user }))
        ? Object.assign(
            Object.assign(
              a,
              {},
              b.inputs
                ? b.inputs.reduce(
                    (c, d) =>
                      !d.visible || (d.visible && d.visible({ values: globalValues, user }))
                        ? Object.assign(c, {}, { [d.name]: d["required"] })
                        : c,
                    {}
                  )
                : {}
            ),
            {},
            b.switchable && b.name ? { [b.name.toString()]: b["required"] } : {}
          )
        : a,
    {}
  );
  return flattened;
};

export const flattenFormWithLabelAsKey = (form, values) => {
  const falttened = form.inputGroups.reduce(
    (c, d) =>
      Object.assign(
        {},
        Object.assign(
          {},
          c,
          values[form.name]
            ? d.inputs
              ? d.inputs.reduce(
                  (e, f) =>
                    Object.assign({}, e, {
                      [f.label]: values[form.name][f.name],
                    }),
                  {}
                )
              : {}
            : {}
        ),
        d.switchable ? { [d.title]: d.enabled ? "Yes" : "No" } : {}
      ),
    {}
  );

  return falttened;
};

export const parseValueForSummary = (key, value) => {
  if (key === "Files") {
    if (value) {
      return value.length;
    }
    return 0;
  } else if (key === "Tags" && value) {
    return value.join(", ");
  }

  return value;
};
