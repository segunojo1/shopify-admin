//select all menus for popup
const profile = document.querySelector(".profile");
const notifications = document.querySelector(".notif");
const notifPopup = document.querySelector(".notif_popup");
const popup = document.querySelector(".profilee");
let menuItems, lastOpenedMenu = null;

//SET ARIA LABEL DEPENDING ON SCREEN SIZE
window.innerWidth < 720 ? profile.setAttribute('aria-label', 'DC') : profile.setAttribute('aria-label', 'Davi Collections');

//check if the alert or profile popup was clicked to show respective popups
document.addEventListener('click', (event) => {
  const clickedElement = event.target;
//if the profile menu was clicked
  if (clickedElement === profile || profile.contains(clickedElement)) {
    togglePopup(popup, profile);
    closePopup(notifPopup);
    lastOpenedMenu = profile;
  } else if (clickedElement === notifications || notifications.contains(clickedElement)) {//if the notiications popup was clicked
    togglePopup(notifPopup, notifications);
    closePopup(popup);
    lastOpenedMenu = notifications;
  } else {//if anywhere on the document was clicked close all open menus
    closePopup(popup);
    closePopup(notifPopup);
    lastOpenedMenu = null;
  }
});

//KEYBOARD ACCESSIBILITY
//
const menus = document.querySelector('.right_nav');
menus.addEventListener('keydown', (event) => {
  const keyCode = event.key;

  // Check if the Enter key is pressed when any of the menu is open
  if (keyCode === 'Enter' || keyCode === ' ') {
    console.log(event);
    //if the profile menu is focused
    if (document.activeElement === profile) {
      togglePopup(popup, profile);
      closePopup(notifPopup);
      lastOpenedMenu = profile;
    } else if (document.activeElement === notifications) {//if the notifications menu is active
      togglePopup(notifPopup, notifications);
      closePopup(popup);
      lastOpenedMenu = notifications;
    } else {//if none of the menus are active
      closePopup(popup);
      closePopup(notifPopup);
      lastOpenedMenu = null;
    }
  }

  // Check if the Escape key is pressed
  if (keyCode === "Escape") {
    console.log("esc pressed");
    closePopup(popup);
    closePopup(notifPopup);
    if (lastOpenedMenu) {
      lastOpenedMenu.focus();
    }
  } else if (keyCode === 'Home') {//check if the Home key is pressed
    if (menuItems.length > 0) {
      menuItems[0].focus();
    }

    // Check if the End key is pressed
  } else if (keyCode === 'End') {
    if (menuItems.length > 0) {
      menuItems[menuItems.length - 1].focus();
    }
  }
  else if (keyCode.length === 1) {
    // Convert the typed character to lowercase for case-insensitive comparison
    const typedChar = keyCode.toLowerCase();

    // Find the next menu item whose name starts with the typed character
    const currentIndex = Array.from(menuItems).findIndex(item => item.innerText.trim().toLowerCase().startsWith(typedChar));

    if (currentIndex !== -1) {
      menuItems[currentIndex].focus();
    }
  }
});

//close or open popup
const togglePopup = (popupp, triggerElement) => {
  const isOpen = popupp.classList.toggle("active_popup");

  triggerElement.setAttribute("aria-expanded", isOpen ? "true" : "false");

  if (popupp == popup) {
    if (isOpen) {
      menuItems = popupp.querySelectorAll('[role="menuitem"]');
      if (menuItems) {
        menuItems.item(1).focus();
      }

      menuItems.forEach((item, index) => {
        item.addEventListener('keydown', (e) => handleKeyPress(e, index))
      })
    }
  };
}

//close the popup
const closePopup = (popup) => {
  popup.classList.remove("active_popup");
  console.log(popup);
};

//keyboad accessibility within the menu
const handleKeyPress = (e, index) => {
  const isFirstItem = index === 1;
  const isLastItem = index === menuItems.length - 1;
  let nextItem = menuItems.item(index + 1);
  let prevItem = menuItems.item(index - 1);
  if (e.key == 'ArrowRight' || e.key == "ArrowDown") {
    if (isLastItem) {
      menuItems.item(1).focus();
      return;
    }
    if (index == 6) {
      nextItem = menuItems.item(index + 2);
    }
    console.log(nextItem);
    nextItem.focus();
  } else if (e.key == 'ArrowLeft' || e.key == 'ArrowUp') {
    if (isFirstItem) {
      menuItems.item(menuItems.length - 1).focus();
      return;
    }
    if (index == 8) {
      prevItem = menuItems.item(index - 2);
    }
    prevItem.focus();
  }
}

