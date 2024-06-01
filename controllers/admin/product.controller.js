const Product = require("../../models/product.model");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");


// [GET] /admin/products
module.exports.index = async (req, res) => {

  //Filter
  const filterStatus = filterStatusHelper(req.query);
  // console.log(filterStatus);

  let find = {
    deleted: false, 
  };

  if(req.query.status) {
    find.status = req.query.status;
  }

  //Search
  const objectSearch = searchHelper(req.query);

  if(objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  //Pagination
  const countProducts = await Product.countDocuments(find);

  let objectPagination = paginationHelper(
    {
    currentPage: 1,
    limitItems: 4
    },
    req.query,
    countProducts
);

  // let objectPagination = {
  //   currentPage: 1,
  //   limitItems: 4
  // };

  // if(req.query.page) {
  //   objectPagination.currentPage = parseInt(req.query.page);
  // }

  // objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

  // const countProducts = await Product.countDocuments(find);
  // const totalPage = Math.ceil(countProducts/objectPagination.limitItems);
  // objectPagination.totalPage = totalPage;
  //End Pagination

  const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  });
};

// [PATCH] /admin/products/change-staus/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  // res.send(`${status} - ${id}`);
  // res.redirect("/admin/products");
  res.redirect('back');
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
      await Product.updateMany({_id: {$in : ids}}, {status: "active"})
      break;
    case "inactive":
      await Product.updateMany({_id: {$in : ids}}, {status: "inactive"})
      break;
  
    default:
      break;
  }

  res.redirect("back");
}
