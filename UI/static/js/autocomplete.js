// function that enables auto completion
function autoComplete(inp, arr){

    let currentFocus;

    // the function that executes when some one write in the the text field

    inp.addEventListener('input', function (e) {

        let a, b, c, i ,val = this.value;
        // close the list of auto complete if already opened

        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of aut ocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    } );

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        let  items = document.getElementById(this.id + "autocomplete-list");
        if (items) items = items.getElementsByTagName("div");
        if (e.keyCode === 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(items);
        } else if (e.keyCode === 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(items);
        } else if (e.keyCode === 13){
            /* this prevent the form from being submitted if the the key is press*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (items) items[currentFocus].click();
            }
        }
    });

    function addActive(items) {
        /*a function to classify an item as "active":*/
        if (!items) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(items);
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (items.length - 1);
        /*adds  class "auto-complete-active" to the item list */
        items[currentFocus].classList.add("autocomplete-active");

    }

    function removeActive(items) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(element) {
        /* enables the user to close all auto complete lists in the document,
        except the one passed as an argument:*/
        let items = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < items.length; i++) {
            if (element !== items[i] && element !== inp) {
                items[i].parentNode.removeChild(items[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });

}

let current_location = ['Buikwe','Bukomansimbi','Butambala','Buvuma','Gomba', 'Kalangala',
    'Kalungu', 'Kampala','Kayunga','Kiboga', 'Kyankwanzi','Luweero', 'Lwengo', 'Lyantonde',
    'Masaka', 'Mityana', 'Mpigi','Mubende', 'Mukono','Nakaseke','Nakasongola', 'Rakai',
    'Ssembabul','Wakiso','Amuria','Budaka', 'Bududa','Bugiri', 'Bukedea', 'Bukwa', 'Bulambuli',
    'Busia', 'Butaleja', 'Iganga','Jinja', 'Kaberamaido', 'Kaliro', 'Kamuli','Kapchorwa', 'Katakwi',
    'Kibuku', 'Kumi','Kween', 'Luuka', 'Manafwa','Mayuge','Mbale', 'Namayingo','Namutumba','Ngora',
    'Pallisa', 'Serere', 'Sironko', 'Soroti','Tororo'];

// updating the current destination
autoComplete(document.getElementById('current_location'),current_location);
