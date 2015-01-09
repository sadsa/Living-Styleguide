(function(d){
    
    // Expandable Navigation Menu
    // ==========================
    
    function query (str, context) { return (context || d).querySelector(str); }
    
    var urlEnd = window.location.pathname.split('/').pop() // e.g. index.html
    var currentPage = urlEnd.split('.')[0];
    var menuButton = query('#menu-trigger');
    var docBody = query('body');
    var isOpen = false;
    
    function closeMenu(){
        docBody.classList.remove('js-menu-open');
        isOpen = false;
    }
    
    function openMenu(){
        docBody.classList.add('js-menu-open');
        isOpen = true;
    }
    
    menuButton.addEventListener('click', function(){
        if(!isOpen){
            openMenu(); 
        }else{
            closeMenu();
        }
    });
    
    console.log(isOpen);
    
})(document);    