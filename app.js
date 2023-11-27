// // Your javascript goes here
// const profile = document.querySelector(".profile");
// // const profileId = document.getElementById("prof");
// const notifications = document.querySelector(".notif");
// const notifPopup = document.querySelector(".notif_popup");
// const popup = document.querySelector(".profilee");
// const menuItems = popup.querySelectorAll('[role="menuitem"]');
// const notificationItems = notifPopup.querySelectorAll('[role="menuitem"]');

// const closePopup = (popup, items, profile) => {
//   //closes the menu
//   popup.classList.toggle("active_popup");
//   items.item(0).blur();
//   profile.focus();
//   profile.ariaExpanded = "false"
// }

// const openPopup = (popup, items, profile) => {
//   //opens the popup
//   const otherPopup = profile === notifications ? popup : notifPopup;
//   const otherItems = profile === notifications ? menuItems : notificationItems;

//   closePopup(otherPopup, otherItems, profile);
//   popup.classList.toggle("active_popup");
//   items.item(0).focus();
//   profile.ariaExpanded = "true";
// }

// //check if Dvia Collections is expanded 
// let isExpanded;
// const remFoc = (popup,items, profile) => {
// isExpanded = profile.attributes["aria-expanded"].value === "true";
//   //this toggles the popup and either focuses or blur it

//   if (isExpanded) {
//     closePopup(popup, items, profile);
//     // document.addEventListener('click', (event) => {
//     //   if (!profile.contains(event.target)) {
//     //       closePopup(popup, items, profile);
//     //   }
//     // });
//   } else {
//     openPopup(popup, items, profile);
//     popup.addEventListener("keyup", (e) => handleKeyPress(e, popup, items, profile));
//   }


//   console.log(isExpanded);
// }


// const handleKeyPress = (e, popup, items, profile) => {
//   isExpanded = profile.attributes["aria-expanded"].value === "true";
//   //handle esc key press
//   if (e.key == "Escape") {
//     if(isExpanded) 
//     {
//       closePopup(popup, items, profile);
//     }
//   }
// }



// profile.addEventListener('click', () => remFoc(popup, menuItems, profile));
// notifications.addEventListener('click', () => remFoc(notifPopup, notificationItems, notifications))



const profile = document.querySelector(".profile");
const notifications = document.querySelector(".notif");
const notifPopup = document.querySelector(".notif_popup");
const popup = document.querySelector(".profilee");
let menuItems, lastOpenedMenu = null;

document.addEventListener('click', (event) => {
  const clickedElement = event.target;

  if (clickedElement === profile || profile.contains(clickedElement)) {
    togglePopup(popup, profile);
    closePopup(notifPopup);
    console.log('profile clicked');
    lastOpenedMenu = profile;
  } else if (clickedElement === notifications || notifications.contains(clickedElement)) {
    togglePopup(notifPopup, notifications);
    closePopup(popup);
    console.log('notif clicked');
    lastOpenedMenu = notifications;
  } else {
    closePopup(popup);
    closePopup(notifPopup);
    // console.log(event);
    console.log('none of them clicked');
    lastOpenedMenu = null;
  }
});

// document.addEventListener('keyup', (e) => {
//   const codee = e.key;

//   if (codee == 'Tab') {
//     menuItems.forEach(men => {
//       men.onblur(() => closePopup(popup))
//     })
//     if (popup) {
//       console.log;
//     }
//   }
// })

const menus = document.querySelector('.right_nav');
menus.addEventListener('keydown', (event) => {
  const keyCode = event.key;

  // Check if the Enter key is pressed
  if (keyCode === 'Enter' || keyCode === ' ') {
    console.log(event);
    if (document.activeElement === profile) {
      togglePopup(popup, profile);
      closePopup(notifPopup);
      lastOpenedMenu = profile;
    } else if (document.activeElement === notifications) {
      togglePopup(notifPopup, notifications);
      closePopup(popup);
      lastOpenedMenu = notifications;
    } else {
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
  } else if (keyCode === 'Home') {
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

profile.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' && !popup.classList.contains("active_popup")) {
    togglePopup(popup, profile);
  }
});

notifications.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' && !notifPopup.classList.contains("active_popup")) {
    togglePopup(notifPopup, notifications);
  }
});

