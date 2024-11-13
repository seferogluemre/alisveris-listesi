import { useState } from "react";
import "./App.css";
import { Container, Row, Form } from "react-bootstrap";
import Button from "./components/styled/FormInput.js";

interface ShopAndCategoriesType {
  id: number;
  name: string;
}

const shops: string[] = ["Migros", "Teknosa", "Bim", "Şok", "CarrefourSa"];
const categories: string[] = [
  "Elektronik",
  "Bakliyat",
  "Şarküteri",
  "Oyuncak",
  "Unlu Mamüller",
  "Tatlı",
];
const shopsObj: ShopAndCategoriesType[] = shops.map((shop, index) => ({
  id: index,
  name: shop,
}));

const categoriesObj: ShopAndCategoriesType[] = categories.map(
  (categories, index) => ({
    id: index,
    name: categories,
  })
);

function App() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState<string>("");
  const [shopName, setShopName] = useState<string>("Marketler");
  const [categoriesName, setCategoriesName] = useState<string>("Kategoriler0");

  return (
    <>
      <Container>
        <Row>
          <div>
            <Form>
              <div>
                <label htmlFor=""></label>
              </div>
            </Form>
            <Button />
          </div>
        </Row>
      </Container>
    </>
  );
}

export default App;
