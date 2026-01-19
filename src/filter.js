export function filterProducts(products, filters, selectedColor, selectedSize, colorMapping) {
  return products
    .filter((product) => {
      // Filter by color
      // Filter by other attributes
      return (
        (!filters.type || product.Type === filters.type) &&
        (!filters.gender || product.Gender === filters.gender) &&
        (!filters.series || product.Series === filters.series) &&
        (!filters.fitment || product.Fitment === filters.fitment) &&
        (!filters.fabtech || (
          Array.isArray(product.FabTech) 
            ? product.FabTech.includes(filters.fabtech) 
            : product.FabTech === filters.fabtech
        )) &&
        (!filters.designfor || (
          Array.isArray(product.DesignFor) 
            ? product.DesignFor.includes(filters.designfor) 
            : product.DesignFor === filters.designfor
        ))
      );
    })
    .map((product) => {
      if (selectedColor) {
        const selectedKeys = Array.isArray(selectedColor) ? selectedColor : [selectedColor];
        const filteredColors = Object.fromEntries(
          Object.entries(product.Colors).filter(([key]) =>
            selectedKeys.includes(key)
          )
        );
        return {
          ...product,
          Colors: filteredColors,
        };
      }
      return product;
    })
    .map((product) => {
      if (selectedSize) {
        const validColors = Object.entries(product.Colors).filter(([color, sizes]) => sizes[selectedSize] > 0);
        if (validColors.length === 0) {
          return null;
        }
        return {
          ...product,
          Colors: Object.fromEntries(validColors),
        };
      }
      return product;
    })
    .filter(Boolean);
}