//code for the main accordion
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
            }else{

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
           }else{
            console.log('hola');
              accord.setAttribute("aria-expanded", 'true')
              accord.parentNode.parentNode.parentNode.classList.add("list__active");
            accord.parentNode.parentNode.parentNode.classList.remove("accord_list_list");
            console.log('up arrow');
            return;
           }
          })
         }else{
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

const closePlan = document.querySelector(".close_btn");
const plan = document.querySelector('.plan');
closePlan.addEventListener('click', () => {
  plan.classList.add('plan_hidden');
})

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

dropDownIcon.addEventListener("keyup", (e) => {
  const keyCode = e.key;

  if (keyCode === 'Enter' || keyCode === ' ') {
  dropDownIcon.classList.toggle("accord_drop_active")
  dropDownContent.classList.toggle("accord_list_active");
  if (dropDownIcon.ariaExpanded == 'false') {
    dropDownIcon.ariaExpanded = 'true';
    console.log("now expanded");
  } else {
    dropDownIcon.ariaExpanded = 'false';
    console.log("now collapsed");
  }
}
})
const checkIcon = document.querySelectorAll(".accord_check");

const progressText = document.querySelector(".accord_progress p");
const progressBar = document.querySelector(".main_progress");
let newChecked;
const parentCheck = document.querySelectorAll(".lii");
const titleCheck = document.querySelectorAll(".accord_title")
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
const shoppingStatus  = document.querySelectorAll("#shopping-status");
checkIcon.forEach((check, i) => {
  
  check.addEventListener('click', (e) => {

    const grandParent = check.parentNode.parentNode;
    
    let checkedIndex = i + 1;
    console.log(checkedIndex);
    let nextParent = parentCheck[checkedIndex];
    
    console.log();
    const checkIfButtonIsNotChecked = () => {

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
      }else{
        
        if (checkedIndex < 5) {
          checkIcon.forEach((checkk, i) => {
            if (checkk.parentNode.parentNode != nextParent) {
              checkk.parentNode.parentNode.classList.remove("list__active");
              checkk.parentNode.parentNode.classList.add("accord_list_list");
              checkk.nextElementSibling.firstElementChild.setAttribute('aria-expanded', 'false');
            }
          })
          
          console.log("i'm toggling oo");
          console.log(nextParent.childNodes[1].childNodes[3])
          for (let index = 0; index < 5; index++) {
            if (nextParent.childNodes[1].childNodes[3].classList.contains("done-check")) {
              if (checkedIndex >= 5) {
                checkedIndex = 0;
                console.log('equal/greater than 5');
              }
              checkedIndex++;
              nextParent = parentCheck[checkedIndex];
              console.log('hi');
            }else{
              break;
            }
          }
          nextParent.classList.toggle('list__active');
          nextParent.classList.toggle('accord_list_list');
         nextParent.childNodes[1].childNodes[3].firstElementChild.setAttribute("aria-expanded", 'true')
        }else{
          grandParent.classList.remove("list__active");
          grandParent.classList.add("accord_list_list");
        }
      }
    }

    const handleDoneCheck = () => {
      uncompletedCheck.forEach(chec => {
        if(chec.parentNode == check)
        {
          console.log(chec.parentNode);
          chec.classList.add("check-hidden");
        }
      })
      loadingCheck.forEach(chec => {
        if(chec.parentNode == check)
        {
          chec.classList.remove("check-hidden");
        }
      })
        console.log('done');
        shoppingStatus.ariaLabel = "Loading, please wait.."
        setTimeout(() => {
          loadingCheck.forEach(chec => {
            if(chec.parentNode == check)
            {
              chec.classList.add("check-hidden");
            }
          })
          completedCheck.forEach(chec => {
            if(chec.parentNode == check)
            {
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
        },1000)
    }
    
    const handleUndoneCheck = () => {
      completedCheck.forEach(chec => {
        if(chec.parentNode == check)
        {
          chec.classList.add("check-hidden");
        }
      })
      loadingCheck.forEach(chec => {
        if(chec.parentNode == check)
        {
          chec.classList.remove("check-hidden");
        }
      })
        shoppingStatus.ariaLabel = "Loading, please wait.."
        console.log('undone');
        setTimeout(() => {
          loadingCheck.forEach(chec => {
            if(chec.parentNode == check)
            {
              chec.classList.add("check-hidden");
            }
          })
          uncompletedCheck.forEach(chec => {
            if(chec.parentNode == check)
            {
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
        },1000)
      }
      
      const handleDoneOrUndone = () => {
        const markedAsDone = check.classList.contains("done-check");
        if (markedAsDone) {
          handleUndoneCheck()
        }else{
          handleDoneCheck()
        }
      }

    handleDoneOrUndone();
    const checkForProgressBar = () => {
      if (newChecked === 'true') {
        completedCount++;
      } else {
        completedCount--;
      }
    }

    

 
      

  })
})


window.innerWidth < 720 ? profile.setAttribute('aria-label', 'DC')


function updateProgress() {
  const totalItems = checkIcon.length;
  const progressPercentage = (completedCount / totalItems) * 100;

  progressText.textContent = `${completedCount} / ${totalItems} completed`;
  progressBar.style.width = `${progressPercentage}%`;
  if (progressPercentage == 100) {
    progressBar.style.borderTopRightRadius = '2px';
    progressBar.style.borderBottomRightRadius = '2px';
  }else{
    progressBar.style.borderTopRightRadius = '0px';
    progressBar.style.borderBottomRightRadius = '0px';
  }
}