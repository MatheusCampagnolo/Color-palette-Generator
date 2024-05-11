// Adds event listener to generate a palette based on a selected feature
document.getElementById('generate-by-feature-btn').addEventListener('click', generatePaletteByFeature);
// Adds event listener to generate a monochromatic palette based on a selected color
document.getElementById('generate-monochromatic-btn').addEventListener('click', generateMonochromaticPaletteByBaseColor);

// Function to generate a palette based on a selected feature
function generatePaletteByFeature() {
    const featureSelect = document.getElementById('feature-select');
    const selectedFeature = featureSelect.value;
    
    if (!selectedFeature) {
        alert('Please, choose a feature to generate the palette.');
        return;
    }
    
    let colorGenerator;
    switch (selectedFeature) {
        case 'random':
            colorGenerator = generateRandomColor;
            break;
        case 'red':
            colorGenerator = generateRedColor;
            break;
        case 'blue':
            colorGenerator = generateBlueColor;
            break;
        case 'orange':
            colorGenerator = generateOrangeColor;
            break;
        case 'yellow':
            colorGenerator = generateYellowColor;
            break;
        case 'pink':
            colorGenerator = generatePinkColor;
            break;
        case 'green':
            colorGenerator = generateGreenColor;
            break;
        default:
            alert('feature not found. Please, choose a valid feature.');
            return;
    }
    
    generatePalette(colorGenerator);
}

// Function to generate a palette based on the provided color generator function
function generatePalette(colorGenerator) {
    const colorPalette = document.getElementById('color-palette');
    colorPalette.innerHTML = ''; // Clears the existing palette
    const paletteColors = new Set(); // Set to store generated colors

    for (let i = 0; i < 5; i++) {
        let color = colorGenerator();
        while (paletteColors.has(color)) {
            color = colorGenerator();
        }
        paletteColors.add(color);

        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = color;
        colorBox.addEventListener('click', () => {
            const copyButton = colorBox.nextSibling;
            const oldColor = colorBox.style.backgroundColor;
            let newColor = colorGenerator();
            while (paletteColors.has(newColor)) {
                newColor = colorGenerator();
            }
            colorBox.style.backgroundColor = newColor;
            // Updates the displayed hex code
            copyButton.innerText = newColor; 
            paletteColors.delete(oldColor); // Removes the previous color from the set
            paletteColors.add(newColor); // Adds the new color to the set
        });

        // Adds a button to copy the hexadecimal code
        const copyButton = document.createElement('button');
        copyButton.innerText = color;
        copyButton.addEventListener('click', () => {
            copyToClipboard(color);
            alert('Copied: ' + color);
        });

        const colorInfo = document.createElement('div');
        colorInfo.appendChild(colorBox);
        colorInfo.appendChild(copyButton);
        colorPalette.appendChild(colorInfo);

        let pElement = document.getElementById('colorChangeHint');
        pElement.removeAttribute('hidden');
    }
}

// Function to generate a random hexadecimal color code
function generateRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

// Function to generate a random red color
function generateRedColor() {
    // Generates a hexadecimal value for red between 128 (80 in hex) and 255 (FF in hex)
    const red = Math.floor(Math.random() * (255 - 128) + 128).toString(16);
    // Keeps green and blue at low values to maintain the color close to red
    const green = Math.floor(Math.random() * 56).toString(16); // up to 55 (37 in hex)
    const blue = Math.floor(Math.random() * 56).toString(16); // up to 55 (37 in hex)
    return `#${red}${green.padStart(2, '0')}${blue.padStart(2, '0')}`;
}

// Function to generate a random green color
function generateGreenColor() {
    const red = Math.floor(Math.random() * 56).toString(16);
    const green = Math.floor(Math.random() * (255 - 128) + 128).toString(16);
    const blue = Math.floor(Math.random() * 56).toString(16);
    return `#${red.padStart(2, '0')}${green}${blue.padStart(2, '0')}`;
}

// Function to generate a random orange color
function generateOrangeColor() {
    const red = Math.floor(Math.random() * (255 - 200) + 200).toString(16);
    const green = Math.floor(Math.random() * (165 - 100) + 100).toString(16);
    const blue = Math.floor(Math.random() * 56).toString(16);
    return `#${red}${green}${blue.padStart(2, '0')}`;
}

