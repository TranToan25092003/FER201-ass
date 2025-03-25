import axios from "axios";

// Các hàm hiện tại giữ nguyên
async function GetProduct() {
  try {
    const response = await axios.get("http://localhost:9999/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}

async function GetCategory() {
  try {
    const response = await axios.get("http://localhost:9999/category");
    return response.data;
  } catch (error) {
    console.error("Error fetching category data:", error);
  }
}

async function GetUser() {
  try {
    const response = await axios.get("http://localhost:9999/user");
    return response.data.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
    }));
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

async function GetProductdt(id) {
  try {
    const response = await axios.get(`http://localhost:9999/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category data:", error);
  }
}

async function login(email, password) {
  try {
    const response = await axios.get(
      `http://localhost:9999/user?email=${email}&password=${password}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch user data");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

async function PostProduct(newProduct) {
  try {
    const respone = await axios.post(
      `http://localhost:9999/products`,
      newProduct
    );
    return respone.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

async function DeletePost(id) {
  try {
    const response = await axios.delete(`http://localhost:9999/products/${id}`);
    return response.data;
  } catch (error) {}
}

async function GetUserdt(id) {
  try {
    const response = await axios.get(`http://localhost:9999/user/${id}`);
    return {
      id: response.data.id,
      username: response.data.username,
      email: response.data.email,
    };
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
}

const UpdateUserdt = async (id, userData) => {
  try {
    const response = await axios.put(
      `http://localhost:9999/user/${id}`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

async function updateProduct(updatedProducts) {
  try {
    const response = await axios.put(
      `http://localhost:9999/products/${updatedProducts.id}`,
      updatedProducts
    );
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating products:", error);
    throw error;
  }
}

async function submitOrder(order) {
  try {
    const response = await axios.post(`http://localhost:9999/order`, order, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error submitting order:", error);
    throw error;
  }
}

async function UpdateAdminProduct(id, updatedProduct) {
  try {
    const response = await axios.put(
      `http://localhost:9999/products/${id}`,
      updatedProduct
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
}

async function GetAllOrders() {
  try {
    const response = await axios.get("http://localhost:9999/order");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

async function GetHighlightedProducts() {
  try {
    const response = await axios.get("http://localhost:9999/products");
    return response.data.filter((product) => product.highlight === true);
  } catch (error) {
    console.error("Error fetching highlighted products:", error);
    return [];
  }
}

async function GetRegularProducts() {
  try {
    const response = await axios.get("http://localhost:9999/products");
    return response.data.filter((product) => !product.highlight);
  } catch (error) {
    console.error("Error fetching regular products:", error);
    return [];
  }
}

async function GetProductsByCategory(categoryId) {
  try {
    const response = await axios.get("http://localhost:9999/products");
    return response.data.filter((product) => product.catId == categoryId);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

export {
  GetProduct,
  GetCategory,
  GetProductdt,
  login,
  GetUser,
  GetUserdt,
  UpdateUserdt,
  PostProduct,
  DeletePost,
  updateProduct,
  submitOrder,
  UpdateAdminProduct,
  GetAllOrders,
  GetHighlightedProducts,
  GetRegularProducts,
  GetProductsByCategory,
};
