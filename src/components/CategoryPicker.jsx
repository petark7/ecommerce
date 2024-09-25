import CategoryComponent from "./CategoryComponent/CategoryComponent";
import categories from "./CategoryComponent/categories";
const CategoryPicker = () => {
  return (
    <div className="grid grid-cols-3 gap-5">
      <CategoryComponent
        imageSrc={categories[0].imagePath}
        buttons={categories[0].buttons}
      />
      <CategoryComponent
        imageSrc={categories[1].imagePath}
        buttons={categories[1].buttons}
      />

      <CategoryComponent
        imageSrc={categories[2].imagePath}
        buttons={categories[2].buttons}
      />
      {/* <CategoryComponent />
      <CategoryComponent /> */}
    </div>
  );
};

export default CategoryPicker;
