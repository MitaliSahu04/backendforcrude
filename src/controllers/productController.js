const Product = require("../models/Product");

exports.createProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.create({
        name: req.body.name,

        price: req.body.price,

        description:
          req.body.description,

        image: req.file
          ? req.file.filename
          : "",
      });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getProducts = async (
  req,
  res
) => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit = 6;

    const search =
      req.query.search || "";

    const query = {
      name: {
        $regex: search,
        $options: "i",
      },
    };

    const total =
      await Product.countDocuments(
        query
      );

    const products =
      await Product.find(query)
        .populate(
          "createdBy",
          "name email role"
        )
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    res.json({
      products,

      totalPages: Math.ceil(
        total / limit
      ),

      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,

          price: req.body.price,

          description:
            req.body.description,

          image: req.file
            ? req.file.filename
            : product.image,
        },
        {
          returnDocument: "after",
        }
      );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteProduct = async (
  req,
  res
) => {
  try {
    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};