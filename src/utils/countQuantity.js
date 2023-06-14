export const countQuantity = (forms, id, month, year) => {
  if (forms === 'No buyform found' || forms === 'No sales found') return 'Empty';

  let totalQuantity = 0;
  // Filter form by month, year
  const filteredForms = forms.filter((form) => {
    return form.createdAt.substring(0, 4) === year && form.createdAt.substring(5, 7) === month;
  });

  // FilteredForm is empty
  if (filteredForms.length !== 0)
    if (filteredForms[0].SellFormDetails !== undefined)
      // Check if it's sell form
      for (const form of filteredForms) {
        for (const product of form.SellFormDetails) {
          if (product.ProductId === id) {
            totalQuantity += product.quantity;
          }
        }
      }
    else
      for (const form of filteredForms) {
        for (const product of form.BuyFormDetails) {
          if (product.ProductId === id) {
            totalQuantity += product.quantity;
          }
        }
      }
  return totalQuantity;
};
