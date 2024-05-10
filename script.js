// Adds event listener to generate a random palette when the button is clicked
document.getElementById('generate-random-btn').addEventListener('click', generateRandomPalette);
// Adds event listener to generate a palette based on a selected feature
document.getElementById('generate-by-feature-btn').addEventListener('click', generatePaletteByFeature);

// Function to generate a palette with random colors
function generateRandomPalette() {
    generatePalette(generateRandomColor);
}

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
            alert('The hex code has been copied. ' + color);
        });

        const colorInfo = document.createElement('div');
        colorInfo.appendChild(colorBox);
        colorInfo.appendChild(copyButton);
        colorPalette.appendChild(colorInfo);
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

// Function to copy text to clipboard
function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}
