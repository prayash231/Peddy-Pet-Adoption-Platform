const allPetCategories = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await response.json();
  displayAllPetCategories(data.categories);
};
let sortedData = [];
const loadIndividualPetCategory = async (id) => {
  showSpinner("block");
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${id}`
  );
  const data = await response.json();
  sortedData = data.data;
  removeActiveBtnClass();
  const activeCaterogyBtn = document.getElementById(`btn-${id}`);
  activeCaterogyBtn.classList.add(
    "bg-teal-50",
    "rounded-full",
    "border-forestGreen",
    "hover:bg-teal-50",
    "hover:border-forestGreen"
  );
  // displayAllPetsData(data.data);
  setTimeout(() => {
    displayAllPetsData(data.data);
    showSpinner("hidden");
  }, 2000);
};

const removeActiveBtnClass = () => {
  const categoryButtons = document.getElementsByClassName("category-btn");
  for (let btn of categoryButtons) {
    btn.classList.remove(
      "bg-teal-50",
      "rounded-full",
      "border-forestGreen",
      "hover:bg-teal-50",
      "hover:border-forestGreen"
    );
  }
};

const displayAllPetCategories = (categories) => {
  const allPetItems = document.getElementById("all-pet-items");
  categories.forEach((item) => {
    // console.log(item);
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
            <button id="btn-${item.category}" onclick="loadIndividualPetCategory('${item.category}')" class="btn category-btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:w-64 flex items-center lg:space-x-2 border bg-white hover:bg-white">
            <img class="h-4 md:h-8 lg:h-10" src=${item.category_icon} alt="">
            <p class="text-xs md:text-xl lg:text-2xl font-bold">${item.category}</p>
            </button>
        `;
    allPetItems.appendChild(buttonContainer);
  });
};

const showSpinner = (state) => {
  const spinner = document.getElementById("loaded-spinner");
  if (state === "block") {
    spinner.classList.remove("hidden");
    spinner.classList.add("flex");
  } else {
    spinner.classList.add("hidden");
    spinner.classList.remove("flex");
  }
};
const allPetsData = async () => {
  showSpinner("block");
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await response.json();
  sortedData = data.pets;
  setTimeout(() => {
    displayAllPetsData(data.pets);
    showSpinner("hidden");
  }, 2000);
};

const displayAllPetsData = (pets) => {
  const disPlayAllPetsInformation = document.getElementById(
    "all-pets-information"
  );
  disPlayAllPetsInformation.innerHTML = "";
  if (pets.length === 0) {
    disPlayAllPetsInformation.classList.remove("grid");
    disPlayAllPetsInformation.innerHTML = `
            <div class="flex flex-col justify-center items-center gap-5 bg-gray-100 rounded-3xl py-10">
                <img src="../images/error.webp" />
                <h3 class="text-3xl font-bold text-center">No Information Available</h3>
                <p class="text-base font-normal text-gray-500 text-center">Currently, no information about available pets is listed. Please check back later as we regularly update our listings, <br> or explore other sections of the platform to learn more about pet adoption and care.</p>
            </div>
        `;
    return;
  } else {
    disPlayAllPetsInformation.classList.add("grid");
  }
  pets.forEach((item) => {
    // console.log(item);
    const petsContainer = document.createElement("div");
    petsContainer.classList.add(
      "border",
      "rounded-xl",
      "lg:p-[1.042vw]",
      "p-3"
    );
    petsContainer.innerHTML = `
                <img class="w-full lg:h-[11.667vw] object-cover rounded-lg" src=${
                  item.image ? item.image : "Not available"
                } alt=""><br>
                <h3 class="lg:text-[1.042vw] font-bold">${
                  item.pet_name ? item.pet_name : "Not available"
                }</h3>
                <div class="flex items-center gap-x-2 lg:gap-x-[0.417vw]">
                 <img class="lg:w-[1.042vw]" src="../images/breed.svg" alt="">
                 <p class="lg:text-[0.938vw] text-gray-600">Breed: ${
                   item.breed ? item.breed : "Not available"
                 }</p>
                </div>
                <div class="flex items-center gap-x-2 lg:gap-x-[0.417vw]">
                 <img class="lg:w-[1.042vw]" src="../images/birth.svg" alt="">
                 <p class="lg:text-[0.938vw] text-gray-600">Birth: ${
                   item.date_of_birth ? item.date_of_birth : "Not available"
                 }</p>
                </div>
                <div class="flex items-center gap-x-2 lg:gap-x-[0.417vw]">
                 <img class="lg:w-[1.042vw]" src="../images/gender.svg" alt="">
                 <p class="lg:text-[0.938vw] text-gray-600">Gender: ${
                   item.gender ? item.gender : "Not available"
                 }</p>
                </div>
                <div class="flex items-center gap-x-2 lg:gap-x-[0.417vw]">
                 <img class="lg:w-[1.042vw]" src="../images/dollar.svg" alt="">
                 <p class="lg:text-[0.938vw] text-gray-600">Price: ${
                   item.price ? `${item.price}$` : "Not available"
                 }
                 </p>
                </div><br>
                <div class="border border-t"></div><br>
                <div class="flex items-center justify-between">
                 <button onclick="likedBtn('${
                   item.image
                 }')" class="btn lg:text-[1.042vw] border border-normalGreen bg-white">
                   <img src="../images/like.svg" alt="">
                 </button>
                 <button onclick="adoptBtn(this)" class="btn text-forestGreen lg:text-[1.042vw] font-bold border border-normalGreen bg-white">
                   Adopt
                 </button>
                 <button onclick="petDetails(${
                   item.petId
                 })" class="btn text-forestGreen lg:text-[1.042vw] font-bold border border-normalGreen bg-white">
                   Details
                 </button>
                </div>   
        `;
    disPlayAllPetsInformation.appendChild(petsContainer);
  });
};