// Function to generate a random blue color
function generateBlueColor() {
    const red = Math.floor(Math.random() * 56).toString(16);
    const green = Math.floor(Math.random() * 56).toString(16);
    const blue = Math.floor(Math.random() * (255 - 128) + 128).toString(16);
    return `#${red.padStart(2, '0')}${green.padStart(2, '0')}${blue}`;
}

// Function to generate a random pink color
function generatePinkColor() {
    const red = Math.floor(Math.random() * (255 - 200) + 200).toString(16);
    const green = Math.floor(Math.random() * (160 - 100) + 100).toString(16);
    const blue = Math.floor(Math.random() * (160 - 100) + 100).toString(16);
    return `#${red}${green}${blue}`;
}

// Function to generate a random yellow color
function generateYellowColor() {
    const red = Math.floor(Math.random() * (255 - 200) + 200).toString(16);
    const green = Math.floor(Math.random() * (255 - 200) + 200).toString(16);
    const blue = Math.floor(Math.random() * 56).toString(16);
    return `#${red}${green}${blue.padStart(2, '0')}`;
}

// ---------------------------------------------------------------------------------------------------

// Function to generate a monochromatic palette based on a selected color
function generateMonochromaticPaletteByBaseColor() {
    const baseColorSelect = document.getElementById('monochromatic-select');
    const baseColor = baseColorSelect.value;
    
    if (!baseColor) {
        alert('Please, choose a base color to generate the monochromatic palette.');
        return;
    }
    
    const palette = generateMonochromaticPalette(baseColor);
    displayPalette(palette, 'monochromatic-palette'); // Uses the displayPalette function with a specific ID
}

// Function to display a palette in the specified section
function displayPalette(palette, paletteId) {
    const colorPaletteSection = document.getElementById(paletteId);
    colorPaletteSection.innerHTML = ''; // Clears the existing section

    palette.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = color;

        // Creates a button to copy the hexadecimal color code
        const copyButton = document.createElement('button');
        copyButton.innerText = color;
        copyButton.addEventListener('click', () => {
            copyToClipboard(color);
            alert('Copied: ' + color);
        });

        // Creates a container for the color box and the copy button
        const colorInfo = document.createElement('div');
        colorInfo.appendChild(colorBox);
        colorInfo.appendChild(copyButton);

        colorPaletteSection.appendChild(colorInfo);
    });
}


// Function to generate a monochromatic palette
function generateMonochromaticPalette(baseColorHex) {
    // Converts the hexadecimal base color to RGB components
    let red = parseInt(baseColorHex.slice(1, 3), 16);
    let green = parseInt(baseColorHex.slice(3, 5), 16);
    let blue = parseInt(baseColorHex.slice(5, 7), 16);

    // Function to ensure RGB values are within the [0, 255] range
    function clamp(value) {
        return Math.max(0, Math.min(value, 255));
    }

    // Generates monochromatic variations
    let palette = [];
    for (let i = -2; i <= 2; i++) {
        // Adjusts brightness for each variation
        let newRed = clamp(red + i * 20);
        let newGreen = clamp(green + i * 20);
        let newBlue = clamp(blue + i * 20);
        // Converts back to hexadecimal and adds to the palette
        let color = `#${newRed.toString(16).padStart(2, '0')}${newGreen.toString(16).padStart(2, '0')}${newBlue.toString(16).padStart(2, '0')}`;
        palette.push(color);
    }

    return palette;
}

// ---------------------------------------------------------------------------------------------------

// Adds event listener to generate a custom monochromatic palette when the button is clicked
document.getElementById('generate-custom-monochromatic-btn').addEventListener('click', function() {
    const colorPickerInput = document.getElementById('color-picker');
    const colorPicked = colorPickerInput.value;
    // Basic validation to check if the color code seems to be a valid hexadecimal
    if (/^#[0-9A-F]{6}$/i.test(colorPicked)) {
        const palette = generateMonochromaticPalette(colorPicked);
        displayPalette(palette, 'custom-monochromatic-palette');
    } else {
        alert('Please, enter a valid hex color code.');
    }
});

// Function to copy text to clipboard
function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}
