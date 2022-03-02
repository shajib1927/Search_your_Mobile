const message = document.getElementById('message');
const spinner = document.getElementById('spinner');
const container = document.getElementById('phone-container');

// get user input
const getInput = () => {
    const input = document.getElementById('input');
    const inputValue = input.value.toLowerCase();
     if(inputValue === 'iphone' || inputValue === 'samsung' || inputValue === 'oppo' || inputValue === 'huawei') {
      spinner.classList.remove('hidden');
      loadData(inputValue);
     
     } else if(inputValue === ''){
      container.innerHTML = '';
      message.innerHTML = `
       <h1 class="mt-5 text-danger">Enter Valid Input</h1>
       `;
     } else {
      container.innerHTML = '';
      message.innerHTML = `
      <h1  class="mt-5 text-danger">Nothing Found</h1>
      <p>Try <span class="text-danger">iphone</span>, <span class="text-danger">samsung</span>, <span class="text-danger">oppo</span> or <span class="text-danger">huawei</span> To Get Result</p>
      `
     }
     input.value = '';
}

// event listener for getting user input value
document.getElementById('search-btn').addEventListener('click',getInput)

// load data according to user input
const loadData = input => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${input}`;
    fetch(url)
    .then(response => response.json())
    .then(value => {
      spinner.classList.add('hidden');
            displayPhone(value.data);
    })
}
// card 
const displayPhone = phones => {
        const showPhone = phones.splice(0,20);
        container.innerHTML = '';
        message.textContent = '';
        showPhone.forEach(phone => {
            const div = document.createElement('div');
            div.className = 'col';
            div.innerHTML = `
            <div class="card mb-3 p-3 text-center shadow-sm" style="max-width: 540px">
            <div class="row g-0 align-items-center">
              <div class="col-md-4">
                <img src="${phone.image}" class="img-fluid rounded-start" alt="${phone.slug}" />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">
                  ${phone.brand}
                  </p>
                  <button
                  onclick="showDetail('${phone.slug}')"
                  type="button"
                  class="btn btn-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Explore
                </button>
                </div>
              </div>
            </div>
          </div>
            `;
            container.appendChild(div);
        });
}
// detail showing functionality
const showDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(details => {
// title,image,release date
        document.getElementById('modal-img').src = `${details.data.image}`;
        document.getElementById('title').textContent = details.data.name;
        document.getElementById('release').innerHTML = `
        <p>${details.data.releaseDate ? details.data.releaseDate : 'Release Date Not Available'}</p>
        `
        // features
        document.getElementById('chipset').textContent = `${details.data.mainFeatures.chipSet}`;
        document.getElementById('display-size').textContent = `${details.data.mainFeatures.displaySize}`;
        document.getElementById('memory').textContent = `${details.data.mainFeatures.memory}`;
        document.getElementById('sensor').textContent = `${details.data.mainFeatures.sensors}`;
        document.getElementById('storage').textContent = `${details.data.mainFeatures.storage}`;
        // other if available
        const other = document.getElementById('other');
        if(details.data.others) {
            other.innerHTML = `
            <p>Bluetooth: <span>${details.data.others.Bluetooth }</span>
            </p>
            <p>GPS: <span>${details.data.others.GPS}</span>
            </p>
            <p>Radio: <span>${details.data.others.Radio}</span>
            </p>
            <p>USB: <span>${details.data.others.USB}</span>
            </p>
            <p>WLAN: <span>${details.data.others.WLAN}</span>
            </p>
            `;
        } else {
          // if other is not available
            other.innerHTML = `
            <p> Nothing To Show
            </p>
            `
        }
    });
}
