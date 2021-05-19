content = document.getElementById("content")
results = document.getElementById("results")

haveToWakeUpResult = document.getElementById("haveToWakeUpResult")
sleepNowResult = document.getElementById("sleepNowResult")
planToSleepResult = document.getElementById("planToSleepResult")

haveToWakeUpBtn = document.getElementById("haveToWakeUpBtn")
planToSleepBtn = document.getElementById("planToSleepBtn")
sleepNowBtn = document.getElementById("sleepNowBtn")

haveToWakeUpHour = document.getElementById("haveToWakeUpHour")
haveToWakeUpMinute = document.getElementById("haveToWakeUpMinute")
haveToWakeUpAMorPM = document.getElementById("haveToWakeUpAMorPM")

planToSleepHour = document.getElementById("planToSleepHour")
planToSleepMinute = document.getElementById("planToSleepMinute")
planToSleepAMorPM = document.getElementById("planToSleepAMorPM")

createOptions(haveToWakeUpHour, haveToWakeUpMinute, haveToWakeUpAMorPM)
createOptions(planToSleepHour, planToSleepMinute, planToSleepAMorPM)

function createOptions(optionNameHour, optionNameMinute, optionNameAMorPM) {
    hourText = document.createElement("option")
    hourText.innerHTML = "Hour"
    optionNameHour.appendChild(hourText)
    minuteText = document.createElement("option")
    minuteText.innerHTML = "Minute"
    optionNameMinute.appendChild(minuteText)
    AMText = document.createElement("option")
    AMText.innerHTML = "AM"
    optionNameAMorPM.appendChild(AMText)
    PMText = document.createElement("option")
    PMText.innerHTML = "PM"
    optionNameAMorPM.appendChild(PMText)

    for (i = 1; i <= 12; i++) {
        hourOption = document.createElement("option")
        hourOptionNum = document.createTextNode(i)
        hourOption.appendChild(hourOptionNum)
        optionNameHour.appendChild(hourOption)
    }

    for (j = 0; j <= 11; j++) {
        minuteOption = document.createElement("option")
        // To output like 2:05 not 2:5
        x = j <= 1 ? "0" + String(j * 5) : j * 5
        minuteOptionNum = document.createTextNode(x)

        minuteOption.appendChild(minuteOptionNum)
        optionNameMinute.appendChild(minuteOption)
    }
}

function calculateHaveToWakeUpResult(subtractedTime) {
    hourIndex = haveToWakeUpHour.selectedIndex
    hourText = haveToWakeUpHour.options[hourIndex].text
    hourInt = Number(hourText)
    minuteIndex = haveToWakeUpMinute.selectedIndex
    minuteText = haveToWakeUpMinute.options[minuteIndex].text
    minuteInt = Number(minuteText)
    AMorPMIndex = haveToWakeUpAMorPM.selectedIndex
    AMorPMText = haveToWakeUpAMorPM.options[AMorPMIndex].text

    selectedTimeConverted = hourInt * 60 + minuteInt
    resultConverted = selectedTimeConverted - subtractedTime

    if (selectedTimeConverted >= subtractedTime && selectedTimeConverted < 720) {
        if ((resultConverted % 60) < 10) {
            result = String(Math.floor(resultConverted / 60)) + ":" + "0" + String(resultConverted % 60) + AMorPMText
        }
        else {
            result = String(Math.floor(resultConverted / 60)) + ":" + String(resultConverted % 60) + AMorPMText
        }
    }
    else if (selectedTimeConverted < subtractedTime) {
        AMorPmSwitched = (AMorPMText == "AM") ? "PM" : "AM"
        if (((720 + resultConverted) % 60) < 10) {
            result = String(Math.floor((720 + resultConverted) / 60)) + ":" + "0" + String((720 + resultConverted) % 60) + AMorPmSwitched
        }
        else {
            result = String(Math.floor((720 + resultConverted) / 60)) + ":" + String((720 + resultConverted) % 60) + AMorPmSwitched
        }
    }
    else {
        AMorPmSwitched = (AMorPMText == "AM") ? "PM" : "AM"
        if ((resultConverted % 60) < 10) {
            result = String(Math.floor(resultConverted / 60)) + ":" + "0" + String(resultConverted % 60) + AMorPmSwitched
        }
        else {
            result = String(Math.floor(resultConverted / 60)) + ":" + String(resultConverted % 60) + AMorPmSwitched
        }
    }
    // When result == 0:??
    result = (result.split(":")[0] == "0") ? "12:" + result.split(":")[1] : result
    return result
}

