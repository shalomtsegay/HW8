
let carArray = [];


let carObject = function (cTitle, cYear, cBrand, cColor, cCost) {
    this.ID = Math.random().toString(16).slice(5)
    this.Title = cTitle;  // Name of car
    this.Year = cYear;   // Year of release
    this.Brand = cBrand;  // Car brand
    this.Color = cColor;  // Car color
    this.Cost = cCost;  // approx cost in USD
}


carArray.push(new carObject("Lamborghini Urus", "2023", "Lamborghini", "Yellow", "200,000$"));
carArray.push(new carObject("Audi RS Q8", "2023", "Audi", "Black", "126,995$"));
carArray.push(new carObject("BMW X5 M", "2020", "BMW", "Blue", "106,095$"));
carArray.push(new carObject("Cayenne Turbo", "2022", "Posrche", "White", "131,250$"));
carArray.push(new carObject("Porsche 718 Boxster", "2023", "Porsche", "Green", "66,950$"));
carArray.push(new carObject("Lamborghini Sián", "2021", "Lamborghini", "Dark Gold", "3,000,000"));


document.addEventListener("DOMContentLoaded", function () {

    createList();

// button events ************************************************************************
    
    document.getElementById("buttonAdd").addEventListener("click", function () {
        carArray.push(new carObject(
            document.getElementById("title").value, 
            document.getElementById("year").value,
            document.getElementById("brand").value, 
            document.getElementById("color").value,
            document.getElementById("cost").value));
        document.location.href = "index.html#fullcatalog";
    });
    

    document.getElementById("buttonClear").addEventListener("click", function () {
        document.getElementById("title").value = "";
        document.getElementById("year").value = "";
        document.getElementById("brand").value = "";
        document.getElementById("color").value = "";
        document.getElementById("cost").value = "";
    });

    

    document.getElementById("delete").addEventListener("click", function () {
        let localParm = localStorage.getItem('parm'); 
        deleteCar(localParm);
        createList(); 
        document.location.href = "index.html#fullcatalog";  
    });


    document.getElementById("buttonSortYear").addEventListener("click", function () {
        carArray.sort(dynamicSort("Year"));
        createList();
        document.location.href = "index.html#fullcatalog";
    });

    document.getElementById("buttonSortBrand").addEventListener("click", function () {
        carArray.sort(dynamicSort("Brand"));
        createList();
        document.location.href = "index.html#fullcatalog";
    });


    document.getElementById("photo").addEventListener("click", function () {
        window.open(document.getElementById("carURL").innerHTML);
    });

    document.getElementById("buttonSubsetLamb").addEventListener("click", function () {
       
        createListSubset("Lamborghini");
    });

    document.getElementById("buttonSubsetPorsche").addEventListener("click", function () {
       
        createListSubset("Posrche");  // recreate li list after removing one
    });

// end of button events ************************************************************************
  
  

// page before show code *************************************************************************
    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#fullcatalog", function (event) { 
        createList();
    });


    $(document).on("pagebeforeshow", "#carDetails", function (event) {   
        let localParm = localStorage.getItem('parm');
        let localID = GetArrayPointer(localParm); 
        

        carArray = JSON.parse(localStorage.getItem('carArray'));  

        document.getElementById("carTitle").innerHTML = "The car name is: " + carArray[localID].Title;
        document.getElementById("carYear").innerHTML = "Year released: " + carArray[localID].Year;
        document.getElementById("carBrand").innerHTML = "Car Brand: " + carArray[localID].Brand;
        document.getElementById("carColor").innerHTML = "Car Color: " + carArray[localID].Color;
        document.getElementById("carCost").innerHTML = "Approximate Cost of car in USD: " + carArray[localID].Cost;
        document.getElementById("carURL").innerHTML = carArray[localID].URL;
    });
 
// end of page before show code *************************************************************************
});  




function createList() {

    var divCarList = document.getElementById("divCarList");
    while (divCarList.firstChild) { 
        divCarList.removeChild(divCarList.firstChild);
    }

    var ul = document.createElement('ul');
    carArray.forEach(function (element,) { 
        var li = document.createElement('li');
        li.classList.add('oneCar'); 
        li.setAttribute("data-parm", element.ID);
        li.innerHTML = "Car Title is: " + element.Title + " | Release year:  " + element.Year + " | Color " + element.Color;
        ul.appendChild(li);
    });
    divCarList.appendChild(ul);


    var liArray = document.getElementsByClassName("oneCar");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener('click', function () {
        var parm = this.getAttribute("data-parm");
        localStorage.setItem('parm', parm);

        let stringCarArray = JSON.stringify(carArray); 
        localStorage.setItem('carArray', stringCarArray);
        document.location.href = "index.html#carDetails";
        });
    });

}
 

function createListSubset(whichType) {
    var divCarList = document.getElementById("divCarListSubset");
    while (divCarList.firstChild) { 
        divCarList.removeChild(divCarList.firstChild);
    }

    var ul = document.createElement('ul');
    carArray.forEach(function (element,) {
        if (element.Brand === whichType) {
            var li = document.createElement('li');
            li.classList.add('oneCar');
            li.setAttribute("data-parm", element.ID);
            li.innerHTML = element.Title + " | " + element.Year + " | " + element.Color;
            ul.appendChild(li);
        }
    });
    divCarList.appendChild(ul);



    var liArray = document.getElementsByClassName("oneCar");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener('click', function () {
            var parm = this.getAttribute("data-parm");
           
            localStorage.setItem('parm', parm);

            let stringCarArray = JSON.stringify(carArray);
            localStorage.setItem('carArray', stringCarArray);

            document.location.href = "index.html#carDetails";
            });
        });
}



function deleteCar(which) {
    console.log(which);
    let arrayPointer = GetArrayPointer(which);
    carArray.splice(arrayPointer, 1);
}



function GetArrayPointer(localID) {
    console.log(carArray);
    console.log(localID);
    for (let i = 0; i < carArray.length; i++) {
        if (localID === carArray[i].ID) {
            return i;
        }
    }
}



function dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    };
}
function calculateValueLoss() {
    const initialValue = document.getElementById("initialValue").value;
    const age = document.getElementById("age").value;
    const valueLoss = initialValue * (age * 0.01);
    document.getElementById("valueLoss").innerHTML = valueLoss;
    const newValue = initialValue - valueLoss;
    document.getElementById("newValue").innerHTML = newValue;
  }