//if arrowdown is clicked open popup
profile.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' && !popup.classList.contains("active_popup")) {
    togglePopup(popup, profile);
  }
});

//if arrow up is clicked close it
notifications.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' && !notifPopup.classList.contains("active_popup")) {
    togglePopup(notifPopup, notifications);
  }
});

//MAIN ACCORDION
const dropDownIcon = document.querySelector(".img_div");
const dropDownContent = document.querySelector(".accord_list");

//Keyboard accessibility for the accordion
const accordion = document.querySelectorAll(".accord_title");
accordion.forEach(accord => {

  accord.addEventListener('keyup', (e) => {
    let keCode = e.which;
    console.log(keCode);
    switch (keCode) {
      case 38:
        // The up arrow was pressed
        // If the focused accordion is open, you should close it now

        if (accord.getAttribute("aria-expanded") == 'true') {
          accord.setAttribute("aria-expanded", 'false')
          accord.parentNode.parentNode.parentNode.classList.remove("list__active");
          accord.parentNode.parentNode.parentNode.classList.add("accord_list_list");
          console.log('up arrow');
        }
        e.preventDefault(); // prevent the page from scrolling
        break;
      case 40:
        // The down key was pressed
        // If the focused accordion is closed, you should open it now
        accordion.forEach(mainaccord => {
          if (accord.getAttribute("aria-expanded") == 'false') {
            if (mainaccord != accord) {
              mainaccord.setAttribute("aria-expanded", 'false')
              mainaccord.parentNode.parentNode.parentNode.classList.remove("list__active");
              mainaccord.parentNode.parentNode.parentNode.classList.add("accord_list_list");
            } else {

              accord.setAttribute("aria-expanded", 'true')
              accord.parentNode.parentNode.parentNode.classList.add("list__active");
              accord.parentNode.parentNode.parentNode.classList.remove("accord_list_list");
              console.log('up arrow');
            }
          }
        })
        e.preventDefault(); // prevent the page from scrolling
        break;
      case 13: case 32:
        // Either the enter key or space bar was pressed
        // You should toggle the focused accordion.
        // If it is open, close it now; if it is closed, open it now.
        if (accord.getAttribute("aria-expanded") == 'false') {
          accordion.forEach(mainaccord => {
            if (mainaccord != accord) {
              mainaccord.setAttribute("aria-expanded", 'false')
              mainaccord.parentNode.parentNode.parentNode.classList.remove("list__active");
              mainaccord.parentNode.parentNode.parentNode.classList.add("accord_list_list");
            } else {
              console.log('hola');
              accord.setAttribute("aria-expanded", 'true')
              accord.parentNode.parentNode.parentNode.classList.add("list__active");
              accord.parentNode.parentNode.parentNode.classList.remove("accord_list_list");
              console.log('up arrow');
              return;
            }
          })
        } else {
          accord.setAttribute("aria-expanded", 'false')
          accord.parentNode.parentNode.parentNode.classList.remove("list__active");
          accord.parentNode.parentNode.parentNode.classList.add("accord_list_list");
        }
        e.preventDefault(); // Prevent the page from scrolling
        break;
      case 35:
        // The end key was pressed
        // You should move focus to the last accordion on the page now
        console.log('end');
        accordion[4].focus();
        e.preventDefault(); // Prevent the page from scrolling
        break;
      case 36:
        // The home key was pressed
        // You should move focus to the first accordion on the page now
        accordion[0].focus();
        e.preventDefault(); // Prevent the page from scrolling
        break;
      default:
        break;
    }
  })
})

//DISMISS PRICING PLAN
const closePlan = document.querySelector(".close_btn");
const plan = document.querySelector('.plan');
closePlan.addEventListener('click', () => {
  plan.classList.add('plan_hidden');
})

