## TECHNOLOGY
* Node JS
* Express
* Javascript
* EJS
* MongoDB Atlas
* Bootstrap
* CSS


## Installation

Use the package manager [npm](https://pip.pypa.io/en/stable/) to install Facility Genie.

```bash
npm install
```

## Usage

```python
npm run dev

```

## Limitations

* The application is mobile phone and tablet friendly only.
* This application is meant for assisted-living facilities. As a user, you may be a Resident, who can ask for something, learn how to use a few common day-to-day applications, and stay up to date with upcoming events in your facility. 
* Alternatively, you may be a Staff Member, who is responsible for addressing the needs (“wishes”) of your residents, enabling and disabling tutorials based on what your residents are interested in, and sharing upcoming events in your facility.
* This application will be set up by the vendor to cater to a particular assisted living facility. It has users (Residents and Staff members)  pre-configured hence there isn't a feature that allows registration. The pre-configured residents helps in case the senior residents forget their passwords, or if they want the staff to help them with their account.
* When a resident tries to “Make a Wish” using the voice record or by typing, the user should only enter what they need and not a sentence. For eg: “Coffee Machine” is a valid input but “I want a Coffee Machine” is not a valid input. Input validation will be implemented in the next iteration. PS: The voice record is functional, please grant permission when the pop up requests.
* A resident can currently create multiple duplicate needs with the current design. For example: Boe can have many wishes posted for glasses. 
When a Staff worker tries to “Manage Needs”, all the Tabs will be collapsed by default (always). They can expand the category to work on by tapping the button displaying the number of items in that category (white button to the right).
* In Manage tutorials, the Staff worker can enable/disable a tutorial by using the toggle button on the left.
* The application does not have the ability to add/request new tutorials, it will be a part of the next product increment
The tutorials available currently are pre-configured
In Manage Events, the staff worker currently doesn't have the ability to edit the event posted by them


## Style Guide

[Style Guide](https://www.figma.com/file/OcEv3ALFsNOky4PBXSfsiO/Style-Guide?node-id=194%3A1133&t=W5ygDjh8vRNyfvlt-0)