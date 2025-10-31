## Movie-App

This is a full stack Next App made with **Next**, **Typescript**, **Tailwind** for styling, **React-Query** and **Zustand** for data fetching and state management respectively.

To run the application in your local computer:

- Clone the repository from the github.
- Install all the required package using npm install.
- Run npm run dev to go inside localhost.

**Features of the application**

**_Dashboard page:_**

- Once, you get inside application you will see movie dashboard with movie cards having posters, title, genre, year, rating and view details button.
- In the Navbar you can see title as well as Searchbar to search for required movie and login for admin to get inside Admin Panel.
- In the sidebar there is filter and sorting dropdown. You can filter by Genre (Action, Drama,Comedy,Sci-Fi, Horror, Romance, Thriller, Biographical, Adventure) and Language (Nepali, English, Hindi).
- Sorting can be done by Title-A-Z, Title-Z-A, Rating-High-Low, Rating-Low-High, Year-New-Old, Year-Old-New

***View Details Page***

- On clicking the card or view details button you are redirected to view details page.
- Here you can see the details of specific movie including Director, Runtime, Cast, Synopsis and title, genre, language, year which were already in Dashboard page.
- There is review count and average rating of the movie and you can also check the reviews of the movie by different people which is scrollable.
- Also, there is section to write and submit your review of the movie.

***Login Modal***

- On clicking Login button in the Dashboard page, a login model opens where admin enters username and password.
- Then on clicking login, you are redirected to Admin Panel.

***Admin Panel***

- On Admin Panel, there is a table which display the list of all the  movies that are present with edit and delete icon.
- On Navbar, there is title and Logout button to go back to the dashboard.
- Below Navbar, there is Welcome, Admin and the right Add button and Export to CSV.
- On clicking, export to CSV all the data are exported to CSV.
- On, clicking Add button, a drawer opens, where you (Admin)  can add all the required fields of New movie (Poster, Title, Language, Genre, Year, Rating, Director, Runtime, Cast and Synopsis). 
- On clicking delete icon, a modal will open asking you if you surely want to Delete the movie. On clicking confirm, it will delete the movie or else clicking cancel will close modal.
- On clicking edit icon, drawer will open to update anything about particular movie except the movie poster.

To know further about the app you can click on link below: 

https://movie-app-theta-lovat.vercel.app
