import {useState, useEffect, createContext, useContext} from 'react';

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

type Meal = {
    idMeal: string;
    strArea: string;
    strCountry: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    strYoutube: string;
    [key: string]: string | null;
};


type ApiContextType = {
    recipe: Meal | null;
    setRecipe: React.Dispatch<React.SetStateAction<Meal | null>>;
    favorites: Meal[];
    setFavorites: React.Dispatch<React.SetStateAction<Meal[]>>;
    userList: Meal[];
    setUserList: React.Dispatch<React.SetStateAction<Meal[]>>;
    filterDisplay: string;
    setFilterDisplay: React.Dispatch<React.SetStateAction<string>>;
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    displayCategory: Meal[];
    setDisplayCategory: React.Dispatch<React.SetStateAction<Meal[]>>;
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};
const ApiContext = createContext<ApiContextType | null>(null);

export function ApiProvider({ children }: { children: React.ReactNode }){
    
    //create all useState and functions here to be exported via API Provider 
    //DARKMODE
    const [darkMode, setDarkMode] = useState<boolean>(true);
    
    //GET CATEGORY GET CATEGORY GET CATEGORY GET CATEGORY GET CATEGORY GET CATEGORY GET CATEGORY GET CATEGORY
    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        async function getCategories(){
            try{
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
                if(!response.ok){
                    throw new Error('failed to fetch data');
                }
                const result = await response.json();
                //console.log(result);
                setCategories(result.categories)
            } catch(error){
                console.log(error)
            }
        }
        getCategories()
    }, []);

    //SELECTEDCATEGORY FOR RECIPES REVEAL
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    //GET MEALS
    const [displayCategory, setDisplayCategory] = useState<Meal[]>([]);
    useEffect(() => {
        async function display(){
            try{
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
                if(!response.ok){
                    throw new Error('failed to fetch data');
                }
                const result = await response.json();
                //console.log(result.meals)
                setDisplayCategory(result.meals)
            } catch(error){
                console.log(error);
            }
        }
        display()
    }, [selectedCategory]);

    //INPUT FILTER 
    const [filterDisplay, setFilterDisplay] = useState<string>('');

    //CALL WITH USER FILTER
    const [userList, setUserList] = useState<Meal[]>([]);
    useEffect(() => {
        async function userInput(){
            try{
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${filterDisplay}`);
            if(!response.ok){
                throw new Error('failed to fetch user input data');
            }
            const result = await response.json();
            //console.log(result.meals);
            setUserList(result.meals)
        } catch(error){
            console.log(error)
        }
        }
        userInput()
    }, [filterDisplay])
    
    //FAVORITES STATE FAVORITES STATE FAVORITES STATE FAVORITES STATE FAVORITES STATE
    const [favorites, setFavorites] = useState<Meal[]>([]);

    //RECIPE DETAILS DATA RECIPE DETAILS DATA RECIPE DETAILS DATA RECIPE DETAILS DATA 
    const [recipe, setRecipe] = useState<Meal | null>(null);
    return(
        <ApiContext.Provider
            value={{darkMode, setDarkMode, categories, setCategories, selectedCategory, setSelectedCategory, displayCategory, setDisplayCategory, filterDisplay, setFilterDisplay, userList, setUserList, favorites, setFavorites, recipe, setRecipe}}// pass all useState in here so outside components can use
        >
            {children}
        </ApiContext.Provider>
    )
}

export function useApi(){
    const context = useContext(ApiContext);

    if (!context) {
        throw new Error("useApi must be used within ApiProvider");
    }

    return context;
}