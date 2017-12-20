function init(){
   

	
    getMoviesListAndDrawList();
	
    //alert("HOLI");
	db = window.sqlitePlugin.openDatabase({name: 'favouriteslist.db', location: 'default'});
   db.transaction(insertDb);
   
   db.sqlBatch([
   'CREATE TABLE IF NOT EXISTS favouriteslist (id,title,rrelease_date,vote_average,poster_path,overview)'/*,
   [ 'INSERT INTO favouriteslist VALUES (?,?)', ['It', '346364'] ],
   [ 'INSERT INTO favouriteslist VALUES (?,?)', ['Jumanji', '8844'] ]*/
   ], function() {
	   console.log('Populated database OK');
	   alert("Table created successfully");
   }, function(error) {
	   console.log('SQL batch ERROR: ' + error.message);
	   alert("Error occurred while creating the table.");
   }); 
}


	
	document.getElementById("submit").onclick = insertDb;
	
	
function insertDb(db){
	    //alert("has entrado a la funcion y la id es:" +id);
 var request = $.ajax({
         url: "https://api.themoviedb.org/3/movie/"+id+"?api_key=4da6b895870b2ff644982b6a5b10f5d8",
         method: "GET"
        });

         request.done(function( result ) {
         alert('Added to Favorites');
         db.sqlBatch([
                [ 'INSERT INTO favouriteslist VALUES (?, ?, ?, ?, ?, ?)', [result.id, result.title, result.rrelease_date, result.vote_average, result.poster_path, result.overview] ]
           ], function() {
                console.log('INSERCIÓN OK');
              }, function(error) {
                console.log('SQL batch ERROR: ' + error.message);
         });
     });
    request.fail(function( jqXHR, textStatus ) {
          alert( "Request failed: " + textStatus );
    })
}
	
	function getMovieAndDrawDetail(id){
     var request = $.ajax({
         url: "https://api.themoviedb.org/3/movie/"+id+"?api_key=4da6b895870b2ff644982b6a5b10f5d8",
          method: "GET"
        });

        request.done(function( result ) {
            $.mobile.navigate( "#page2" );
            var listdetails = $("#mylistdetails");
            listdetails.empty();
            listdetails.append("<h2>"+result.original_title+"</h2><br>");
            listdetails.append("<img src=https://image.tmdb.org/t/p/w500"+result.poster_path+" height='300px'>");
            listdetails.append("<h3>Note: "+result.vote_average+"</h3>");
            listdetails.append("<p>Release date: "+result.release_date+"</p>");
            listdetails.append("<p>"+result.overview+"</p>");
			
            
            return result;
           
            listdetails.listview("refresh");
        });
    
        request.fail(function( jqXHR, textStatus ) {
          alert( "Request failed: " + textStatus );
    });
    }



  

function getMoviesListAndDrawList(){
    var theList = $("#mylist");

    
     var request = $.ajax({
          url: "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=62d65865aa3654006c3d5c77f9999610",
          method: "GET"
        });

        request.done(function( moviesList ) {
       
            for (i=0;i<moviesList.results.length;i++){
                // theList.append( "<li>" + moviesList.results[i].original_title + "</li>");
                theList.append("<div class='ui-block-a'><img src=https://image.tmdb.org/t/p/w500"+moviesList.results[i].poster_path+" height='280'></div>");
				theList.append("<div class='ui-block-b'><li><a href=javascript:getMovieAndDrawDetail("+moviesList.results[i].id +")>"+moviesList.results[i].original_title+"</a></li></div><br>");
				  
                }
            
            theList.listview("refresh");
            
            });
    
        request.fail(function( jqXHR, textStatus ) {
          alert( "Request failed: " + textStatus );
    });
}