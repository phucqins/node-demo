const search = document.querySelector(".index-searchbox");
const titleEl = document.querySelector(".display__title");
const locationEl = document.querySelector(".display__location");
const contentEl = document.querySelector(".display__content");

const submitHandler = async (e) => {
  e.preventDefault();
  titleEl.innerHTML = "Loading...";

  console.log(e);
  const location = e.target[0].value;
  console.log(location);
  const res = await fetch(`/weather?location=${location}`);
  const data = await res.json();
  if (data.error) {
    titleEl.innerHTML = data.error;
    contentEl.innerHTML = "";
    locationEl.innerHTML = "";
  } else {
    console.log(data);
    titleEl.innerHTML = data.title;
    contentEl.innerHTML = data.forecast;
    locationEl.innerHTML = data.location;
  }
};

search.addEventListener("submit", submitHandler);
