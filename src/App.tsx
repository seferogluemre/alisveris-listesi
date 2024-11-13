import { useState } from "react";
import "./App.scss";
import {
  Container,
  Row,
  Form,
  Alert,
  Button,
  FormControl,
  FormSelect,
} from "react-bootstrap";
import { nanoid } from "nanoid/non-secure";
import { SiTicktick } from "react-icons/si";
import { MdDelete } from "react-icons/md";

interface Product {
  id: string;
  name: string;
  shop: (typeof shops)[number];
  category: (typeof categories)[number];
  isBought?: boolean;
}

interface ShopAndCategoriesType {
  id: number;
  name: string;
}

const shops = ["Migros", "Teknosa", "Bim", "Şok", "CarrefourSa"] as const;
const categories = [
  "Elektronik",
  "Giyim",
  "Bakliyat",
  "Şarküteri",
  "Oyuncak",
  "Unlu Mamüller",
  "Tatlı",
] as const;

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
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [shopName, setShopName] = useState<string>();
  const [categoriesName, setCategoriesName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAddToShop = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (productName.trim() == "") {
      setError("Ürün Adı Boş Geçilemez");
      return;
    }
    if (shopName == "") {
      setError("Ürünü Almak istediginiz marketi seçin");
      return;
    }
    if (categoriesName == "") {
      setError("Ürünün Kategorisini Seçin");
      return;
    }
    const formatedProductName = productName.toUpperCase();
    const selectedShop = shopsObj.find(
      (shop) => shop.id == Number(shopName)
    )?.name;
    const selectedCategory = categoriesObj.find(
      (category) => category.id == Number(categoriesName)
    )?.name;

    if (!selectedCategory || !selectedShop) {
      setError("Geçersiz market veya kategori seçimi");
      return;
    }

    const shopData: Product = {
      id: nanoid(7),
      name: formatedProductName,
      shop: selectedShop,
      category: selectedCategory,
      isBought: false,
    };

    setProducts([...products, shopData]);
    confetti();

    setProductName("");
    setCategoriesName("");
    setShopName("");
    setError("");
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Dışarıdan string türünde bir ürün idsi alır ve bütün ürünlerin id si ile kontrol ederek eşleşen ürünün isBought degerini tam tersine çevirir
  const handleIsBought = (id: string) => {
    const prevProducts = products.map((product) => {
      if (product.id == id) {
        return { ...product, isBought: !product.isBought };
      }
      return product;
    });
    // State'i  güncelledik
    setProducts(prevProducts);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="text-center">
          <h1>Alışveriş Listesi</h1>
        </div>
      </div>
      <Container className="shop-container mt-4">
        <Row className="px-5">
          <Form className="d-flex column-gap-3" onSubmit={handleAddToShop}>
            <FormControl
              type="text"
              className="fs-5"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Ürün Adını Giriniz..."
            />

            <FormSelect
              value={shopName}
              className="fs-5"
              onChange={(e) => setShopName(e.target.value)}
            >
              <option>Marketler</option>
              {shopsObj.map((shop) => (
                <option key={shop.id} value={shop.id}>
                  {shop.name}
                </option>
              ))}
            </FormSelect>

            <FormSelect
              value={categoriesName}
              className="fs-5"
              onChange={(e) => setCategoriesName(e.target.value)}
            >
              <option>Kategoriler</option>
              {categoriesObj.map((shop) => (
                <option key={shop.id} value={shop.id}>
                  {shop.name}
                </option>
              ))}
            </FormSelect>

            <Button type="submit" className="addBtn">
              Ekle
            </Button>
          </Form>
        </Row>
      </Container>
      {error && (
        <Container className="alert-container">
          <Alert className="alert">{error}</Alert>
        </Container>
      )}

      <Container className="my-5">
        <Row>
          <table>
            <thead>
              <tr>
                <td>İsim</td>
                <td>Market</td>
                <td>Kategori</td>
                <td>İd</td>
                <td>Aksiyon</td>
                <td>Silme</td>
              </tr>
            </thead>
          </table>
          <tbody id="table-body">
            {products.map((item) => (
              <tr
                key={item.id}
                style={{
                  textDecoration: item.isBought ? "line-through" : "none",
                  animation: item.isBought
                    ? "bgAnimation 2s infinite alternate"
                    : "none",
                }}
              >
                <td className="card-title">
                  <span className="card-span">{item.name}</span>
                </td>
                <td className="card-title">
                  <span className="card-span">{item.shop}</span>
                </td>
                <td className="card-title">
                  <span className="card-span">{item.category}</span>
                </td>
                <td className="card-title">
                  <span className="card-span">{item.id}</span>
                </td>
                <td className="card-title">
                  <span className="card-span">
                    <SiTicktick
                      className="fs-4"
                      onClick={() => handleIsBought(item.id)}
                    />
                  </span>
                </td>
                <td className="card-title">
                  <span className="card-span">
                    <MdDelete
                      onClick={() => handleRemoveProduct(item.id)}
                      className="fs-4"
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Row>
      </Container>
    </>
  );
}

export default App;
