import { useFavorites } from '../context/Favorites';
import { Ionicons } from "@expo/vector-icons";


type FavoriteButtonProps = {
  characterId: number;
};

export const FavoriteButton = ({ characterId }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <Ionicons
      name={isFavorite(characterId) ? 'heart' : 'heart-outline'}
      size={24}
      color={isFavorite(characterId) ? 'red' : 'gray'}
      onPress={() => toggleFavorite(characterId)}
    />
  );
};

export default FavoriteButton; 