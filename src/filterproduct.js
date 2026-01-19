export function filterproduct(products, activeFilters = {}) {
  const {
    selectedColor = "",
    selectedType = "",
    selectedGender = "",
    selectedSeries = "",
    selectedFabTech = "",
    selectedDesignFor = "",
    selectedFitment = ""
  } = activeFilters;

  return products.filter((product) => {
    const matchesColor = selectedColor ? Object.keys(product.Colors).includes(selectedColor) : true;
    const matchesType = selectedType ? product.Type === selectedType : true;
    const matchesGender = selectedGender ? product.Gender === selectedGender : true;
    const matchesSeries = selectedSeries ? product.Series === selectedSeries : true;
    const matchesFabTech = selectedFabTech ? product.FabTech === selectedFabTech : true;
    const matchesDesignFor = selectedDesignFor ? product.DesignFor === selectedDesignFor : true;
    const matchesFitment = selectedFitment ? product.Fitment === selectedFitment : true;

    return (
      matchesColor &&
      matchesType &&
      matchesGender &&
      matchesSeries &&
      matchesFabTech &&
      matchesDesignFor &&
      matchesFitment
    );
  });
}