function loadHaveToWakeUpResult() {
    hourIndex = haveToWakeUpHour.selectedIndex
    hourText = haveToWakeUpHour.options[hourIndex].text
    minuteIndex = haveToWakeUpMinute.selectedIndex
    minuteText = haveToWakeUpMinute.options[minuteIndex].text
    AMorPMIndex = haveToWakeUpAMorPM.selectedIndex
    AMorPMText = haveToWakeUpAMorPM.options[AMorPMIndex].text
    
    if (hourIndex == 0 && minuteIndex == 0) {
        alert("Please select an hour and a minute before trying to calculate!")
        return
    }
    else if (hourIndex != 0 && minuteIndex == 0) {
        alert("Please select a minute before trying to calculate!")
        return
    }
    else if (hourIndex == 0 && minuteIndex != 0) {
        alert("Please select an hour before trying to calculate!")
        return
    }
    else {
        advice = document.createElement("p")
        advice.innerHTML = "<br>You should try to fall asleep at one of the following times:"
        haveToWakeUpResult.appendChild(advice)
        for (i = 0; i < 4; i++) {
            result = calculateHaveToWakeUpResult(540 - (i * 90))
            span = document.createElement("span")
            span.innerHTML = result
            haveToWakeUpResult.appendChild(span)
            if (i < 3) {
                italic = document.createElement("i")
                italic.innerHTML = " or "
                haveToWakeUpResult.appendChild(italic)
            }
        }

        backToHomepage = document.createElement("div")
        calculateAgain = document.createElement("a")
        calculateAgain.innerHTML = "Calculate Again"
        calculateAgain.href = "sleepytime_clone.html"
        calculateAgain.setAttribute("class", "calculateAgain")
        backToHomepage.appendChild(calculateAgain)
        haveToWakeUpResult.appendChild(backToHomepage)

        content.style.display = "none"
    }
}

function calculatePlanToSleepResult(addedTime) {
    hourIndex = planToSleepHour.selectedIndex
    hourText = planToSleepHour.options[hourIndex].text
    hourInt = Number(hourText)
    minuteIndex = planToSleepMinute.selectedIndex
    minuteText = planToSleepMinute.options[minuteIndex].text
    minuteInt = Number(minuteText)
    AMorPMIndex = planToSleepAMorPM.selectedIndex
    AMorPMText = planToSleepAMorPM.options[AMorPMIndex].text

    selectedTimeConverted = hourInt * 60 + minuteInt
    resultConverted = selectedTimeConverted + addedTime

    if (resultConverted < 720) {
        if ((resultConverted % 60) < 10) {
            result = String(Math.floor(resultConverted / 60)) + ":" + "0" + String(resultConverted % 60) + AMorPMText
        }
        else {
            result = String(Math.floor(resultConverted / 60)) + ":" + String(resultConverted % 60) + AMorPMText
        }
    }
    else if (selectedTimeConverted >= 720) {
        if ((resultConverted % 60) < 10) {
            result = String(Math.floor((resultConverted - 720) / 60)) + ":" + "0" + String((resultConverted - 720) % 60) + AMorPMText
        }
        else {
            result = String(Math.floor((resultConverted - 720) / 60)) + ":" + String((resultConverted - 720) % 60) + AMorPMText
        }
    }
    else {
        AMorPmSwitched = (AMorPMText == "AM") ? "PM" : "AM"
        if ((resultConverted % 60) < 10) {
            result = String(Math.floor((resultConverted - 720) / 60)) + ":" + "0" + String((resultConverted - 720) % 60) + AMorPmSwitched
        }
        else {
            result = String(Math.floor((resultConverted - 720) / 60)) + ":" + String((resultConverted - 720) % 60) + AMorPmSwitched
        }
    }
    // When result == 0:??
    result = (result.split(":")[0] == "0") ? "12:" + result.split(":")[1] : result
    return result
}

