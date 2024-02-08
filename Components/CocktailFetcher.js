
export const CocktailFetcher = async (URL) => {
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error('Failed to fetch cocktail data');
        }
        const json = await response.json();
        return json.drinks;
    } catch (error) {
        console.error('Error fetching cocktail data:', error.message);
        throw error;
    }
};
