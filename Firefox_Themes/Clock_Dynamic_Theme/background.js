let currentThemeHour = '';
let currentThemeMinute = '';

let theme = {
    "images": {
      "theme_frame": "empty.png",
      "additional_backgrounds": [ "empty.png", "empty.png"]
    },
    "properties": {
      "additional_backgrounds_alignment": [ "right top" , "right top" ]
    },
    "colors": {
      "bookmark_text": "rgb(71, 71, 71)",
      "frame": "rgb(210, 210, 210)",
      "frame_inactive": "rgb(244, 244, 244)",
      "tab_line": "rgb(250, 250, 250)",
      "tab_background_text": "black",
      "toolbar_field": "rgb(250, 250, 250)",
      "toolbar_field_text": "black",
      "toolbar_field_highlight_text": "black",
      "toolbar_field_border": "rgb(167,167,167)",
      "popup": "rgb(250, 250, 250)",
      "popup_text": "rgb(71, 71, 71)"
    }
};

function setTheme(currentHour, currentMinute) {
  if (currentThemeHour === currentHour
        && currentThemeMinute === currentMinute) {
    // No point in changing the theme if it has already been set.
    return;
  }
  currentThemeHour === currentHour;
  currentThemeMinute === currentMinute;
  theme.images.additional_backgrounds[0] = currentHour;
  theme.images.additional_backgrounds[1] = currentMinute;
  browser.theme.update(theme);
}


function checkTime() {
  const date = new Date();
  // A Number, from 0 to 23, representing the hour
  let hour = date.getHours() % 12; // convert to 0 - 11
  if (hour === 0) {
    hour = 12; // convert to 1 - 12
  }
  const currentHour = './hours/' + hour + '.png'
  // A Number, from 0 to 59, representing the hour
  // convert to 5 10 15 ...
  let minute = parseInt(date.getMinutes() / 5) * 5; 
  const currentMinute = './minutes/' + minute + '.png'
  setTheme(currentHour, currentMinute);
}

// On start up, check the time to see what theme to show.
checkTime();

// Set up an alarm to check this regularly.
browser.alarms.onAlarm.addListener(checkTime);
browser.alarms.create('checkTime', {periodInMinutes: 1});