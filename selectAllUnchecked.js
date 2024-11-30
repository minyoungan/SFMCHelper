// Function to select all unchecked checkboxes in the data extension synchronization table
    // Query selector that finds all checkboxes that:
    // - have class 'sub-checkbox'
    // - are not already checked (:not(:checked))
    // - are not disabled (:not([disabled]))
// Select all unchecked checkboxes

function selectAllUnchecked() {
    const checkboxes = document.querySelectorAll('.sub-checkbox:not(:checked):not([disabled])');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
        
        // Add selected class to parent row
        const row = checkbox.closest('tr');
        if (row) {
            row.classList.add('selected');
        }
    });
}

// Execute the function
selectAllUnchecked();
