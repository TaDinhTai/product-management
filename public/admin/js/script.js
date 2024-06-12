//Button Status

const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length > 0) {

  let url = new URL(window.location.href);

  buttonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
        if(status) {
          url.searchParams.set("status", status);
        } else {
          url.searchParams.delete("status");
        }
        window.location.href = url.href;
    });
  });
}

//End Button Status

// Form Search
const formSearch = document.querySelector("#form-search");
if(formSearch) {

  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if(keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  })
}

// End Form Search

//Pagination

const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination) {
  let url = new URL(window.location.href);

  buttonsPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      console.log(page);

      url.searchParams.set("page", page);

      window.location.href = url.href;
    });
  })
}

//End Pagination

// Show Alert

const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  })
}

// End Show Alert

// Upload Image

const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if(file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}


// End Upload Image

//Sort
const sort = document.querySelector("[sort]");
if(sort) {
  let url = new URL(window.location.href);

  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");

  //Sort
  sortSelect.addEventListener("change", (e) => {
    const value = e.target.value;
    const [sortKey, sortValue] = value.split("-");


    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);

    window.location.href = url.href;
  });

  //Clear Sort
  sortClear.addEventListener("click", () => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");

    window.location.href = url.href;
  });

  //Thêm selected cho option
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");

  if(sortKey && sortValue) {
    const stringSort = `${sortKey}-${sortValue}`;
    const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`);
    optionSelected.selected = true;
  }
}

//End Sort
