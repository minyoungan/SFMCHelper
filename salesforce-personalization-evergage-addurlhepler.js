(async function addCampaignUrls() {

    // --- 1. PASTE YOUR URLS HERE ---
    // Paste your full comma-delimited string between the quotes.
    const csvString = "https://github.com/minyoungan/SFMCHelper/,https://github.com/minyoungan/";

    // --- 2. Helper Functions ---
    
    // Pauses execution for a set time
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Waits for an element to appear on the page
    function waitForElement(selector, timeout = 2000) {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            function check() {
                const el = document.querySelector(selector);
                if (el) {
                    resolve(el);
                } else if (Date.now() - startTime > timeout) {
                    reject(new Error(`Element ${selector} not found after ${timeout}ms`));
                } else {
                    setTimeout(check, 100);
                }
            }
            check();
        });
    }

    // Cleans up individual URLs
    function cleanUrl(url) {
        let clean = url.trim();
        if (clean.startsWith('www.')) {
            clean = 'https://' + clean;
        }
        if (clean.startsWith('http://')) {
            clean = clean.replace('http://', 'https://');
        }
        if (!clean.startsWith('https://')) {
            clean = 'https://' + clean;
        }
        return clean;
    }

    // --- 3. Main Script Logic ---

    // Parse and clean all URLs from your string
    const urlsToProcess = csvString.split(',')
        .map(cleanUrl)
        .filter(url => url.length > 10); // Remove any empty/junk entries

    console.log(`Found ${urlsToProcess.length} URLs in your list to process.`);

    // Find the React Select input box
    const input = document.querySelector('.Select__StyledCreatableWrapper-sc-furt13-0 input[id^="react-select-"]');

    if (!input) {
        console.error("Error: Could not find the campaign settings input box.");
        console.error("Please make sure the URL input box is visible on the page.");
        return;
    }
    
    console.log("Found the input field. Starting to add URLs...");
    console.log("Please do not click or type while the script is running.");

    // Get all URLs ALREADY in the box to prevent duplicates
    const existingUrlNodes = document.querySelectorAll('.evg__multi-value__label');
    const existingUrlSet = new Set(Array.from(existingUrlNodes).map(el => el.textContent.trim()));
    console.log(`Found ${existingUrlSet.size} URLs already in the box.`);

    // Loop and add each URL
    for (const url of urlsToProcess) {
    
        // CHECK 1: See if URL is already in the box
        if (existingUrlSet.has(url)) {
            console.log(`Skipping (already exists): ${url}`);
            continue; // Skip to the next URL
        }

        // Set the input's value programmatically
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call(input, url);

        // Dispatch an 'input' event to make the website react
        input.dispatchEvent(new Event('input', { bubbles: true }));

        console.log(`...typing: ${url}`);
        
        try {
            // Wait for the "Create" option (class .evg__option) to appear
            const createOption = await waitForElement('.evg__option');
            
            // Simulate a real click
            createOption.click();
            
            console.log(`Added: ${url}`);
            
            // Add the newly added URL to our set to prevent re-adding it
            existingUrlSet.add(url);
        
        } catch (e) {
            console.warn(`Could not find "Create" option for: ${url}. Skipping.`);
            console.error(e);
        }

        // Wait for the component to process the new tag
        await sleep(500); // 0.5 second pause
    }

    console.log("All done!");

})();