function loadPlanToSleepResult() {
    hourIndex = planToSleepHour.selectedIndex
    hourText = planToSleepHour.options[hourIndex].text
    minuteIndex = planToSleepMinute.selectedIndex
    minuteText = planToSleepMinute.options[minuteIndex].text
    AMorPMIndex = planToSleepAMorPM.selectedIndex
    AMorPMText = planToSleepAMorPM.options[AMorPMIndex].text

    if (hourIndex == 0 && minuteIndex == 0) {
        alert("Please select an hour and a minute before trying to calculate!")
        return
    }
    else if (hourIndex != 0 && minuteIndex == 0) {
        alert("Please select a minute before trying to calculate!")
        return
    }
    else if (hourIndex == 0 && minuteIndex != 0) {
        alert("Please select an hour before trying to calculate!")
        return
    }
    else {
        advice = document.createElement("p")
        advice.innerHTML = `<br>If you fall asleep at ${hourText}:${minuteText} ${AMorPMText}, you should try to wake up at one of the following times:`
        planToSleepResult.appendChild(advice)
        for (i = 0; i < 6; i++) {
            result = calculatePlanToSleepResult(90 + (i * 90))
            span = document.createElement("span")
            span.innerHTML = result
            planToSleepResult.appendChild(span)
            if (i < 5) {
                italic = document.createElement("i")
                italic.innerHTML = " or "
                planToSleepResult.appendChild(italic)
            }
        }
        backToHomepage = document.createElement("div")
        calculateAgain = document.createElement("a")
        calculateAgain.innerHTML = "Calculate Again"
        calculateAgain.href = "sleepytime_clone.html"
        calculateAgain.setAttribute("class", "calculateAgain")
        backToHomepage.appendChild(calculateAgain)
        planToSleepResult.appendChild(backToHomepage)

        content.style.display = "none"
    }
}

function calculateSleepNowResult(addedTime) {
    date = new Date()
    hourInt = date.getHours()
    minuteInt = date.getMinutes()

    AMorPMText = hourInt < 12 ? "AM" : "PM"

    hourInt = hourInt < 13 ? hourInt : hourtInt - 12

    selectedTimeConverted = hourInt * 60 + minuteInt
    resultConverted = selectedTimeConverted + addedTime

    if (resultConverted < 720) {
        if ((resultConverted % 60) < 10) {
            result = String(Math.floor(resultConverted / 60)) + ":" + "0" + String(resultConverted % 60) + AMorPMText
        }
        else {
            result = String(Math.floor(resultConverted / 60)) + ":" + String(resultConverted % 60) + AMorPMText
        }
    }
    else if (selectedTimeConverted >= 720) {
        if ((resultConverted % 60) < 10) {
            result = String(Math.floor((resultConverted - 720) / 60)) + ":" + "0" + String((resultConverted - 720) % 60) + AMorPMText
        }
        else {
            result = String(Math.floor((resultConverted - 720) / 60)) + ":" + String((resultConverted - 720) % 60) + AMorPMText
        }
    }
    else {
        AMorPmSwitched = (AMorPMText == "AM") ? "PM" : "AM"
        if ((resultConverted % 60) < 10) {
            result = String(Math.floor((resultConverted - 720) / 60)) + ":" + "0" + String((resultConverted - 720) % 60) + AMorPmSwitched
        }
        else {
            result = String(Math.floor((resultConverted - 720) / 60)) + ":" + String((resultConverted - 720) % 60) + AMorPmSwitched
        }
    }
    // When result == 0:??
    result = (result.split(":")[0] == "0") ? "12:" + result.split(":")[1] : result
    return result
}

function loadSleepNowResult() {
    date = new Date()
    hourInt = date.getHours()
    minuteInt = date.getMinutes()

    AMorPMText = hourInt < 12 ? "AM" : "PM"
    hourInt = hourInt > 12 ? hourInt - 12 : hourtInt
    hourText = String(hourInt)
    minuteText = minuteInt < 10 ? minuteText = "0" + String(minuteInt) : minuteText = String(minuteInt)

    advice = document.createElement("p")
    advice.innerHTML = "<br>If you head to bed right now, you should try to wake up at one of the following times:"
    sleepNowResult.appendChild(advice)
    for (i = 0; i < 6; i++) {
        result = calculateSleepNowResult(90 + (i * 90))
        span = document.createElement("span")
        span.innerHTML = result
        sleepNowResult.appendChild(span)
        if (i < 5) {
            italic = document.createElement("i")
            italic.innerHTML = " or "
            sleepNowResult.appendChild(italic)
        }
    }

    backToHomepage = document.createElement("div")
    calculateAgain = document.createElement("a")
    calculateAgain.innerHTML = "Calculate Again"
    calculateAgain.href = "sleepytime_clone.html"
    calculateAgain.setAttribute("class", "calculateAgain")
    backToHomepage.appendChild(calculateAgain)
    sleepNowResult.appendChild(backToHomepage)

    content.style.display = "none"
}

function init() {
    haveToWakeUpBtn.addEventListener("click", loadHaveToWakeUpResult)
    planToSleepBtn.addEventListener("click", loadPlanToSleepResult)
    sleepNowBtn.addEventListener("click", loadSleepNowResult)
    content.style.display = "initial"

    array = results.children
    for (i = 0; i < array.length; i++) {
        child = array[i]
        while (child.hasChildNodes()) {
            child.removeChild(child.lastChild);
        }
    }
}

init()