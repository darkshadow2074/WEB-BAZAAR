import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { dataReducer } from "../reducer/DataReducer";
import { initialState } from "../reducer/initialState";
import { ACTION_TYPE } from "../Utils/reducerActions/action";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const getMeData = async () => {
    try {
      setIsLoading(true);
      const { status: categoryStatus, data: category } = await axios.get(
        "/api/categories"
      );
      if (categoryStatus === 200) {
        dispatch({
          type: ACTION_TYPE.INITIALIZE_CATEGORIES,
          payload: category.categories,
        });
      }
      const {
        status: productStatus,
        data: { products },
      } = await axios.get("/api/products");
      if (productStatus === 200) {
        dispatch({
          type: ACTION_TYPE.INITIALIZE_PRODUCTS,
          payload: products,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      return setInterval(() => setIsLoading(false), 2000);
    }
  };
  useEffect(() => {
    let id = getMeData();
    return clearInterval(id);
  }, []);
  const [data, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ data, dispatch, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
export const useData = () => useContext(DataContext);
