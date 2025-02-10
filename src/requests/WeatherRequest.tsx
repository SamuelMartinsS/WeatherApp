import data from "../data/weatherdata.json";

export default async function WeatherRequest(props) {
  try {
    //Make the request to the API "openweathermap.org"

    const apiKey = "b14cb78979ddc1030be86fd49e435186";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${props}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    // define the data that we are going to use
    let weeklyData = {};
    let dailyData = {};
    let perDayVariation = {};
    let temperatureEveryThreeHours = [8];
    let processedData = {};

    let tempDay = "";
    let tempIcon = "";
    let nrDays = 0;
    let maxTemp = 0;
    let minTemp = 0;
    let nextDay = true;

    // assign the data to the variables
    for (let i = 0; i < data.list.length; i++) {
      //check the day
      let [day, time] = data.list[i].dt_txt.split(" ");
      let icon = data.list[i].weather[0].icon;
      tempIcon = icon;

      //verify if the day is different from the previous day
      if (day !== tempDay) {
        //if the day is different from the previous day, we need to save the data of the previous day
        if (!nextDay) {
          let dailyData: { [key: string]: any } = {};
          dailyData["day"] = tempDay;
          dailyData["maxTemp"] = maxTemp;
          dailyData["minTemp"] = minTemp;
          dailyData["icon"] = icon;
          let constumeKey = `day${nrDays}`;
          weeklyData[constumeKey] = dailyData;
          perDayVariation[constumeKey] = temperatureEveryThreeHours;
          temperatureEveryThreeHours = [];
        }

        tempDay = day;
        nrDays += 1;

        //do the first reading of the day
        maxTemp = data.list[i].main.temp;
        minTemp = data.list[i].main.temp;
        temperatureEveryThreeHours.push(data.list[i].main.temp);

        nextDay = false;
      } else {
        //update the max and min temperature
        maxTemp =
          data.list[i].main.temp > maxTemp ? data.list[i].main.temp : maxTemp;
        minTemp =
          data.list[i].main.temp < minTemp ? data.list[i].main.temp : minTemp;
        temperatureEveryThreeHours.push(data.list[i].main.temp);
      }
    }

    //save the last day
    if (!nextDay) {
      let dailyData: { [key: string]: any } = {};
      dailyData["day"] = tempDay;
      dailyData["maxTemp"] = maxTemp;
      dailyData["minTemp"] = minTemp;
      dailyData["icon"] = tempIcon;
      let constumeKey = `day${nrDays}`;
      weeklyData[constumeKey] = dailyData;
      perDayVariation[constumeKey] = temperatureEveryThreeHours;
    }

    //ajust the first day of the week
    for (let i = perDayVariation["day1"].length; i < 8; i++) {
      perDayVariation["day1"].unshift(null);
    }

    console.log(perDayVariation);
    //get the names of the days of the week
    const today = new Date();
    const dayIndex = today.getDay();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const daysOfWeek = days.slice(dayIndex).concat(days.slice(0, dayIndex));

    //save the current data on the localstorage to prevent using the API too much
    processedData["weekly"] = weeklyData;
    processedData["daily"] = perDayVariation;
    processedData["names"] = daysOfWeek;
    processedData["city"] = data.city["name"];
    localStorage.setItem("weatherData", JSON.stringify(processedData));

    return true;
  } catch (error) {
    return false;
  }
}
