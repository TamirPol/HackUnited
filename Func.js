
class Vector{
    constructor(x,y){
        this.x = x
        this.y = y
    }
    length(vector2){
        return Math.sqrt(this.x*vector2.x + this.y*vector2.y)
    }
}
//dictionary of all crime values
let crime_values = {
    "Assault": 70,
    "Assault Bodily Harm": 80,
    "Robbery - Mugging": 85,
    "Assault With Weapon": 90,
    "Discharge Firearm With Intent": 100,
    "Assault Peace Officer": 75,
    "Unlawfully In Dwelling-House": 60,
    "Aggravated Assault": 95,
    "B&E W'Intent": 65,
    "B&E": 50,
    "Robbery - Business": 80,
    "Administering Noxious Thing": 90,
    "Theft Over": 40,
    "Robbery With Weapon": 95,
    "Robbery - Swarming": 85,
    "Robbery - Purse Snatch": 60,
    "Theft Of Motor Vehicle": 50,
    "Crim Negligence Bodily Harm": 85,
    "Robbery - Other": 75,
    "Robbery - Financial Institute": 85,
    "Theft From Motor Vehicle Over": 40,
    "Assault - Force/Thrt/Impede": 60,
    "Robbery - Armoured Car": 90,
    "Assault - Resist/ Prevent Seiz": 70,
    "Pointing A Firearm": 95,
    "Discharge Firearm - Recklessly": 100,
    "Theft From Mail / Bag / Key": 45,
    "Assault Peace Officer Wpn/Cbh": 85,
    "Robbery - Vehicle Jacking": 95,
    "Robbery - Home Invasion": 100,
    "Robbery - Taxi": 75,
    "B&E Out": 40,
    "Theft Over - Shoplifting": 35,
    "Unlawfully Causing Bodily Harm": 85,
    "Use Firearm / Immit Commit Off": 90,
    "Theft - Misapprop Funds Over": 40,
    "Robbery - Delivery Person": 70,
    "Robbery - Atm": 80,
    "Aggravated Assault Avails Pros": 95,
    "B&E - To Steal Firearm": 80,
    "Aggravated Aslt Peace Officer": 90,
    "Disarming Peace/Public Officer": 80,
    "Theft Of Utilities Over": 20,
    "Air Gun Or Pistol: Bodily Harm": 75,
    "Theft Over - Distraction": 50,
    "Traps Likely Cause Bodily Harm": 95,
    "Theft Over - Bicycle": 30,
    "Set/Place Trap/Intend Death/Bh": 100,
    "B&E - M/Veh To Steal Firearm": 75,
    "Robbery To Steal Firearm": 90,
    "Hoax Terrorism Causing Bodily": 100
}

    

//function to calculate the crime score
function calcCrime(crimes, crime_date, crime_coords, current_coords ){
 let sumCrime = 0
 for (let crime of crimes){

    sumCrime += crime_values[crime] * 5/calcDate(crime_date) * current_coords.length(crime_coords)
 
 }  
 return sumCrime
}

// returns how long ago the crime took place in terms of weeks
function calcDate(crime_date){
now = new Date()
return Math.floor((crime_date - now)/ 1000*3600*7)
}