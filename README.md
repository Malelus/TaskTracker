# Task Tracker - keep track of your tasks!

> ### [Page link](https://malelus-task-tracker.netlify.app/)

---

#### The project was built using vite, frontend of the site was written in ReactJS and SCSS to write to CSS code, used icons from https://fontawesome.com/

- used fonts:
  - [Montserrat](https://fonts.google.com/specimen/Montserrat)

---

#### Structure:

- the website has been designed in a responsive way so that it can be used freely and comfortably on any device:

| Smartphone                                                  | Mobile                                                                                           |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| < 768px                                                     | >= 768px                                                                                         |
| View adapted for use on a smartphone (initial site design), | Mobile view, fixed navigation bar on top, fonts resize and fit of animations for larger screens, |

- open graph tags (page preview in pasted link) in the head of the page,

- button at the top of the page to change the theme of the page, and the selected theme is saved to local storage,

- create new task section is visible after pressing the button in header,

- if no tasks have been created a message indicating this is visible, otherwise tasks are visible,

- once a task is created, it is saved to local storage

- [nanoid](https://www.npmjs.com/package/nanoid) is used to generate an id for a task,

- once the task is created, it is possible to edit it without having to create it again for adjustment,

- each task has its current execution status and its priority which can be changed,

- after creating a task, it is possible to change its position relative to other tasks, for this [array-move](https://www.npmjs.com/package/array-move) is used,

- github links are located under the task list.

#### Look:

- changed scrollbar design,

- changed text selection design.

#### Extras:

- ability to disable completely the animations present on the page.

  > (To disable animations: Settings > Accessibility > Display > Show animations in Windows (Disable)) (The setting is found in the \_reset.scss file).

---

#### Made by: Mateusz Narowski

#### Date: 05.09.2022
