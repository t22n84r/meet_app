# Meetup app

The app is a “meetup” app, displaying a list of upcoming events for a city and time of the user’s choosing. It will also be available for users to use while offline. It is a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

## Feature 1: Filter Events By City
Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.
Scenario 2: User should see a list of suggestions when they search for a city.
Scenario 3: User can select a city from the suggested list.

### User story
As a user, I would like to be able to filter events by city so that I can see the list of events that take place in that city.

### Gherkin syntax
**Scenario 1**
Given user hasn’t searched for any city;
When the user opens the app;
Then the user should see a list of upcoming events.

**Scenario 2**
Given the main page is open;
When user starts typing in the city textbox;
Then the user should receive a list of cities (suggestions) that match what they’ve typed.

**Scenario 3**
Given user was typing “Berlin” in the city textbox AND the list of suggested cities is showing;
When the user selects a city (e.g., “Berlin, Germany”) from the list;
Then their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city.

## Feature 2: Show/Hide Event Details
Scenario 1: An event element is collapsed by default.
Scenario 2: User can expand an event to see details.
Scenario 3: User can collapse an event to hide details.

### User story
As a user, I would like to be able to show/hide event details so that I can see more/less information about an event.

### Gherkin syntax
**Scenario 1**
Given user is on the events list page and didn't click on an event
When event list is displayed
Then the event element is collapsed by default

**Scenario 2**
Given user is on the events list page and didn't click on an event
When event list is displayed
Then user can expand an event to see details

**Scenario 3**
Given when event details are displayed
When user clicks on an event element
Then user can collapse an event to hide details

## Feature 3: Specify Number of Events
Scenario 1: When user hasn’t specified a number, 32 events are shown by default.
Scenario 2: User can change the number of events displayed.

### User story
As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.\\

### Gherkin syntax
**Scenario 1**
Given user is on the events list page 
When number of events to be displayed is not specified by user
Then 32 events are shown by default.

**Scenario 2**
Given user is on the events list page 
When the user chooses to specify the number of events to display
Then user can change the number of events displayed

## Feature 4: Use the App When Offline
Scenario 1: Show cached data when there’s no internet connection.
Scenario 2: Show error when user changes search settings (city, number of events).

### User story
As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online.

### Gherkin syntax
**Scenario 1**
Given user is on the events list page
When internet connection is not available
Then user can view cached events data

**Scenario 2**
Given user is on the events list page and internet connection is not available
When user attempts to change search settings (city, number of events)
Then user will receive an error

## Feature 5: Add an App Shortcut to the Home Screen
Scenario 1: User can install the meet app as a shortcut on their device home screen.

### User story
As a user, I would like to be able to add the app shortcut to my home screen so that I can open the app faster.

### Gherkin syntax
**Scenario 1**
Given app shortcut is not on user device home screen
When user wants to add the app shortcut for faster access
Then user can install the app shortcut on their device home screen

## Feature 6: Display Charts Visualizing Event Details
Scenario 1: Show a chart with the number of upcoming events in each city.

### User story
As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city.

### Gherkin syntax
**Scenario 1**
Given user is on the events charts page
When user wants to see all upcoming events
Then user can see a chart showing the upcoming events in each city so that they know what events are organized in which city