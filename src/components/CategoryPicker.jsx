import CategoryComponent from "./CategoryComponent/CategoryComponent";
import categories from "./CategoryComponent/categories";
const CategoryPicker = () => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {categories.map((category) => (
        <CategoryComponent
          key={category.id}
          imageSrc={category.imagePath}
          buttons={category.buttons}
        />
      ))}
    </div>
  );
};

export default CategoryPicker;
