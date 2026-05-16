import { useNavigate } from "react-router-dom";
import styles from "./FoodPage.module.css";

const categories = [
  { name: "breakfast", image: "/Breakfast.png" },
  { name: "pizza", image: "/Pizza.png" },
  { name: "lunch", image: "/Lunch.png" },
  { name: "salads", image: "/Salads.png" },
];

export default function FoodPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.categories}>
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={styles.categoryBtn}
            onClick={() => navigate(`/category/${cat.name}`)}
          >
            {cat.image ? (
              <img src={cat.image} alt={cat.name} />
            ) : (
              <span className={styles.fallbackLabel}>{cat.name}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
