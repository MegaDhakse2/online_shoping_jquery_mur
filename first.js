class Car {
    static name(){
        let name = "mega";
        console.log(name);
        return name;
    }
}


$(document).ready(function(){
    $('a').attr("href","user_form.html")
    .html(' <span class="trackName">Track Name</span>');
});
