# Foton Book App📚
This app was built for an admission process on Foton Tech.
Feel free to visit the app at: https://foton-book.vercel.app/

## Design/Screens
https://www.figma.com/file/KFElqzD983WNyvMY1SaF0c/book-app?node-id=0%3A1

<img width="581" alt="All three app screens designs" src="https://user-images.githubusercontent.com/13947203/114559257-eb55ad00-9c41-11eb-9617-4e7627cc373e.png">

## Features

This app is integrated with the [Google Books API](https://developers.google.com/books/docs/v1/using). The books on the homepage doesn't change, they were selected to follow the design. All covers are clickable and will redirect you to its details page. You can filter by author, subject, or publisher by following some rules (piece from Google's Documentation): 
- **intitle:** Returns results where the text following this keyword is found in the title.
- **inauthor:** Returns results where the text following this keyword is found in the author.
- **inpublisher:** Returns results where the text following this keyword is found in the publisher.
- **subject:** Returns results where the text following this keyword is listed in the category list of the volume.
- **isbn:** Returns results where the text following this keyword is the ISBN number.
- **lccn:** Returns results where the text following this keyword is the Library of Congress Control Number.
- **oclc:** Returns results where the text following this keyword is the Online Computer Library Center number.

**!IMPORTANT: DON'T** use space after colon (e.g.: "inauthor:Neil Gaiman"); If you're using more than one filter, separe the terms by space (e.g.: "inauthor:Neil Gaiman intitle:Coraline")
