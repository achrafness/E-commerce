const createProduct = (req, res) => {
  res.send("Product created successfully");
};

const getAllProducts = (req, res) => {
  res.send("List of all products");
};

const getSingleProduct = (req, res) => {
  res.send("Details of a single product");
};

const updateProduct = (req, res) => {
  res.send("Product updated successfully");
};

const deleteProduct = (req, res) => {
  res.send("Product deleted successfully");
};

const uploadImage = (req, res) => {
  res.send("Image uploaded successfully");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
