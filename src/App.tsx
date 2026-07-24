import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Root from './Components/Root/root';
import Browse from './Components/Pages/Browse/browse';
import Favorites from './Components/Pages/Favorites/favorites';
import MealPlan from './Components/Pages/MealPlan/mealPlan';
import Recipes from './Components/Pages/Recipes/recipe';

const AppRouter = createBrowserRouter(createRoutesFromElements(

  <Route path="/" element={<Root/>}>
    <Route index element={<Browse/>}/>
    <Route path="/favorites" element={<Favorites/>}/>
    <Route path="/mealplan" element={<MealPlan/>}/>
    <Route path=":id" element={<Recipes/>}/>
  </Route>
))
function App() {

  return (
    <>
    <RouterProvider router={AppRouter}/>
    </>
  )
}

export default App
