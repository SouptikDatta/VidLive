//I simply made two arrays. One of the arrays contained a list of adjectives, while the other contained a list of objects. Then, I wrote a function to choose one random adjective and one random object and then put them together. Then used the Random Name Generator! //

const object = ["Gupta ji", "Operating System", "Sphere", "Armaan", "Angel Priya", 
"Cowboy", "Spider", "Dragon", "Desi Ladka", "Soda", "Barbie Doll", "Simraan", "Smriti", 
"Butcher Bill", "Indian Army", "Liliput", "Sunglasses", "Sharmaji Ka beta", "Mortal", "Soul Goldy", "Tony Stark", "Federer", 
"Random Ashiq", "Rajiv", "Snoop Dog", "Crazy Boy", "Flamboyant"]

export function generator() {
    return object[Math.floor(Math.random() * object.length)];
}


const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}