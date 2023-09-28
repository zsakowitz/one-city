## Development

To work on this project, run these commands in a terminal window.

```sh
# Download this repository's code
git clone https://github.com/zsakowitz/one-city
cd one-city

# Install dependencies
npm install

# Start the development server
npm run dev --open
```

## To Do

- [ ] Glide employees can add others as admins.
- [ ] Change "full name" fields to separate first and last name.
  - [ ] In real world, it’s a common practice to have separate fields for first
        name and last name in a database so that it will be easy to query for
        example only by first name or last name. If we have both stored together
        as one field, such action is not possible.
- [ ] Color requests on dashboard based on status.
- [ ] Autocomplete location.
- [ ] Color buttons like Edit, Delete, Mark as Completed, Mark as Active Send It
- [ ] The urgency icon, arrow up and arrow down, are not intuitive. Instead,
      just use “High,” “Medium,” and “Low.” They also need to be colored with
      perhaps red, orange, and yellow respectively.
- [ ] Address field should also be broken into Address, City, State, and Zip,
      which are what typically see on any websites.
- [ ] After a form is submitted, instead of using pop-up to show the form
      submission status, we should have the status reflected on the page.

## Completed

- [x] Date Requested should include the year.
- [x] Capitalize the first letter of “Active” in “Mark as active” button.
- [x] Capitalize the first letter of “Completed” in “Mark as completed” button.
- [x] When editing an existing item as an admin, the button to save is “Create
      Item Request.” Instead, it should be called “Save Item Request.”
- [x] Login
  - [x] After logged in, change the “Log In” button at the top to “Log Out”
  - [x] Implement Log Out
- [x] Add sort indicators to “all requests” page.
