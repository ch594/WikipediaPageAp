# Wikipedia Page Links App
A javascript app to see how many links it takes for a user to get to a desired page from a random start page. To use it clone the repository and open index.html in a browser. I've also deployed it heroku for the time being at https://morning-thicket-57497.herokuapp.com/.

This works by querying the Wikipedia API for a random page and the links associated with that page. It then dynamically generates html up to a maximum (the limit Wikipedia sets) of 500 results. Clicking on any of those queries the Wikipedia API for the links associated with that page. The app also keeps track of how many links were clicked.
