Google extension project - Convert currency widget

step 1
create extension file and loaded to google extension

step 2
create simple user interface for the widget

step 3 // logic
get inputs:
`${have}`(required) - Currency you currently hold. Must be 3-character currency code (e.g. USD),
`${want}`(required) - Currency you want to convert to. Must be 3-character currency code (e.g. USD),
`${amount}`(required)(default: 1) - Amount of currency to convert

step 4
validate inputs

    1. `${have}`, `${want}`
        // (currency symbol || currency name) != 0
        // adjust input format, ref.:
            let input = document
            .getElementById("myInput") //All input in uppercase, turn input into value
            .value.toUpperCase()
            .trim() //no space on each end
            .replaceAll(" ", ""); //remove all the space in input
            console.log("Submitted: " + input);

    2. `${amount}` = integer
    3. loop currency data to check if currency symbol exsit
        fetch(
        "https://api.api-ninjas.com/v1/convertcurrency?want=EUR&have=USD&amount=5000",
        {
        method: "GET",
        headers: { "X-Api-Key": "8shmkmy3KkvULZ75astEag==35ewYVYXu1rMDZy2" },
        contentType: "application/json",
        }
        )
        .then((res) => res.json())
        .then((data) => console.log(data));

step 5
if all true -> call [`${have}` and `${want}` converter]

display new_amount (round to at most 2 decimal places)
call api from https://api-ninjas.com/api/convertcurrency
URL = `https://api.api-ninjas.com/v1/convertcurrency?want=${want}&have=${have}&amount=${amount}`
