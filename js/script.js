const $students = $(".cf");
let num = 0;
const pageNum = Math.round($students.length/5);
let pager = '#page1';

// after the student list insert a pagination empty list
$(".student-list").after(`<ul class="pagination"></ul>`)

// wrap each 10 students in a div 
for (let i = 0; i < pageNum; i++){
    const page = $(".student-item").slice(num, num+=9);
    $(page).wrapAll(`<div id="page${i}" class="slice"></div>`);
}

// append a new pagination button for each 10 students
for(let i = 1; i < $(".slice").length; i++){
    $(".pagination").append(`<li><a href="#page${i}">${i}</a></li>`);
}


$(".slice").hide(); //hide all pages
$(pager).show(); //show the first page at load


// on pagination buttons click navigate through pages
$(".pagination a").on("click", function(){
    pager = $(this).attr("href");
    $(".slice").hide();
    $(pager).show();
});


// insert a search bar in the page for search
const search = `<div class="search"><input type="text" name="search" id="search" placeholder="Student Search"><div>`;
$(".student-list").before(search);



// search for students by name
$("#search").on("keyup", function(){
    const searchTerm = $("#search").val().replace(/[^a-zA-Z]/g, "").toLowerCase();
    if(searchTerm){
        $(".slice").show();
    }else{
        $(".slice").hide();
        $(pager).show();
    }
    $(".student-item").each(function(){
        const studentName = $(this).find("h3").text().replace(/[^a-zA-Z]/g, "").toLowerCase();
        if(studentName.indexOf(searchTerm) >= 0){
            $(this).show();
        }else{
            $(this).hide();
        }
    });
});