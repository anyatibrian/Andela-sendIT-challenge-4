document.getElementById('search').addEventListener('keyup', SearchParcelOrders);
//function that enables us to search through the product list
function SearchParcelOrders(e){
    e.preventDefault();
    let table = document.getElementById('myTable');
    let input = document.getElementById('search').value;
    let search = input.toUpperCase();
    let tr = table.getElementsByTagName('tr');

    // loop through the table and find the one which matches our search result
    let i;

    for(i=0; i< tr.length; i++){

        let td=tr[i].getElementsByTagName("td")[0];
        if (td){
            let searchResult = td.textContent|| td.innerText;
            if (searchResult.toUpperCase().indexOf(search) > -1){
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }
    }

}