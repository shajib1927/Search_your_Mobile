const errorMsg = document.getElementById('error-msg');
const spinner = document.getElementById('spinner');
const resultDiv = document.getElementById('result-div');

// user input and error handling

const search_Text = () => {
    
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value.toLowerCase();
    searchField.value = '';
    resultDiv.innerHTML = '';

    // error handling

    if (searchText === 'watch' || searchText === 'iphone' || searchText === 'samsung' || searchText === 'oppo' || searchText === 'huawei') {
        spinner.classList.remove('visually-hidden');
        load_Search_Data(searchText);
    }

    else if (searchText === '') {
        errorMsg.innerHTML = `
         <h4 class="mt-5 text-danger">Please enter a valid Input</h4>
         <h2>Please search by Brand-names</h2>
         `;
    }

    else {
    errorMsg.innerHTML = `
        <h4  class="mt-5 text-danger">Not availabe or invalid entry!</h4>
        <h2>Please search by Brand-names</h2>
        `;
    }
}

// Codes after pressing search button

const load_Search_Data = search_Text => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search_Text}`;

    fetch(url)
    .then(res => res.json())
    .then(mobile_list => {
        spinner.classList.add('visually-hidden');
        displayMobile(mobile_list.data);
    });
}

// Showing results in cards 

const displayMobile = all_mobile_Phones => {

    errorMsg.innerHTML = '';
    resultDiv.textContent = '';

    // splice to show 20 phones in first search

    const showMobile = all_mobile_Phones.splice(0, 20);

    showMobile.forEach( mobilePhone => {
        const div = document.createElement('div');
        div.className = 'col';
        div.innerHTML = `
            <div class="card mb-3 p-3 text-center shadow-sm" style="max-width: 540px">
                <div class="row g-0 align-items-center">
                    <div class="col-md-4">
                        <img src="${mobilePhone.image}" class="img-fluid rounded-start" alt="${mobilePhone.slug}" />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">${mobilePhone.phone_name}</h5>
                        <p class="card-text">${mobilePhone.brand}</p>
                        <button onclick="showDetails('${mobilePhone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> Details </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    resultDiv.appendChild(div);
    });
}

// detail showing functionality
const showDetails = mobile_id => {

    const url = `https://openapi.programming-hero.com/api/phone/${mobile_id}`;

    fetch(url)
    .then(res => res.json())
    .then(details => {

        // title, image and release date

        document.getElementById('modal-img').src = `${details.data.image}`;
        document.getElementById('title').textContent = details.data.name;
        document.getElementById('release').innerHTML = `
        <p>${details.data.releaseDate ? details.data.releaseDate : 'Release Date Not Available'}</p>
        `
        // features of devices

        document.getElementById('chipset').textContent = `${details.data.mainFeatures.chipSet}`;
        document.getElementById('display-size').textContent = `${details.data.mainFeatures.displaySize}`;
        document.getElementById('memory').textContent = `${details.data.mainFeatures.memory}`;
        document.getElementById('sensor').textContent = `${details.data.mainFeatures.sensors}`;
        document.getElementById('storage').textContent = `${details.data.mainFeatures.storage}`;
        
        // others if available

        const others = document.getElementById('other');

        if(details.data.others) {
            others.innerHTML = `
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
        }
        
        else {
          // if other is not available
            others.innerHTML = `
            <p> Nothing To Show
            </p>
            `
        }
    });
}