//OPEN/CLOSE MAIN ACCORDION WHEN ICON IS CLICKED
dropDownIcon.addEventListener("click", () => {
  dropDownIcon.classList.toggle("accord_drop_active")
  dropDownContent.classList.toggle("accord_list_active");
  if (dropDownIcon.ariaExpanded == 'false') {
    dropDownIcon.ariaExpanded = 'true';
    console.log("now expanded");
  } else {
    dropDownIcon.ariaExpanded = 'false';
    console.log("now collapsed");
  }
})


//KEYBOARD ACCESSIBILITY
//OPEN/CLOSE MAIN ACCORDION FOR KEYBOARD
dropDownIcon.addEventListener("keyup", (e) => {
  const keyCode = e.key;

  if (keyCode === 'Enter' || keyCode === ' ') {
    dropDownIcon.classList.toggle("accord_drop_active")
    dropDownContent.classList.toggle("accord_list_active");
    if (dropDownIcon.ariaExpanded == 'false') {
      dropDownIcon.ariaExpanded = 'true';
    } else {
      dropDownIcon.ariaExpanded = 'false';
    }
  }
})


const checkIcon = document.querySelectorAll(".accord_check");

const progressText = document.querySelector(".accord_progress p");
const progressBar = document.querySelector(".main_progress");
let newChecked;
const parentCheck = document.querySelectorAll(".lii");
const titleCheck = document.querySelectorAll(".accord_title")

//CHECK IF ANY OF THE ACCORDION ITEMS WAS CLICKED
titleCheck.forEach(pa => {
  pa.addEventListener("click", (e) => {
    titleCheck.forEach((checkk, i) => {
      // if (!newChecked) {
      if (checkk != pa) {
        checkk.setAttribute('aria-expanded', 'false');
        checkk.parentNode.parentNode.parentNode.classList.remove("list__active");
        checkk.parentNode.parentNode.parentNode.classList.add("accord_list_list");
        console.log(checkk.parentNode.parentNode.parentNode.getAttribute("aria-expanded"));
        console.log(checkk.parentNode.parentNode.parentNode);
      }
      // }
    })

    console.log('clicked');
    e.currentTarget.setAttribute('aria-expanded', 'true');
    e.currentTarget.parentNode.parentNode.parentNode.classList.add("list__active");
    e.currentTarget.parentNode.parentNode.parentNode.classList.remove("accord_list_list");
  });

})

let completedCount = 0;
const uncompletedCheck = document.querySelectorAll(".uncompleted-check");
const loadingCheck = document.querySelectorAll(".loading-check");
const completedCheck = document.querySelectorAll(".completed-check");
const shoppingStatus = document.querySelectorAll("#shopping-status");

