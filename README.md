# Bootstrap Course

This project is meant to teach Bootstrap fundamentals by creating a book shop, step by step. <br/>
It uses [Bootstrap 5](https://getbootstrap.com) pages, [Handlebars](https://handlebarsjs.com/guide/) templating, some [JavaScript](https://www.w3schools.com/js/) and the [Bookly](https://templatesjungle.com/downloads/bookly-bookstore-ecommerce-bootstrap-website-template/) E-Commerce theme, and it stores it's data in the browser's LocalStorage.

This is how the final shop looks like:

![Book Shop Screenshot](images/bookshop.png)<br/>
<br/>

Follow these steps to implement the book shop:
## 1. Create project and folders
1. In your IDE, create a new Bootstrap project:<br/>
   ![Bootstrap](images/new-project.png)
  

1. Wait until all files and folders are created. After that, add a [fonts](fonts) and [images](images) folder:<br/>
   ![folder structure](images/folder-structure.png)

## 2. Add static resources
1. Search for an adequate theme, download it and copy the files into this project. For instance, I found my E-Commerce shop theme on <a href="https://templatesjungle.com/downloads/category/free-bootstrap-templates/" target="_blank">TemplatesJungle</a>.


1. Download any CDN resources, copy them to your local folders and adjust their references.
   ```html
   <link rel="stylesheet" href="css/bootstrap.min.css">
   <link rel="stylesheet" href="css/style.css">
   <link rel="stylesheet" href="css/swiper-bundle.min.css" />
   ...
   <script src="js/vendors/jquery-1.11.0.min.js"></script>
   <script src="js/vendors/bootstrap.bundle.min.js"></script>
   <script src="js/vendors/swiper-bundle.min.js"></script>
   <script src="js/vendors/script.js"></script>
   ```
2. Open the start page ([index.html](index.html)) in your browser. In a JetBrains IDE, the URL would be e.g. http://localhost:63342/BookShop/index.html


1. Check and correct all hyperlinks so that the navigation works, locally, and no network or JavaScript errors occur.

## 3. Split pages into partials
### Replace the Header
1. Download [Handlebars.js](https://handlebarsjs.com/installation/#downloading-handlebars) from the [official website](https://handlebarsjs.com/guide/) and copy it to the [vendors](js/vendors) folder.
  
 
1. Download my [vanilla.js](js/vanilla.js) file from <a href="https://raw.githubusercontent.com/artingo/Bootstrap-BookShop/master/js/vanilla.js" target="_blank">GitHub</a> and copy it to the [js](js) folder. It contains basic DOM, Events and Render functions.
  

1. In the HTML `head` section add 2 `script tags:
   ```html
   <script src="js/vendors/handlebars.min-v4.7.8.js"></script>
   <script src="js/vanilla.js"></script>
   ```
2. Create a [partials](partials) folder for header, footer and other templates.
  

1. Inside, create an empty [header.html](partials/header.html) file.
  

1. Edit the [index.html](index.html) file, cut out it's header code and paste it into the [header.html](partials/header.html) file.
   ```html
   <svg xmlns="http://www.w3.org/2000/svg">...
   <div id="preloader" class="preloader-container">...
   <div class="search-popup">...
   <header id="header" class="site-header">...
   ```
2. Now, we want to replace the former static `header` code with the newly created Handlebars template. To do so, replace the former `header` with this  code: 
   ```html
   <div>
      <script type="text/x-handlebars-template">
      {{> partials/header index='active' }}
      </script>
   </div>
   ```
3. To active Handlebars' template rendering, add a `render` call to the HTML body: `<body onload="render()">`. This function will scan your HTML page for any Handlebars `<script>` tags and dynamically render them. It will also load any partials.
  

1. Reload the index page in your browser, open the JavaScript console by pressing the `F12` key, and correct any JS errors that may occur.
  

1. The last step is to dynamically highlight the active navigation link. To do so, add this small Handlebars code to the Overview navigation link in [header.html](partials/header.html):
    ```handlebars
    <li class="nav-item">
      <a class="nav-link me-4 {{index}}" href="index.html">Overview</a>
    </li>
    ```
    Add a corresponding Handlebar code to all navigation links in [header.html](partials/header.html).<br/>
    The corresponding part in [index.html](index.html) looks like this:
    ```handlebars
    {{> partials/header index='active' }}
    ```
2. To replace all headers with a Handlebar template, repeat steps 7 to 10 for all HTML files.

### Replace the hero section
1. Inside the [partials folder](partials), create an empty [hero.html](partials/hero.html) file.
2. Move the HTML code from the hero section to this new file.
3. At the `<h1>` tag, replace the static title with a Handlebars expression: `<h1>{{title}}</h1>`
4. In the [index.html](index.html) file, place a Handlebars script and pass the title as parameter:
   ```handlebars
   <div>
     <script type="text/x-handlebars-template">
       {{> partials/hero title='Shop' }}
     </script>
   </div>
   ```
### Replace the footer
1. Repeat steps 1 to 4 for the `<footer>` section.
   ```handlebars
   <div>
     <script type="text/x-handlebars-template">
       {{> partials/footer }}
     </script>
   </div>
   ```

### Replace the HTML head
1. Repeat steps 1 to 4 for the `<head>` section.
   ```handlebars
   <script type="text/x-handlebars-template">
     {{> partials/htmlHead }}
   </script>
   ```


