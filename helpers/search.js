module.exports = (query) => {
  // let keyword = "";
  let objectSearch = {
    keyword: "",
  }

  if(query.keyword) {
    objectSearch.keyword = query.keyword;

    const regex = new RegExp(objectSearch.keyword, "i");
    objectSearch.regex = regex;
    // find.title = regex;
  }

  return objectSearch;
}