//CHECK IF ANY OF THE CHECKBOX WAS CLICKED
checkIcon.forEach((check, i) => {

  check.addEventListener('click', (e) => {

    const grandParent = check.parentNode.parentNode;

    let checkedIndex = i + 1;
    console.log(checkedIndex);
    let nextParent = parentCheck[checkedIndex];

    console.log();
    const checkIfButtonIsNotChecked = () => {

      //IF IT IS NOW UNCHECKED
      if (newChecked == 'false') {
        console.log("not checked oo");
        checkIcon.forEach((checkk, i) => {
          if (checkk != check) {
            checkk.parentNode.parentNode.classList.remove("list__active");
            checkk.parentNode.parentNode.classList.add("accord_list_list");
            checkk.nextElementSibling.firstElementChild.setAttribute('aria-expanded', 'false');
          }
        })
        grandParent.classList.toggle("list__active");
        grandParent.classList.toggle("accord_list_list");
        check.nextElementSibling.firstElementChild.setAttribute('aria-expanded', 'true');
      } else {//IF IT'S NOW UNCHECKED

        if (checkedIndex < 5) {
          checkIcon.forEach((checkk, i) => {
            if (checkk.parentNode.parentNode != nextParent) {
              checkk.parentNode.parentNode.classList.remove("list__active");
              checkk.parentNode.parentNode.classList.add("accord_list_list");
              checkk.nextElementSibling.firstElementChild.setAttribute('aria-expanded', 'false');
            }
          })

          //LOOP THROUGH TO MAKE SURE ONLY UNCHEKED ITEMS ARE OPENED NEXT
          for (let index = 0; index < 5; index++) {
            if (nextParent.childNodes[1].childNodes[3].classList.contains("done-check")) {
              if (checkedIndex >= 5) {
                checkedIndex = 0;
                console.log('equal/greater than 5');
              }
              checkedIndex++;
              nextParent = parentCheck[checkedIndex];
              console.log('hi');
            } else {
              break;
            }
          }
          nextParent.classList.toggle('list__active');
          nextParent.classList.toggle('accord_list_list');
          nextParent.childNodes[1].childNodes[3].firstElementChild.setAttribute("aria-expanded", 'true')
        } else {
          grandParent.classList.remove("list__active");
          grandParent.classList.add("accord_list_list");
        }
      }
    }

    //SET AN ITEM AS CHECKED
    const handleDoneCheck = () => {
      uncompletedCheck.forEach(chec => {
        if (chec.parentNode == check) {
          console.log(chec.parentNode);
          chec.classList.add("check-hidden");
        }
      })
      loadingCheck.forEach(chec => {
        if (chec.parentNode == check) {
          chec.classList.remove("check-hidden");
        }
      })
      console.log('done');
      shoppingStatus.ariaLabel = "Loading, please wait.."
      setTimeout(() => {
        loadingCheck.forEach(chec => {
          if (chec.parentNode == check) {
            chec.classList.add("check-hidden");
          }
        })
        completedCheck.forEach(chec => {
          if (chec.parentNode == check) {
            chec.classList.remove("check-hidden");
          }
        })
        check.classList.add("done-check");
        check.ariaLabel = check.ariaLabel.replace("as done", "as not done");
        newChecked = 'true';
        checkForProgressBar();
        updateProgress();
        checkIfButtonIsNotChecked();
        shoppingStatus.ariaLabel = "Successfully marked customize your online store as done"
      }, 1000)
    }

    //SET ACCORDION ITEM AS UNCHECKED
    const handleUndoneCheck = () => {
      completedCheck.forEach(chec => {
        if (chec.parentNode == check) {
          chec.classList.add("check-hidden");
        }
      })
      loadingCheck.forEach(chec => {
        if (chec.parentNode == check) {
          chec.classList.remove("check-hidden");
        }
      })
      shoppingStatus.ariaLabel = "Loading, please wait.."
      console.log('undone');
      setTimeout(() => {
        loadingCheck.forEach(chec => {
          if (chec.parentNode == check) {
            chec.classList.add("check-hidden");
          }
        })
        uncompletedCheck.forEach(chec => {
          if (chec.parentNode == check) {
            chec.classList.remove("check-hidden");
          }
        })
        check.classList.remove("done-check");
        check.ariaLabel = check.ariaLabel.replace("as not done", "as done");
        newChecked = 'false';
        checkForProgressBar();
        updateProgress();
        checkIfButtonIsNotChecked();
        shoppingStatus.ariaLabel = "Successfully marked customize your online store as not done"
      }, 1000)
    }

    //WHEN AN ICON IS CLICKED CHECK IF IT IS CHECKED OR UNCHECKED
    const handleDoneOrUndone = () => {
      const markedAsDone = check.classList.contains("done-check");
      if (markedAsDone) {
        handleUndoneCheck()
      } else {
        handleDoneCheck()
      }
    }

    handleDoneOrUndone();

    //HANDLES INCREASE/DECREASE OF PROGRESS BAR COUNT
    const checkForProgressBar = () => {
      if (newChecked === 'true') {
        completedCount++;
      } else {
        completedCount--;
      }
    }

  })
})


//THIS HANDLES LOGIC FOR INCREASING/DECREASING PROGRESS BAR
function updateProgress() {
  const totalItems = checkIcon.length;
  const progressPercentage = (completedCount / totalItems) * 100;

  progressText.textContent = `${completedCount} / ${totalItems} completed`;
  progressBar.style.width = `${progressPercentage}%`;
  if (progressPercentage == 100) {
    progressBar.style.borderTopRightRadius = '2px';
    progressBar.style.borderBottomRightRadius = '2px';
  } else {
    progressBar.style.borderTopRightRadius = '0px';
    progressBar.style.borderBottomRightRadius = '0px';
  }
}