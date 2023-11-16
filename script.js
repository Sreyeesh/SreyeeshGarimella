document.addEventListener('DOMContentLoaded', function() {
    var hamburger = document.querySelector('#navbar .hamburger');
    var menuItems = document.querySelectorAll('#navbar a');

    // Function to show/hide menu items
    function toggleMenuItems(displayStyle) {
        menuItems.forEach(function(item) {
            item.style.display = displayStyle;
        });
    }

    // Toggle display of menu items on hamburger click
    hamburger.addEventListener('click', function() {
        menuItems.forEach(function(item) {
            item.style.display = item.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Adjust menu visibility based on window width
    function adjustMenuForWindowSize() {
        if (window.innerWidth > 768) {
            // Show menu items in full page view
            toggleMenuItems('block');
        } else {
            // Hide menu items in mobile view
            toggleMenuItems('none');
        }
    }

    // Call adjustMenuForWindowSize on window resize
    window.addEventListener('resize', adjustMenuForWindowSize);

    // Initial adjustment on page load
    adjustMenuForWindowSize();
});