const petDetails = async (info) => {
  // console.log(info);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${info}`
  );
  const data = await response.json();
  // console.log(data.petData);

  const {
    breed,
    date_of_birth,
    image,
    gender,
    pet_details,
    vaccinated_status,
    pet_name,
    price,
  } = data.petData;

  const showPetDetails = document.getElementById("pet-details");
  showPetDetails.innerHTML = `
        <dialog id="my_modal_5" class="modal modal-middle">
            <div class="modal-box">
              <img class="w-full rounded-lg" src=${
                image ? image : "Not available"
              } /> <br>

              <h3 class="text-2xl font-bold">${
                pet_name ? pet_name : "Not available"
              }</h3> <br>

              <div class="flex flex-col md:flex-row md:gap-x-4">
                    <div>
                        <div class="flex items-center gap-x-2 lg:gap-x-[0.417vw]">
                        <img class="" src="../images/breed.svg" alt="">
                        <p class="text-gray-600">Breed: ${
                          breed ? breed : "Not available"
                        }</p>
                        </div>

                        <div class="flex items-center gap-x-2 lg:gap-x-[0.417vw]">
                        <img class="" src="../images/gender.svg" alt="">
                        <p class="text-gray-600">Gender: ${
                          gender ? gender : "Not available"
                        }</p>
                        </div>

                        <div class="flex items-center gap-x-2 lg:gap-x-[0.417vw]">
                        <img class="" src="../images/gender.svg" alt="">
                        <p class="text-gray-600">Vaccinated status: ${
                          vaccinated_status
                            ? vaccinated_status
                            : "Not available"
                        }</p>
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center gap-x-2 lg:gap-x-[0.417vw]">
                        <img class="" src="../images/birth.svg" alt="">
                        <p class="text-gray-600">Birth: ${
                          date_of_birth ? date_of_birth : "Not available"
                        }</p>
                        </div>

                        <div class="flex items-center gap-x-2 lg:gap-x-[0.417vw]">
                        <img class="" src="../images/dollar.svg" alt="">
                        <p class="text-gray-600">Price: ${
                          price ? `${price}$` : "Not available"
                        }
                        </p>
                        </div>
                    </div>
              </div> <br>
              <div class="border border-t">
              </div><br>
              <h3 class="text-lg font-semibold">Details Information</h3> <br>
              <p class="text-base text-gray-500">${
                pet_details ? pet_details : "Not available"
              }</p>
              <div class="modal-action block">
                <form method="dialog">
                  <button class="btn btn-block text-lg font-bold bg-teal-50 text-forestGreen border-emerald-200">
                  Cancel 
                  </button>
                </form>
              </div>
            </div>
        </dialog>
    `;
  my_modal_5.showModal();
};

const likedBtn = (image) => {
  const imageContainer = document.getElementById("images-container");
  const divContainer = document.createElement("div");
  divContainer.innerHTML = `
        <img class="border rounded-lg" src='${image}' alt="">
   `;
  imageContainer.appendChild(divContainer);
};

/* Adopt button functionalities starts here */

const adoptBtn = (event) => {
  const countdownSection = document.getElementById("countdown-section");
  countdownSection.innerHTML = `
    <dialog id="my_modal_4" class="modal modal-middle">
    <div class="modal-box flex flex-col items-center">
      <img src="https://img.icons8.com/?size=100&id=JDJpJPFVUvFU&format=png&color=000000" alt="">
      <h3 class="text-4xl font-bold">Congrates</h3>
      <p class="py-4">Adoption process is start for your pet</p>
      <h3 id="countdown" class="text-4xl font-bold">3</h3>
    </div>
   </dialog>
  `;
  my_modal_4.showModal();

  const countdownDisplay = document.getElementById("countdown");

  let countdownValue = 3;
  countdownDisplay.textContent = countdownValue;

  const countdownInterval = setInterval(() => {
    countdownValue--;
    countdownDisplay.textContent = countdownValue;

    if (countdownValue === 1) {
      clearInterval(countdownInterval);
      my_modal_4.close();
      event.textContent = "Adopted";
      event.disabled = true;
    }
  }, 1000);
};

document.getElementById("sorted-btn").addEventListener("click", async () => {
  showSpinner("block");
  // const response = await fetch(
  //   `https://openapi.programming-hero.com/api/peddy/pets`
  // );
  // const data = await response.json();
 
  // const items = data.pets;
  // console.log(items.sort((a, b) => b.price - a.price));
  // displayAllPetsData(items.sort((a, b) => b.price - a.price));
  setTimeout(() => {
    displayAllPetsData(sortedData.sort((a, b) => b.price - a.price));
    showSpinner("hidden");
  }, 2000);
});

allPetCategories();

allPetsData();
