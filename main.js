let boatPrice = undefined;
let weeklyRate = undefined;

let boatPriceError = false;
let weeklyRateError = false;

const boatInputId = '#boat-price';
const weeklyInputId = '#weekly-charter-rate';

// "I want to enter the weekly Charter price of a boat ( 150,000.00 per week ) then divide by 7 to achieve the daily rate, then multiply by 0.6 then divide by the price ( or the cost of the boat ) "

function setResult(valid){
    console.log('valid ? ', valid)

    // Errors
    if (!valid) {
        $('#result').text('⛵');
        // Add shipwreck class if not already exists
        if(!$('#result').hasClass('shipwreck')){
            $('#result').addClass('shipwreck');
        }

    // No errors
    } else {
        // Remove shipwreck class if exists
        if($('#result').hasClass('shipwreck')){
            $('#result').removeClass('shipwreck');
        }
        const dailyRate = weeklyRate / 7;
        const result = (dailyRate * 0.6) / boatPrice;
        $('#result').text(result.toFixed(6));
    }
}

function checkErrors() {
    errClass = 'error';

    const boatPriceShouldError = boatPriceError || !boatPrice;
    const weeklyRateShouldError = weeklyRateError || !weeklyRate;

    // Check state of boatPrice error handling
    if(boatPriceShouldError && !$(boatInputId).hasClass(errClass)){
        $(boatInputId).addClass(errClass);
    } else if(!boatPriceShouldError && $(boatInputId).hasClass(errClass)){
        $(boatInputId).removeClass(errClass);
    }

    // Check state of weeklyRate error handling
    if(weeklyRateShouldError && !$(weeklyInputId).hasClass(errClass)){
        $(weeklyInputId).addClass(errClass);
    } else if(!weeklyRateShouldError && $(weeklyInputId).hasClass(errClass)){
        $(weeklyInputId).removeClass(errClass);
    }

    // If no errors
    if(!boatPriceShouldError && !weeklyRateShouldError) {
        console.log(`We good because boatPriceError: ${boatPriceError} and weeklyRateError: ${weeklyRateError}`)
        setResult(true);
    } else {
        setResult(false);
    }
}


$(document).ready(() => {

    $(boatInputId).keyup(
        e => {
            inputVal = $(boatInputId).val();

            if(isNaN(inputVal)) {
                boatPriceError = true;
                boatPrice = undefined;
            } else {
                boatPrice = inputVal;
                boatPriceError = false;
            }

            checkErrors();
            console.log(boatPrice);
        }
    )

    $('#weekly-charter-rate').keyup(
        e => {
            inputVal = $('#weekly-charter-rate').val();

            if(isNaN(inputVal)) {
                weeklyRateError = true;
                weeklyRate = undefined;
            } else {
                weeklyRate = inputVal;
                weeklyRateError = false;
            }

            checkErrors();
            console.log(weeklyRate);
        }
    )


});